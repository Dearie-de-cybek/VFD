import type { Metadata } from "next";
import { Fraunces, Epilogue } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Values for Daily Living — Character is the seed. Society is the harvest.",
  description:
    "Values for Daily Living (VDL) is a Nigeria-based non-profit teaching integrity, responsibility, empathy, honesty and discipline — transforming lives through values education, youth mentorship and community outreach.",
  openGraph: {
    title: "Values for Daily Living",
    description:
      "Changing minds and transforming lives through the teaching of values.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${epilogue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
