import "./globals.css";
import Navbar from "./components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bennet Bewerbungsseite",
  description: "Digitale Bewerbung im Bereich IT-Projektmanagement",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}

