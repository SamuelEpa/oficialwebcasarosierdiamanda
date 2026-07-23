"use client";

import { useState } from "react";
import { DetailPage } from "@/components/collections/DetailPage";
import { PublicFooterContent } from "@/components/layout/PublicFooterContent";
import type { ClassEditorPreviewChrome } from "@/lib/cms/class-editor-preview";
import type { ClassOfferingDetails, Offering } from "@/lib/cms/types";
import { PREVIEW_DEVICES } from "../constants";
import type { PreviewDevice } from "../types";
import { buildPreviewItem } from "../utils";
import { PreviewHeader } from "./PreviewHeader";
import { PublicSocialGalleryPreview } from "./PublicSocialGalleryPreview";

export function PreviewPane({
  offeringType,
  title,
  slug,
  subtitle,
  description,
  status,
  details,
  previewChrome,
}: {
  offeringType: Offering["type"];
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  status: "draft" | "published";
  details: ClassOfferingDetails;
  previewChrome: ClassEditorPreviewChrome;
}) {
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>("desktop");
  const activePreviewDevice = PREVIEW_DEVICES.find((device) => device.key === previewDevice) ?? PREVIEW_DEVICES[2];
  const previewItem = buildPreviewItem({ offeringType, title, slug, subtitle, description, details });
  const promoPage = previewItem.kind === "private-booking" ? undefined : previewItem.kind.replace("-card", "");

  return (
    <div className="cms-preview-frame">
      <div className="cms-public-preview__toolbar">
        <span>Vista previa · {status === "published" ? "Publicado" : "Borrador"}</span>
        <div className="cms-public-preview__devices" role="tablist" aria-label="Dispositivo de vista previa">
          {PREVIEW_DEVICES.map((device) => (
            <button
              key={device.key}
              type="button"
              role="tab"
              aria-selected={previewDevice === device.key}
              className={previewDevice === device.key ? "is-active" : ""}
              onClick={() => setPreviewDevice(device.key)}
            >
              {device.label}
            </button>
          ))}
        </div>
      </div>
      <div className="cms-public-preview__viewport">
        <div
          className={`cms-public-preview class-detail-page cms-public-preview--${previewDevice}`}
          data-promo-page={promoPage}
          style={{ width: `${activePreviewDevice.width}px`, maxWidth: "100%" }}
        >
          <div className="cms-public-preview__scale">
            <PreviewHeader item={previewItem} details={details} previewChrome={previewChrome} previewDevice={previewDevice} />
            <div className="cms-public-preview__body">
              <DetailPage item={previewItem} />
              {previewItem.showIdeaPromptSection ? <PublicSocialGalleryPreview previewChrome={previewChrome} /> : null}
            </div>
            <PublicFooterContent footer={previewChrome.footer} preview />
          </div>
        </div>
      </div>
    </div>
  );
}
