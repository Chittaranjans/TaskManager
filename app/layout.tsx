import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import GlobalStyleProvider from "./providers/GlobalStyleProvider";
import ContextProvider from "./providers/ContextProvider";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";

const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Chittaranjans || Task Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
            integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={nunito.className}>
          <NextTopLoader color="#27AE60" height={7} easing="ease" />
          <ContextProvider>
            <GlobalStyleProvider>
              <Sidebar />
              <div className="size-full">{children}</div>
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
