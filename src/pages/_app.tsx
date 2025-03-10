import "@/styles/globals.css"
import type { AppProps } from "next/app"
import localFont from "next/font/local"

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Medium.otf',
      weight: '500',
      style: 'Medium',
    },
    {
      path: '../../public/fonts/Satoshi-Bold.otf',
      weight: '700',
      style: 'Bold',
    }
  ],
  variable: "--font-satoshi"
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={`${satoshi.variable} font-satoshi`}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
