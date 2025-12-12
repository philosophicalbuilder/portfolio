import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-vercel-url.vercel.app'),
  title: "Ramkrishna's Portfolio Website",
  description:
    "Computer Science student at the University of Virginia. Product Designer and PM at NASA, Policy Analyst at MIT. Building AI-driven interfaces and collaborative research tools.",
  keywords: [
    "Ramkrishna Sharma",
    "Portfolio",
    "Computer Science",
    "University of Virginia",
    "NASA",
    "MIT",
    "Product Design",
    "Product Management",
    "AI Tools",
  ],
  authors: [{ name: "Ramkrishna Sharma" }],
  creator: "Ramkrishna Sharma",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://github.com/philosophicalbuilder/portfolio",
    title: "Ramkrishna's Portfolio Website",
    description:
      "Computer Science student at the University of Virginia. Product Designer and PM at NASA, Policy Analyst at MIT. Building AI-driven interfaces and collaborative research tools.",
    siteName: "Ramkrishna's Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ramkrishna Sharma - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramkrishna's Portfolio Website",
    description: "Computer Science student at the University of Virginia. Product Designer and PM at NASA, Policy Analyst at MIT.",
    images: ["/opengraph-image"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ramkrishna Sharma",
              url: "https://github.com/philosophicalbuilder/portfolio",
              image: "/profile.jpg",
              sameAs: [
                "https://www.youtube.com/@TheInnovationLabx",
              ],
              jobTitle: "Computer Science Student & Product Designer",
              worksFor: [
                {
                  "@type": "Organization",
                  name: "NASA",
                },
                {
                  "@type": "Organization",
                  name: "MIT",
                },
                {
                  "@type": "Organization",
                  name: "University of Virginia",
                },
              ],
              description:
                "Computer Science student at the University of Virginia. Product Designer and PM at NASA, Policy Analyst at MIT. Building AI-driven interfaces and collaborative research tools.",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <Suspense fallback={null}>
            {children}
            <Toaster />
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
