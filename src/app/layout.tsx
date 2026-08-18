import type { Metadata } from "next";
import localFont from "next/font/local";
import { Baskervville, Inter, Manrope, Roboto_Flex } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./tailwind.css";
import "./legacy/base.css";
import "./legacy/home.css";
import "../components/home/home-section.css";
import "../components/home/featured-experience-cards.css";
import "./legacy/classes.css";
import "./legacy/shop.css";
import "../features/shop/components/catalog/shop-catalog.css";
import "../features/shop/components/item-detail/shop-item-detail.css";
import "../features/classes/components/class-detail/class-detail.css";
import "./legacy/blog.css";
import "../features/blog/components/index/blog-index.css";
import "../features/blog/components/post/blog-post-editorial.css";
import "./legacy/cart.css";
import "./legacy/studio.css";
import "./legacy/promo-entry.css";
import "./legacy/footer.css";
import "./legacy/cookiebar.css";
import "./legacy/site.css";
import "./globals.css";
import "./responsive-tuning.css";
import "./public-header-desktop.css";
import "./admin-offerings-table.css";
import "../components/home/gift-carousel.css";
import "../components/home/social-gallery-home.css";
import "../components/home/testimonial-slider-home.css";
import "../components/layout/footer/public-footer-editorial.css";
import "../components/layout/scroll-nav/home-scroll-sticky-nav.css";

const baskervville = Baskervville({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-baskervville",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap"
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  // Required for CmsRichTextField / TypographyPanel "Width" (font-variation-settings: "wdth").
  axes: ["wdth"],
  variable: "--font-roboto-flex",
  display: "swap"
});

const nunito = localFont({
  src: [
    {
      path: "../../public/fonts/Nunito-VariableFont_wght.ttf",
      style: "normal"
    },
    {
      path: "../../public/fonts/Nunito-Italic-VariableFont_wght.ttf",
      style: "italic"
    }
  ],
  variable: "--font-nunito",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://casarosierceramica.com"),
  title: {
    default: "Casa Rosier",
    template: "%s | Casa Rosier"
  },
  description: "Studio de ceramica en Barcelona"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${baskervville.variable} ${inter.variable} ${manrope.variable} ${robotoFlex.variable} ${nunito.variable}`}
      >
        {children}
        <SiteChrome />
      </body>
    </html>
  );
}
