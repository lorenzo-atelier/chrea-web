import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CHRÉA — Un universo para volver a ti.",
  description:
    "Un espacio de conversación consciente. Para mujeres que saben que hay algo más. Únete al flock.",
  openGraph: {
    title: "CHRÉA — Un universo para volver a ti.",
    description:
      "Un espacio de conversación consciente. Para mujeres que saben que hay algo más.",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "CHRÉA",
    description: "Un universo para volver a ti.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <style>{`
          :root {
            --font-display: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
            --font-body: var(--font-jost), 'Jost', system-ui, sans-serif;
          }
        `}</style>
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
