import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SonicWave Pro - Sound Redefined",
  description: "Experience the next generation of high-fidelity audio engineering with SonicWave Pro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
