import { getPublicFooterLayoutData } from "@/lib/cms/public-footer";
import { PublicFooterContent } from "./footer/PublicFooterContent";

export async function Footer({
  socialTrack = false,
}: {
  socialTrack?: boolean;
}) {
  const { model } = await getPublicFooterLayoutData();
  return <PublicFooterContent model={model} socialTrack={socialTrack} />;
}
