import { getWhatsappHref } from "@/lib/whatsapp";

export async function WhatsAppFloat() {
  const href = await getWhatsappHref();

  return (
    <a
      className="whatsapp-float"
      href={href}
      aria-label="Escribenos por WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/img/icon-whatsapp.svg" alt="" />
    </a>
  );
}