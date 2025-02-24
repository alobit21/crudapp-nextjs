import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-2-3xl lg:px-48 px-8 mx-auto text-slate-800">
          <header className="p-6 border-b items-center bg-blue-500 rounded-bl-lg rounded-br-lg  flex justify-between">
            <Link className="text-2xl text-white font-bold" href="/">Tech Interprettion</Link>
            <Link  className="bg-slate-100 grid place-items-center py-2 px-4 rounded-full font-bold shadow-md" href="/create">Add new</Link>

          </header>
          <main>
          {children}
          </main>
          </div>
          </body>
    </html>
  );
}
