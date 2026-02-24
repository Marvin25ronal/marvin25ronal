import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TranslationsWrapper } from './components/TranslationsWrapper';
import esMessages from '../messages/es.json';
import enMessages from '../messages/en.json';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marvin Martínez | Science & Systems Engineer",
  description: "Portfolio of Marvin Ronaldo Martínez Marroquín - Science and Systems Engineer specializing in full-stack development and modern system architecture.",
};

const allMessages = { es: esMessages, en: enMessages };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TranslationsWrapper allMessages={allMessages}>
          {children}
        </TranslationsWrapper>
      </body>
    </html>
  );
}
