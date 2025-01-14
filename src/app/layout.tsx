import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import RootProviders from "./root-providers";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "File Go",
  description: "Send Files Really Fast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased`}
      >
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
