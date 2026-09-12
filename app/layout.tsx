import { PortfolioProvider } from "../lib/cms/provider";
import { getPortfolio } from "../lib/cms/server";
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tanjim Islam Riju - Portfolio",
  description: "Personal portfolio of Tanjim Islam Riju, Software Engineer and AI Developer",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = await getPortfolio();
  return (
    <html lang="en">
      <body className={inter.className}><PortfolioProvider initial={content}>{children}</PortfolioProvider></body>
    </html>
  )
}
