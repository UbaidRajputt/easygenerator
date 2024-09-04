import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/toasts/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy Generator Frontend",
  description: "Frontend for Easy Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <CustomProvider>{children}</CustomProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
