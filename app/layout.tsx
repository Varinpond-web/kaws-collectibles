import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import Provider from "@/components/Provider";
import 'tailwindcss/tailwind.css'
import getImageUrl from 'azureBlobStorage';
import Image from 'next/image';
export const metadata = {
  title: "Precedent - Building blocks for your Next.js project",
  description:
    "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  twitter: {
    card: "summary_large_image",
    title: "Precedent - Building blocks for your Next.js project",
    description:
      "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
    creator: "@steventey",
  },
  metadataBase: new URL("https://precedent.dev"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerName = 'image';
  const url = await getImageUrl(containerName, "wallpaper.png");
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <Provider>
          
          <div className="fixed h-screen w-full from-indigo-50 via-white to-cyan-100" />
          <Suspense fallback="...">
            {/* @ts-expect-error Server Component */}
            <Nav />
          </Suspense>
          <main className="flex min-h-screen w-full flex-col items-center py-32">
          {/* <main className="flex w-full flex-col items-center justify-center"> */}
          <div className="fixed inset-0 z-negative">
            <Image
                src="https://varinstorage.blob.core.windows.net/image/wallpaper.png"
                alt="background image"
                layout="fill"
                objectFit="cover"
            />
          </div>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
