import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "人力资源管理系统",
  description: "一个全面的人力资源管理解决方案",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <li>
      <Link href={href} className="block py-2 px-4 hover:bg-gray-700 rounded">
        {children}
      </Link>
    </li>
  );

  return (
    <html lang="zh">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen`}
      >
        <nav className="bg-gray-800 text-white w-48 flex-shrink-0">
          <ul className="flex flex-col space-y-2 p-4">
            <NavLink href="/">首页</NavLink>
            <NavLink href="/employees">员工信息</NavLink>
            <NavLink href="/organization">组织架构</NavLink>
            <NavLink href="/salary">薪资管理</NavLink>
            <NavLink href="/recruitment">人才计划</NavLink>
          </ul>
        </nav>
        <main className="flex-grow p-8 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
