import type { ExperienceItem, ExperienceKind } from "@/data/types";
import type {
  CalendarLabel,
  ClassOfferingDetails,
  ClassScheduleDay,
  Offering,
  OfferingGalleryImage,
} from "@/lib/cms/types";
import {
  DEFAULT_CALENDAR_LABELS_DESCRIPTION,
  DEFAULT_CALENDAR_LABELS_TITLE,
  DEFAULT_DETAIL_QUESTION,
  DEFAULT_HERO_IMAGE,
  MAX_CALENDAR_LABELS,
  defaultClassDetails,
} from "./constants";
import type { LegacyOfferingDetails, TabKey } from "./types";
import { defaultContent } from "@/components/admin/ClassContentTab";
import { DEFAULT_RICH_TEXT_TYPOGRAPHY, DEFAULT_DESCRIPTION_TYPOGRAPHY, normalizeRichTextTypography } from "@/lib/cms/rich-text-typography";

export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function createId(prefix: string) {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function menuPlacementForType(type: Offering["type"]) {
  if (type === "workshop") return ["workshops"];
  if (type === "experience") return ["experiences"];
  if (type === "gift_card") return ["gift-cards"];
  return ["classes"];
}

export function toLines(value: string) {
  return value.split(/\r?\n/);
}

export function textValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function firstText(...values: unknown[]) {
  for (const value of values) {
    const text = textValue(value);
    if (text) return text;
  }
  return "";
}

export function defaultCtaHref(details: Pick<ClassOfferingDetails, "whatsappNumber" | "content">) {
  const whatsapp = firstText(details.whatsappNumber, details.content?.contactWhatsapp, "34633788860").replace(/\D/g, "");
  return `https://wa.me/${whatsapp || "34633788860"}`;
}

export function defaultConsultLabel(type: Offering["type"]) {
  return type === "gift_card" ? "Comprar" : "Consultar";
}

export function defaultEnrollLabel(type: Offering["type"]) {
  return type === "gift_card" ? "Anadir al carrito" : "Inscribirme";
}

export function textList(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === "string") return value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
  return [] as string[];
}

export function textBlock(value: unknown) {
  return textList(value).join("\n");
}

function legacyModules(value: unknown): ClassOfferingDetails["content"]["modules"] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item, index) => {
      const source = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      const title = firstText(source.title, `Módulo ${index + 1}`);
      const content = firstText(source.content, source.description);
      const points = textList(source.points);

      return {
        id: firstText(source.id) || createId("module"),
        title,
        description: [content, ...points.map((point) => `- ${point}`)].filter(Boolean).join("\n"),
        duration: firstText(source.duration),
        image: firstText(source.image),
        order: typeof source.order === "number" ? source.order : index,
      };
    })
    .filter((item) => item.title || item.description);
}

function legacyScheduleDays(schedule: string[]): ClassScheduleDay[] {
  return schedule.map((item, index) => {
    const [title, ...descriptionParts] = item.split(":");
    return {
      id: `schedule-${index}`,
      date: "",
      startTime: "",
      endTime: "",
      title: title?.trim() || "Disponible",
      description: descriptionParts.join(":").trim() || "Consultar disponibilidad",
      location: "",
      availableSeats: null,
      order: index,
    };
  });
}

export function daysInMonth(year: number, month: number) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) return 0;
  return new Date(year, month, 0).getDate();
}

export function calendarMonthCells(year: number, month: number) {
  const count = daysInMonth(year, month);
  if (!count) return [] as Array<number | null>;
  const firstDay = new Date(year, month - 1, 1).getDay();
  const mondayOffset = (firstDay + 6) % 7;
  return [
    ...Array.from({ length: mondayOffset }, () => null),
    ...Array.from({ length: count }, (_, index) => index + 1),
  ];
}

function sanitizeCalendarLabel(entry: unknown, index: number): CalendarLabel | null {
  const source = entry && typeof entry === "object" ? (entry as Partial<CalendarLabel>) : {};
  const now = new Date();
  const month = Number(source.month) || now.getMonth() + 1;
  const year = Number(source.year) || now.getFullYear();
  if (!Number.isInteger(month) || month < 1 || month > 12 || !Number.isInteger(year) || year < 2000 || year > 2100) return null;
  const maxDay = daysInMonth(year, month);
  const days = Array.isArray(source.days)
    ? Array.from(new Set(source.days.map((day) => Number(day)).filter((day) => Number.isInteger(day) && day >= 1 && day <= maxDay))).sort((a, b) => a - b)
    : [];

  return {
    id: firstText(source.id) || createId("calendar-label"),
    month,
    year,
    days,
    active: source.active !== false,
    order: Number.isFinite(Number(source.order)) ? Number(source.order) : index,
    availabilityText: firstText(source.availabilityText),
  };
}

export function sanitizeCalendarLabels(value: unknown): CalendarLabel[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, MAX_CALENDAR_LABELS)
    .map(sanitizeCalendarLabel)
    .filter((label): label is CalendarLabel => Boolean(label))
    .map((label, order) => ({ ...label, order }));
}

export function toClassDetails(offering: Offering): ClassOfferingDetails {
  const legacyDetails = (offering.details ?? {}) as LegacyOfferingDetails;
  const fromDetails = { ...legacyDetails, ...(offering.details.class ?? {}) } as LegacyOfferingDetails;
  const legacyContent = defaultContent();
  legacyContent.learningContent = textBlock(fromDetails.whatYouWillLearn);
  legacyContent.participationContent = textBlock(fromDetails.whoCanJoin);
  legacyContent.paymentMethods = textBlock(fromDetails.paymentMethods);
  legacyContent.paymentMethodsList = textList(fromDetails.paymentMethods);
  legacyContent.extraInfo = firstText(fromDetails.additionalInfo);
  legacyContent.modules = legacyModules(fromDetails.program);

  const persistedContent = fromDetails.content ?? {};
  const persistedContentFields = persistedContent as Partial<ClassOfferingDetails["content"]>;
  const hasPersistedLearningContent = Object.prototype.hasOwnProperty.call(persistedContentFields, "learningContent");
  const hasPersistedParticipationContent = Object.prototype.hasOwnProperty.call(persistedContentFields, "participationContent");
  const hasPersistedPaymentMethods =
    Object.prototype.hasOwnProperty.call(persistedContentFields, "paymentMethods") ||
    Object.prototype.hasOwnProperty.call(persistedContentFields, "paymentMethodsList");
  const hasPersistedExtraInfo = Object.prototype.hasOwnProperty.call(persistedContentFields, "extraInfo");
  const mergedContent = {
    ...legacyContent,
    ...persistedContent,
    showLearningSection: typeof persistedContentFields.showLearningSection === "boolean"
      ? persistedContentFields.showLearningSection
      : Boolean(firstText(persistedContentFields.learningContent, legacyContent.learningContent)),
    showParticipationSection: typeof persistedContentFields.showParticipationSection === "boolean"
      ? persistedContentFields.showParticipationSection
      : Boolean(firstText(persistedContentFields.participationContent, legacyContent.participationContent)),
    showPaymentMethodsSection: typeof persistedContentFields.showPaymentMethodsSection === "boolean"
      ? persistedContentFields.showPaymentMethodsSection
      : Array.isArray(persistedContentFields.paymentMethodsList)
        ? persistedContentFields.paymentMethodsList.some((item) => String(item).trim())
        : Boolean(firstText(persistedContentFields.paymentMethods, legacyContent.paymentMethods)),
    showModulesSection: typeof persistedContentFields.showModulesSection === "boolean"
      ? persistedContentFields.showModulesSection
      : typeof persistedContentFields.showCourseContent === "boolean"
        ? persistedContentFields.showCourseContent
        : Array.isArray(persistedContentFields.modules)
          ? persistedContentFields.modules.length > 0
          : legacyContent.modules.length > 0,
    learningContent: hasPersistedLearningContent ? firstText(persistedContentFields.learningContent) : legacyContent.learningContent,
    participationContent: hasPersistedParticipationContent ? firstText(persistedContentFields.participationContent) : legacyContent.participationContent,
    paymentMethods: hasPersistedPaymentMethods ? firstText(persistedContentFields.paymentMethods) : legacyContent.paymentMethods,
    paymentMethodsList: Array.isArray(persistedContentFields.paymentMethodsList)
      ? persistedContentFields.paymentMethodsList.map((item) => String(item).trim()).filter(Boolean)
      : textList(hasPersistedPaymentMethods ? firstText(persistedContentFields.paymentMethods) : legacyContent.paymentMethods),
    extraInfo: hasPersistedExtraInfo ? firstText(persistedContentFields.extraInfo) : legacyContent.extraInfo,
    modules: Array.isArray((persistedContent as Partial<ClassOfferingDetails["content"]>).modules) && (persistedContent as Partial<ClassOfferingDetails["content"]>).modules?.length
      ? (persistedContent as ClassOfferingDetails["content"]).modules
      : legacyContent.modules,
    activitiesSection: {
      ...legacyContent.activitiesSection,
      ...((persistedContent as Partial<ClassOfferingDetails["content"]>).activitiesSection ?? {}),
    },
  };
  const galleryImages: OfferingGalleryImage[] = Array.isArray(fromDetails.galleryImages) && fromDetails.galleryImages.length
    ? fromDetails.galleryImages
    : offering.gallery.map((image, index) => ({ image, alt: "", order: index }));

  const pricing = Array.isArray(fromDetails.pricing) && fromDetails.pricing.length
    ? fromDetails.pricing
    : offering.price !== null
      ? [{ description: "Precio base", price: offering.price, order: 0 }]
      : [];

  const scheduleDays = Array.isArray(fromDetails.scheduleDays) && fromDetails.scheduleDays.length ? fromDetails.scheduleDays : legacyScheduleDays(offering.schedule);
  const calendarLabels = sanitizeCalendarLabels(fromDetails.calendarLabels);
  const includedItems = Array.isArray(fromDetails.includedItems) && fromDetails.includedItems.length ? fromDetails.includedItems : textList(fromDetails.included);
  const heroVariant = fromDetails.heroVariant === "image" || fromDetails.heroVariant === "text" || fromDetails.heroVariant === "presentation"
    ? fromDetails.heroVariant
    : "text";
  const persistedHomeCard = fromDetails.homeCard ?? defaultClassDetails.homeCard;

  return {
    ...defaultClassDetails,
    ...fromDetails,
    menuTitle: firstText(fromDetails.menuTitle, offering.title),
    heroVariant,
    heroMenuTone: fromDetails.heroMenuTone === "light" || fromDetails.heroMenuTone === "dark"
      ? fromDetails.heroMenuTone
      : heroVariant === "image" || heroVariant === "presentation" ? "light" : "dark",
    heroMenuColor: firstText(fromDetails.heroMenuColor, fromDetails.heroMenuTone === "light" ? "#ffffff" : "", heroVariant === "image" || heroVariant === "presentation" ? "#ffffff" : "#3f3933"),
    heroMenuScale: typeof fromDetails.heroMenuScale === "number" ? fromDetails.heroMenuScale : Number(fromDetails.heroMenuScale) || 1,
    heroLogoPositionX: firstText(fromDetails.heroLogoPositionX, defaultClassDetails.heroLogoPositionX),
    heroLogoPositionY: firstText(fromDetails.heroLogoPositionY, defaultClassDetails.heroLogoPositionY),
    heroLogoWidth: firstText(fromDetails.heroLogoWidth, defaultClassDetails.heroLogoWidth),
    heroLogoTabletPositionX: firstText(fromDetails.heroLogoTabletPositionX, fromDetails.heroLogoPositionX, defaultClassDetails.heroLogoTabletPositionX),
    heroLogoTabletPositionY: firstText(fromDetails.heroLogoTabletPositionY, fromDetails.heroLogoPositionY, defaultClassDetails.heroLogoTabletPositionY),
    heroLogoTabletWidth: firstText(fromDetails.heroLogoTabletWidth, fromDetails.heroLogoWidth, defaultClassDetails.heroLogoTabletWidth),
    heroLogoMobilePositionX: firstText(fromDetails.heroLogoMobilePositionX, fromDetails.heroLogoPositionX, defaultClassDetails.heroLogoMobilePositionX),
    heroLogoMobilePositionY: firstText(fromDetails.heroLogoMobilePositionY, defaultClassDetails.heroLogoMobilePositionY),
    heroLogoMobileWidth: firstText(fromDetails.heroLogoMobileWidth, defaultClassDetails.heroLogoMobileWidth),
    heroMenuPositionY: firstText(fromDetails.heroMenuPositionY, defaultClassDetails.heroMenuPositionY),
    heroMenuTabletPositionY: firstText(fromDetails.heroMenuTabletPositionY, fromDetails.heroMenuPositionY, defaultClassDetails.heroMenuTabletPositionY),
    heroMenuMobilePositionY: firstText(fromDetails.heroMenuMobilePositionY, defaultClassDetails.heroMenuMobilePositionY),
    ctaHref: firstText(fromDetails.ctaHref),
    ctaConsultHref: firstText(fromDetails.ctaConsultHref, fromDetails.ctaHref),
    ctaEnrollHref: firstText(fromDetails.ctaEnrollHref, fromDetails.ctaHref),
    ctaConsultLabel: firstText(fromDetails.ctaConsultLabel),
    ctaEnrollLabel: firstText(fromDetails.ctaEnrollLabel),
    showConsultCta: fromDetails.showConsultCta ?? true,
    showEnrollCta: fromDetails.showEnrollCta ?? true,
    heroTitle: firstText(fromDetails.heroTitle, offering.title),
    heroSubtitle: firstText(fromDetails.heroSubtitle, fromDetails.category, offering.subtitle),
    heroPresentationText: firstText(fromDetails.heroPresentationText),
    heroPresentationSubtitle: firstText(fromDetails.heroPresentationSubtitle),
    heroPresentationTextColor: firstText(fromDetails.heroPresentationTextColor, defaultClassDetails.heroPresentationTextColor),
    heroPresentationImage: firstText(fromDetails.heroPresentationImage),
    heroPresentationCtaEnabled: Boolean(fromDetails.heroPresentationCtaEnabled),
    heroPresentationCtaLabel: firstText(fromDetails.heroPresentationCtaLabel, defaultClassDetails.heroPresentationCtaLabel),
    heroPresentationCtaHref: firstText(fromDetails.heroPresentationCtaHref),
    heroPresentationCtaNewTab: Boolean(fromDetails.heroPresentationCtaNewTab),
    heroPresentationCtaBackgroundColor: firstText(fromDetails.heroPresentationCtaBackgroundColor, defaultClassDetails.heroPresentationCtaBackgroundColor),
    heroPresentationCtaTextColor: firstText(fromDetails.heroPresentationCtaTextColor, defaultClassDetails.heroPresentationCtaTextColor),
    detailQuestion: firstText(fromDetails.detailQuestion, DEFAULT_DETAIL_QUESTION),
    highlightDescription: firstText(fromDetails.highlightDescription, fromDetails.introHighlight, offering.excerpt),
    subtitleTypography: normalizeRichTextTypography(fromDetails.subtitleTypography),
    detailQuestionTypography: normalizeRichTextTypography(fromDetails.detailQuestionTypography),
    highlightDescriptionTypography: normalizeRichTextTypography(fromDetails.highlightDescriptionTypography),
    descriptionTypography: normalizeRichTextTypography(fromDetails.descriptionTypography ?? DEFAULT_DESCRIPTION_TYPOGRAPHY),
    homeCard: {
      image: firstText(persistedHomeCard.image),
      imageAlt: firstText(persistedHomeCard.imageAlt),
      eyebrow: firstText(persistedHomeCard.eyebrow),
      title: firstText(persistedHomeCard.title),
      excerpt: firstText(persistedHomeCard.excerpt, fromDetails.homeExcerpt),
      excerptTypography: normalizeRichTextTypography(persistedHomeCard.excerptTypography),
    },
    durationText: firstText(fromDetails.durationText, offering.duration),
    heroImage: fromDetails.heroImage || offering.cover_image_url || DEFAULT_HERO_IMAGE,
    heroImageMobile: fromDetails.heroImageMobile || "",
    heroVideoUrl: firstText(fromDetails.heroVideoUrl),
    heroVideoUrlMobile: firstText(fromDetails.heroVideoUrlMobile),
    heroVideoPoster: firstText(fromDetails.heroVideoPoster),
    titleImage: fromDetails.titleImage ?? "",
    titleImageSecondary: fromDetails.titleImageSecondary ?? "",
    videoUrl: fromDetails.videoUrl ?? "",
    videoPoster: firstText(fromDetails.videoPoster, fromDetails.videoCardImage),
    showIncludedSection: typeof fromDetails.showIncludedSection === "boolean"
      ? fromDetails.showIncludedSection
      : false,
    includedItems,
    galleryImages: galleryImages
      .map((item, index) => ({
        image: item.image || "",
        alt: item.alt || "",
        seoTitle: item.seoTitle || "",
        seoDescription: item.seoDescription || "",
        order: item.order ?? index,
      }))
      .sort((a, b) => a.order - b.order),
    pricing: pricing.map((item, index) => ({ description: item.description || "", price: item.price ?? null, order: item.order ?? index })),
    scheduleDescription: firstText(fromDetails.scheduleDescription, offering.schedule.join("\n")),
    showScheduleOnFrontend: fromDetails.showScheduleOnFrontend ?? true,
    showCalendarLabels: fromDetails.showCalendarLabels === true,
    calendarLabelsTitle: firstText(fromDetails.calendarLabelsTitle, DEFAULT_CALENDAR_LABELS_TITLE),
    calendarLabelsDescription: firstText(fromDetails.calendarLabelsDescription, DEFAULT_CALENDAR_LABELS_DESCRIPTION),
    calendarLabels,
    scheduleDays: scheduleDays
      .map((item, index) => ({
        id: item.id || `schedule-${index}`,
        date: item.date || "",
        startTime: item.startTime || "",
        endTime: item.endTime || "",
        title: item.title || "",
        description: item.description || "",
        location: item.location || "",
        availableSeats: item.availableSeats ?? null,
        order: item.order ?? index,
      }))
      .sort((a, b) => (a.date || "9999-12-31").localeCompare(b.date || "9999-12-31") || a.order - b.order),
    whatsappNumber: firstText(fromDetails.whatsappNumber, fromDetails.content && typeof fromDetails.content === "object" ? (fromDetails.content as Partial<ClassOfferingDetails["content"]>).contactWhatsapp : ""),
    seoImage: fromDetails.seoImage ?? "",
    content: mergedContent,
  };
}

export function renderPlainText(value: string) {
  return value
    .replace(/\*\*/g, "")
    .replace(/_/g, "")
    .replace(/<u>|<\/u>/g, "")
    .replace(/~~/g, "")
    .replace(/^#+\s*/gm, "")
    .trim();
}

export function kindForOfferingType(type: Offering["type"]): ExperienceKind {
  if (type === "workshop") return "workshop";
  if (type === "gift_card") return "gift-card";
  if (type === "experience") return "private-booking";
  return "class";
}

function formatPreviewPrice(value: number | null) {
  return value === null ? "" : `${value} EUR`;
}

function previewSchedule(details: ClassOfferingDetails) {
  if (!details.showScheduleOnFrontend) return [];
  return details.scheduleDescription.trim()
    ? [{ day: "Horario", slots: toLines(details.scheduleDescription).filter(Boolean) }]
    : [];
}

function previewProgram(details: ClassOfferingDetails) {
  return [...details.content.modules]
    .sort((a, b) => a.order - b.order)
    .map((item, index) => ({
      title: item.title || `Módulo ${index + 1}`,
      content: item.description,
    }))
    .filter((item) => item.title || item.content);
}

export function buildPreviewItem({
  offeringType,
  title,
  slug,
  subtitle,
  description,
  details,
}: {
  offeringType: Offering["type"];
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  details: ClassOfferingDetails;
}): ExperienceItem {
  const kind = kindForOfferingType(offeringType);
  const galleryImages = details.galleryImages
    .filter((item) => item.image)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => item.image);
  const fallbackImage = details.heroImage || details.videoPoster || DEFAULT_HERO_IMAGE;
  const fallbackCta = defaultCtaHref(details);
  const consultHref = details.showConsultCta === false ? "" : details.ctaConsultHref || details.ctaHref || fallbackCta;
  const enrollHref = details.showEnrollCta === false ? "" : details.ctaEnrollHref || details.ctaHref || fallbackCta;
  const priceOptions = details.pricing
    .filter((item) => item.description.trim() || item.price !== null)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => ({
      label: item.description || "Precio",
      price: formatPreviewPrice(item.price),
    }));
  const paymentMethods = details.content.paymentMethodsList?.length
    ? details.content.paymentMethodsList
    : toLines(details.content.paymentMethods.replace(/,/g, "\n"));

  return {
    id: "preview",
    kind,
    slug: slugify(slug || title || "vista-previa"),
    title: title || "Título del producto",
    subtitle: subtitle || title || "Título del producto",
    category: details.heroSubtitle || offeringType,
    excerpt: details.highlightDescription,
    description: toLines(description),
    coverImage: galleryImages[0] || fallbackImage,
    homeImage: details.homeCard.image || galleryImages[0] || fallbackImage,
    homeImageAlt: details.homeCard.imageAlt || details.homeCard.title || title || "Tarjeta destacada",
    homeEyebrow: details.homeCard.eyebrow || details.heroSubtitle || offeringType,
    homeTitle: details.homeCard.title || title || "Título del producto",
    homeExcerpt: details.homeCard.excerpt || details.homeExcerpt || details.highlightDescription,
    homeExcerptTypography: normalizeRichTextTypography(details.homeCard.excerptTypography),
    heroImage: fallbackImage,
    heroImageMobile: details.heroImageMobile || undefined,
    heroVideoUrl: details.heroVideoUrl || undefined,
    heroVideoUrlMobile: details.heroVideoUrlMobile || undefined,
    heroVideoPoster: details.heroVideoPoster || undefined,
    heroVariant: details.heroVariant,
    heroMenuTone: details.heroMenuTone,
    heroMenuColor: details.heroMenuColor,
    heroMenuScale: details.heroMenuScale,
    heroLogoPositionX: details.heroLogoPositionX,
    heroLogoPositionY: details.heroLogoPositionY,
    heroLogoWidth: details.heroLogoWidth,
    heroLogoTabletPositionX: details.heroLogoTabletPositionX,
    heroLogoTabletPositionY: details.heroLogoTabletPositionY,
    heroLogoTabletWidth: details.heroLogoTabletWidth,
    heroLogoMobilePositionX: details.heroLogoMobilePositionX,
    heroLogoMobilePositionY: details.heroLogoMobilePositionY,
    heroLogoMobileWidth: details.heroLogoMobileWidth,
    heroMenuPositionY: details.heroMenuPositionY,
    heroMenuTabletPositionY: details.heroMenuTabletPositionY,
    heroMenuMobilePositionY: details.heroMenuMobilePositionY,
    heroTitleImage: details.titleImage,
    heroTitleImageSecondary: details.titleImageSecondary,
    heroPresentationText: details.heroPresentationText,
    heroPresentationSubtitle: details.heroPresentationSubtitle,
    heroPresentationTextColor: details.heroPresentationTextColor,
    heroPresentationImage: details.heroPresentationImage,
    heroPresentationCtaEnabled: details.heroPresentationCtaEnabled,
    heroPresentationCtaLabel: details.heroPresentationCtaLabel,
    heroPresentationCtaHref: details.heroPresentationCtaHref,
    heroPresentationCtaNewTab: details.heroPresentationCtaNewTab,
    heroPresentationCtaBackgroundColor: details.heroPresentationCtaBackgroundColor,
    heroPresentationCtaTextColor: details.heroPresentationCtaTextColor,
    heroTitle: details.heroTitle || title || "Título del hero",
    listingTitle: title || "Título del producto",
    listingSubtitle: details.heroSubtitle || "",
    detailQuestion: details.detailQuestion || DEFAULT_DETAIL_QUESTION,
    introHighlight: details.highlightDescription || "Texto remarcado color café.",
    galleryImages: galleryImages.length ? galleryImages : [fallbackImage],
    videoCardImage: details.videoPoster || undefined,
    videoCardLabel: details.videoUrl ? "VIDEO" : details.videoPoster ? "IMAGEN" : "",
    videoUrl: details.videoUrl || undefined,
    priceOptions: priceOptions.length ? priceOptions : [{ label: "Precio", price: "0 EUR" }],
    duration: details.durationText || "Duración pendiente",
    schedule: previewSchedule(details),
    included: details.includedItems.filter((item) => item.trim()),
    showIncludedSection: details.showIncludedSection,
    program: previewProgram(details),
    showLearningSection: details.content.showLearningSection,
    showParticipationSection: details.content.showParticipationSection,
    showPaymentMethodsSection: details.content.showPaymentMethodsSection,
    showModulesSection: details.content.showModulesSection,
    programSectionTitle: details.content.modulesSectionTitle.trim() || "Contenido del curso",
    learningSectionTitle: details.content.learningSectionTitle.trim() || "¿Qué aprenderás?",
    whatYouWillLearn: toLines(details.content.learningContent),
    participationSectionTitle: details.content.participationSectionTitle.trim() || "¿Quién puede participar?",
    whoCanJoin: toLines(details.content.participationContent),
    paymentMethods: paymentMethods.map((method) => method.trim()).filter(Boolean),
    additionalInfo: details.content.extraInfo.trim(),
    showIdeaPromptSection: details.showIdeaPromptSection,
    ctaHref: consultHref,
    ctaConsultHref: consultHref,
    ctaEnrollHref: enrollHref,
    ctaConsultLabel: details.ctaConsultLabel.trim() || defaultConsultLabel(offeringType),
    ctaEnrollLabel: details.ctaEnrollLabel.trim() || defaultEnrollLabel(offeringType),
    seoTitle: title || "Vista previa",
    seoDescription: details.highlightDescription || renderPlainText(description),
    isPublished: false,
    order: 0,
  };
}

export function errorTab(errorKey: string): TabKey {
  if (errorKey === "heroTitle") return "hero";
  if (errorKey.startsWith("schedule-")) return "schedule";
  if (errorKey.startsWith("pricing-") || errorKey === "menuTitle" || errorKey === "title" || errorKey === "slug" || errorKey === "whatsappNumber") return "basic";
  if (errorKey.startsWith("gallery-") || errorKey.startsWith("calendar-label-") || errorKey === "calendarLabels") return "basic";
  return "basic";
}

export function detailSectionForError(errorKey: string): import("./types").DetailPageSectionKey {
  if (errorKey.startsWith("pricing-")) return "pricing";
  if (errorKey.startsWith("gallery-")) return "gallery";
  if (errorKey.startsWith("calendar-label-") || errorKey === "calendarLabels") return "calendar";
  if (errorKey === "menuTitle" || errorKey === "title" || errorKey === "slug" || errorKey === "whatsappNumber") return "basic-info";
  return "basic-info";
}

export function focusValidationTarget(errorKey: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("class-edit:focus-section", { detail: { errorKey } }));
  }
  const selector = `[data-validation-key="${CSS.escape(errorKey)}"]`;
  window.setTimeout(() => {
    const target = document.querySelector<HTMLElement>(selector);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    const focusable = target.matches("input, textarea, select, button, [contenteditable='true']")
      ? target
      : target.querySelector<HTMLElement>("input, textarea, select, button, [contenteditable='true']");
    window.setTimeout(() => focusable?.focus({ preventScroll: true }), 250);
  }, 200);
}

function errorLabel(errorKey: string) {
  if (errorKey === "title") return "Información básica - Etiqueta interna";
  if (errorKey === "menuTitle") return "Información básica - Título del menú";
  if (errorKey === "slug") return "Información básica - Slug";
  if (errorKey === "heroTitle") return "Hero - Título del hero";
  if (errorKey === "whatsappNumber") return "Información básica - WhatsApp";

  const pricing = errorKey.match(/^pricing-(\d+)$/);
  if (pricing) return `Información básica - Precio ${Number(pricing[1]) + 1}`;

  const gallery = errorKey.match(/^gallery-(\d+)$/);
  if (gallery) return `Página detallada - Imagen de galería ${Number(gallery[1]) + 1}`;

  const schedule = errorKey.match(/^schedule-(date|end|seats)-(\d+)$/);
  if (schedule) return `Horario - Día ${Number(schedule[2]) + 1}`;

  const calendar = errorKey.match(/^calendar-label-(\d+)$/);
  if (calendar) return `Pagina detallada - Etiqueta calendario ${Number(calendar[1]) + 1}`;
  if (errorKey === "calendarLabels") return "Pagina detallada - Etiquetas calendario";

  return errorKey;
}

export function validationDetails(nextErrors: Record<string, string>) {
  return Object.entries(nextErrors).map(([key, message]) => `${errorLabel(key)}: ${message}`);
}

export function validateClassEditForm({
  title,
  slug,
  details,
}: {
  title: string;
  slug: string;
  details: ClassOfferingDetails;
}) {
  const nextErrors: Record<string, string> = {};
  if (!details.menuTitle.trim()) nextErrors.menuTitle = "El título del menú es obligatorio.";
  if (!title.trim()) nextErrors.title = "La etiqueta interna es obligatoria.";
  if (!slug.trim()) nextErrors.slug = "El slug es obligatorio.";
  if (details.heroVariant === "text" && !details.heroTitle.trim()) nextErrors.heroTitle = "Agrega el título del hero.";
  if (details.heroVariant === "presentation" && !details.heroPresentationText.trim()) nextErrors.heroTitle = "Agrega el texto de presentación.";
  if (details.whatsappNumber && !/^\d+$/.test(details.whatsappNumber)) nextErrors.whatsappNumber = "Usa solo números, sin espacios.";
  details.pricing.forEach((item, index) => {
    if (item.price !== null && Number(item.price) < 0) nextErrors[`pricing-${index}`] = "El precio no puede ser negativo.";
  });
  details.galleryImages.forEach((item, index) => {
    if (item.image && !item.alt.trim()) nextErrors[`gallery-${index}`] = "El texto alternativo es obligatorio.";
  });
  if (details.calendarLabels.length > MAX_CALENDAR_LABELS) nextErrors.calendarLabels = "Puedes crear hasta seis etiquetas calendario.";
  details.calendarLabels.forEach((item, index) => {
    const maxDay = daysInMonth(item.year, item.month);
    if (!maxDay) nextErrors[`calendar-label-${index}`] = "Selecciona un mes y anio validos.";
    if (item.days.some((day) => day < 1 || day > maxDay)) nextErrors[`calendar-label-${index}`] = "Hay dias que no existen en ese mes.";
    if (details.showCalendarLabels && item.active && item.days.length === 0) nextErrors[`calendar-label-${index}`] = "Marca al menos un dia o desactiva esta etiqueta.";
  });
  return nextErrors;
}

export function buildOfferingPayload({
  offering,
  title,
  slug,
  subtitle,
  description,
  details,
  nextStatus,
  seoTitle,
  seoDescription,
}: {
  offering: Offering;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  details: ClassOfferingDetails;
  nextStatus: "draft" | "published";
  seoTitle: string;
  seoDescription: string;
}) {
  const pricing = details.pricing.filter((item) => item.description.trim() || item.price !== null).map((item, order) => ({ ...item, order }));
  const galleryImages = details.galleryImages.filter((item) => item.image).map((item, order) => ({ ...item, order }));
  const scheduleDays: ClassOfferingDetails["scheduleDays"] = [];
  const calendarLabels = sanitizeCalendarLabels(details.calendarLabels);
  const primaryPrice = pricing.find((item) => item.price !== null)?.price ?? null;
  const coverImage = details.heroVariant === "image" || details.heroVariant === "presentation"
    ? details.heroImage || DEFAULT_HERO_IMAGE
    : galleryImages[0]?.image || details.videoPoster || offering.cover_image_url;

  return {
    title: title.trim(),
    slug: slugify(slug),
    subtitle: subtitle.trim(),
    excerpt: details.highlightDescription.trim(),
    description,
    duration: details.durationText.trim(),
    type: offering.type,
    status: nextStatus,
    price: primaryPrice,
    currency: "EUR",
    cover_image_url: coverImage,
    gallery: galleryImages.map((item) => item.image),
    seo_title: seoTitle.trim(),
    seo_description: seoDescription.trim(),
    details: {
      ...offering.details,
      videoCardImage: "",
      videoCardLabel: "",
      whatYouWillLearn: [],
      whoCanJoin: [],
      paymentMethods: [],
      class: {
        ...details,
        heroMenuTone: details.heroMenuTone,
        heroMenuColor: details.heroMenuColor,
        heroMenuScale: details.heroMenuScale,
        heroImage: details.heroVariant === "image" || details.heroVariant === "presentation" ? details.heroImage || DEFAULT_HERO_IMAGE : details.heroImage,
        heroPresentationText: details.heroPresentationText.trim(),
        heroPresentationSubtitle: details.heroPresentationSubtitle.trim(),
        heroPresentationTextColor: details.heroPresentationTextColor.trim() || defaultClassDetails.heroPresentationTextColor,
        heroPresentationImage: details.heroPresentationImage.trim(),
        heroLogoPositionX: details.heroLogoPositionX.trim() || defaultClassDetails.heroLogoPositionX,
        heroLogoPositionY: details.heroLogoPositionY.trim() || defaultClassDetails.heroLogoPositionY,
        heroLogoWidth: details.heroLogoWidth.trim() || defaultClassDetails.heroLogoWidth,
        heroLogoTabletPositionX: details.heroLogoTabletPositionX.trim() || defaultClassDetails.heroLogoTabletPositionX,
        heroLogoTabletPositionY: details.heroLogoTabletPositionY.trim() || defaultClassDetails.heroLogoTabletPositionY,
        heroLogoTabletWidth: details.heroLogoTabletWidth.trim() || defaultClassDetails.heroLogoTabletWidth,
        heroLogoMobilePositionX: details.heroLogoMobilePositionX.trim() || defaultClassDetails.heroLogoMobilePositionX,
        heroLogoMobilePositionY: details.heroLogoMobilePositionY.trim() || defaultClassDetails.heroLogoMobilePositionY,
        heroLogoMobileWidth: details.heroLogoMobileWidth.trim() || defaultClassDetails.heroLogoMobileWidth,
        heroMenuPositionY: details.heroMenuPositionY.trim() || defaultClassDetails.heroMenuPositionY,
        heroMenuTabletPositionY: details.heroMenuTabletPositionY.trim() || defaultClassDetails.heroMenuTabletPositionY,
        heroMenuMobilePositionY: details.heroMenuMobilePositionY.trim() || defaultClassDetails.heroMenuMobilePositionY,
        showConsultCta: details.showConsultCta,
        showEnrollCta: details.showEnrollCta,
        ctaHref: details.showConsultCta ? details.ctaConsultHref.trim() || details.ctaHref.trim() : "",
        ctaConsultHref: details.showConsultCta ? details.ctaConsultHref.trim() : "",
        ctaEnrollHref: details.showEnrollCta ? details.ctaEnrollHref.trim() : "",
        ctaConsultLabel: details.showConsultCta ? details.ctaConsultLabel.trim() || defaultConsultLabel(offering.type) : "",
        ctaEnrollLabel: details.showEnrollCta ? details.ctaEnrollLabel.trim() || defaultEnrollLabel(offering.type) : "",
        menuPlacement: menuPlacementForType(offering.type),
        homeSections: [],
        pricing,
        galleryImages,
        scheduleDays,
        showCalendarLabels: details.showCalendarLabels,
        calendarLabelsTitle: details.calendarLabelsTitle.trim() || DEFAULT_CALENDAR_LABELS_TITLE,
        calendarLabelsDescription: details.calendarLabelsDescription.trim(),
        calendarLabels,
        includedItems: details.includedItems.map((item) => item.trim()).filter(Boolean),
        heroTitle: details.heroTitle.trim(),
        heroSubtitle: details.heroSubtitle.trim(),
        detailQuestion: details.detailQuestion.trim(),
        highlightDescription: details.highlightDescription.trim(),
        subtitleTypography: normalizeRichTextTypography(details.subtitleTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY),
        detailQuestionTypography: normalizeRichTextTypography(details.detailQuestionTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY),
        highlightDescriptionTypography: normalizeRichTextTypography(details.highlightDescriptionTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY),
        descriptionTypography: normalizeRichTextTypography(details.descriptionTypography ?? DEFAULT_DESCRIPTION_TYPOGRAPHY),
        homeCard: {
          image: details.homeCard.image.trim(),
          imageAlt: details.homeCard.imageAlt.trim(),
          eyebrow: details.homeCard.eyebrow.trim(),
          title: details.homeCard.title.trim(),
          excerpt: details.homeCard.excerpt.trim(),
          excerptTypography: normalizeRichTextTypography(details.homeCard.excerptTypography ?? DEFAULT_RICH_TEXT_TYPOGRAPHY),
        },
        homeExcerpt: details.homeCard.excerpt.trim(),
        durationText: details.durationText.trim(),
        whatsappNumber: details.whatsappNumber.trim(),
        scheduleDescription: details.scheduleDescription.trim(),
        showScheduleOnFrontend: details.showScheduleOnFrontend,
        seoImage: details.seoImage,
        videoUrl: details.videoUrl.trim(),
        videoPoster: details.videoPoster.trim(),
        videoCardImage: "",
        videoCardLabel: "",
        content: {
          ...details.content,
          learningSectionTitle: details.content.learningSectionTitle.trim(),
          learningContent: details.content.learningContent.trim(),
          participationSectionTitle: details.content.participationSectionTitle.trim(),
          participationContent: details.content.participationContent.trim(),
          paymentMethods: (details.content.paymentMethodsList?.length ? details.content.paymentMethodsList : toLines(details.content.paymentMethods)).map((item) => item.trim()).filter(Boolean).join("\n"),
          paymentMethodsList: (details.content.paymentMethodsList?.length ? details.content.paymentMethodsList : toLines(details.content.paymentMethods)).map((item) => item.trim()).filter(Boolean),
          contactWhatsapp: details.content.contactWhatsapp.trim(),
          contactEmail: details.content.contactEmail.trim(),
          extraInfo: details.content.extraInfo.trim(),
          modulesSectionTitle: details.content.modulesSectionTitle.trim(),
          modulesAccordionTitle: details.content.modulesAccordionTitle.trim(),
          modules: details.content.modules.map((mod, order) => ({ ...mod, title: mod.title.trim(), description: mod.description.trim(), order })),
          activitiesSection: {
            ...details.content.activitiesSection,
            title: details.content.activitiesSection.title.trim(),
            content: details.content.activitiesSection.content.trim(),
            items: details.content.activitiesSection.items.map((item, order) => ({ ...item, title: item.title.trim(), description: item.description.trim(), order })),
          },
        },
      },
    },
  };
}
