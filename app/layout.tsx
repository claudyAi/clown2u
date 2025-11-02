import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clown2U - What Kind of Clown Are You?",
  description: "Discover your inner clown personality with our fun quiz!",
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
