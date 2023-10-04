import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.className}`}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
