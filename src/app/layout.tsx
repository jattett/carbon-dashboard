import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carbon Emissions Dashboard - HanaLoop",
  description: "Monitor and manage your organization's carbon footprint with real-time analytics and insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="ko">
          <body className="antialiased">
            {children}
          </body>
        </html>
  );
}
