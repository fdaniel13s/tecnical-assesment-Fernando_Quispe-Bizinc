import { Inter } from "next/font/google";
import "./globals.css";
import Toolbar from "../components/toolbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "TodoList - Blogs",
    description: "Sample Web Application about technical test.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Toolbar />
        {children}
        </body>
        </html>
    );
}