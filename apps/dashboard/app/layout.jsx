import { meta } from "@config";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import { Session } from "components/blocks/client/Session";
import { Hotjar } from "components/blocks/Hotjar";
import { Nav } from "components/nav/Nav";
import { Inter } from "next/font/google";
import Link from "next/link";
import "styles/globals.css";
import "styles/progress.css";
import "styles/tippy.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
 title: {
  default: meta.title,
  template: `%s | ${meta.title}`,
 },
 description: meta.description,
 openGraph: {
  title: meta.title,
  description: meta.description,
  url: meta.url,
  siteName: meta.title,
  images: [
   {
    url: meta.url + meta.image,
    width: 1200,
    height: 630,
   },
  ],
  locale: meta.locale,
  type: "website",
 },
 robots: {
  index: true,
  follow: true,
  googleBot: {
   index: true,
   follow: true,
   "max-video-preview": -1,
   "max-image-preview": "large",
   "max-snippet": -1,
  },
 },
 twitter: {
  title: meta.title,
  card: "summary_large_image",
 },
 icons: {
  shortcut: "/favicon.ico",
 },
};

export default function RootLayout({ children }) {
 return (
  <Session>
   <html lang="en">
    <head>{process.env.HOTJAR_ID && <Hotjar id={process.env.HOTJAR_ID} />}</head>
    <body className={clsx("bg-background-primary text-white relative", inter.className)}>
     <Nav />
     <main className="flex w-full flex-col items-center bg-background-primary antialiased md:py-16 md:px-16 px-8 py-8">
      <>{children}</>
      <div className="fixed z-50 bottom-0 left-0 rounded-xl right-0 w-fit mx-auto mb-6 backdrop-blur-[9px] px-6 bg-background-navbar/70 border-neutral-800 border text-white text-center py-4">
       Note: The site is still in development. Please report any bugs or issues to the{" "}
       <Link href="/discord" target={"_blank"} className="text-button-primary hover:underline">
        support server.
       </Link>
      </div>
     </main>
     <Analytics />
    </body>
   </html>
  </Session>
 );
}
