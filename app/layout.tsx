import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sitamarhi Goat Intelligence Platform",
  description:
    "Comprehensive goat farming management system for Sitamarhi, Bihar."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="main">{children}</main>
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} Sitamarhi Goat Intelligence Platform. AI-assisted
            management tailored for Bihar&apos;s agro-climate.
          </p>
        </footer>
      </body>
    </html>
  );
}
