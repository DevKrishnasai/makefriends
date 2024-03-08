import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { GlobalProvider } from "@/providers/globalProvider";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MakeFriends",
  description:
    "It is a chat application that allows you to connect to different people with different languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <GlobalProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative h-full w-full bg-white dark:bg-black">
                <div className="overflow-hidden absolute bottom-0 right-0 left-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                <div className="xl:max-w-6xl mx-auto">
                  <Navbar />
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </GlobalProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
