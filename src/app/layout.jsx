import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryClientProvider } from "../lib/db";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Lumières sur Chambord",
  description: "Prenez le contrôle de la liste de musique!",
};

export default function RootLayout({
  children,
}) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-red-700 text-white`}
        >
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
