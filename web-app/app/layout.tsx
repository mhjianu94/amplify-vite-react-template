import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Welcome",
  description: "A Next.js app with shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
