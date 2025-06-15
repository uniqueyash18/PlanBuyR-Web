"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Placeholder AuthContext
const AuthContext = React.createContext({
  user: null as null | { role: string },
});

const navLinks = [
  { name: "Dashboard", href: "/admin" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Posts", href: "/admin/posts" },
  { name: "Plans", href: "/admin/plans" },
  { name: "Banners", href: "/admin/banners" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Hide sidebar and header on /admin/login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#18181b]">
      {/* Header */}
      <header className="w-full h-16 flex items-center justify-between px-4 md:px-8 bg-white dark:bg-gray-900 shadow md:hidden sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="#18181b" className="dark:stroke-gray-100" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-gray-100">PlanB Admin</span>
        </div>
      </header>
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 space-y-6 fixed inset-y-0 left-0 z-30">
        <div className="flex items-center gap-2 mb-8">
          <span className="inline-block rounded-full bg-gradient-to-tr from-green-400 to-blue-500 p-1">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#fff"/><path d="M10 22V20C10 17.7909 11.7909 16 14 16H18C20.2091 16 22 17.7909 22 20V22" stroke="#18181b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="16" cy="12" r="4" stroke="#18181b" strokeWidth="2"/></svg>
          </span>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100">PlanB Admin</span>
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${pathname === link.href ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Sidebar Drawer (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 space-y-6 flex flex-col h-full animate-slide-in-left">
            <div className="flex items-center gap-2 mb-8">
              <span className="inline-block rounded-full bg-gradient-to-tr from-green-400 to-blue-500 p-1">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#fff"/><path d="M10 22V20C10 17.7909 11.7909 16 14 16H18C20.2091 16 22 17.7909 22 20V22" stroke="#18181b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="16" cy="12" r="4" stroke="#18181b" strokeWidth="2"/></svg>
              </span>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100">PlanB Admin</span>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${pathname === link.href ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          {/* Overlay */}
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 mt-0">
        <main className="flex-1 p-4 md:p-10">
          {children}
        </main>
      </div>
      <style jsx global>{`
        @keyframes slide-in-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.2s ease-out;
        }
      `}</style>
    </div>
  );
} 