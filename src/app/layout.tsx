import React from "react";
import {Metadata} from "next";
import "./globals.css";
import Providers from '../store/provider';
import InitUser from "@/src/app/initUser";
import ScrollProvider from "@/src/app/scrollProvider";

export const metadata: Metadata = {
  title: "Project",
  description: "Module 4 final project",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="vi">
      <body>
      <Providers >
          <InitUser/>
          <ScrollProvider>
              {children}
          </ScrollProvider>
      </Providers>
      </body>
    </html>
  );
}
