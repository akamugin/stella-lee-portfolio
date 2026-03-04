import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stella Lee Portfolio",
  description: "Professional portfolio for Stella Lee"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
