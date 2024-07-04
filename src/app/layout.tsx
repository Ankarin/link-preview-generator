import "@/app/globals.css"
import { cn } from "@/lib/utils"
import { Inter as FontSans } from "next/font/google"
import { Metadata } from "next/types"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Link Preview Generator",
  description: "Generate link previews for your website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        {children}
      </body>
    </html>
  )
}
