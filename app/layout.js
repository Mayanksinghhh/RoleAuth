// app/layout.tsx
import "./globals.css";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // choose weights you want
  variable: "--font-roboto-mono",
});

export const metadata = {
  title: "My App",
  description: "Next.js App with Roboto Mono",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={robotoMono.variable}>
      <body className="font-mono">{children}</body>
    </html>
  );
}
