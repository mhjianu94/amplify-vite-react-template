import type { Metadata } from "next";
import "./globals.css";
import { AmplifyProvider } from "@/components/amplify-provider";
import '@/lib/amplify-config';

export const metadata: Metadata = {
  title: "Amplify + Next.js App",
  description: "A Next.js app with AWS Amplify backend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AmplifyProvider>{children}</AmplifyProvider>
      </body>
    </html>
  );
}
