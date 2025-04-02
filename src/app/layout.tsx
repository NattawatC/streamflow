import { ReactNode } from "react"
import "@/styles/globals.css"
import { Toaster } from "@/components/ui/sonner"
import localFont from "next/font/local"

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "Medium",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "Bold",
    },
  ],
  variable: "--font-satoshi",
})

const subjectivity = localFont({
  src: [
    {
      path: "../../public/fonts/Subjectivity-Medium.otf",
      weight: "500",
      style: "Medium",
    },
  ],
  variable: "--font-subjectivity",
})

export default function RootLayout({
  children, // This will be the injected content of each page
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${satoshi.variable} font-satoshi ${subjectivity.variable}`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
