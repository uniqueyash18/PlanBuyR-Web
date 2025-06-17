"use client";
import { DarkModeContext } from "@/app/ClientLayout";
import { removeItem } from "@/hooks/apiService";
import { clearUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface HeaderProps {
  isAdmin?: boolean;
}

export default function Header({ isAdmin = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { dark, toggle } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.currentUser);
  console.log(user, 'user')
  // Navigation links for user
  const navLinks = [
    { name: "Wishlist", href: "/wishlist" },
    { name: "Profile", href: "/profile" },
  ];

  // Navigation links for admin (customize as needed)
  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
  ];

  const links = isAdmin ? adminLinks : navLinks;

  const handleLogout = () => {
    dispatch(clearUser());
    removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <header className="w-full bg-[#18181b] text-white shadow-lg sticky top-0 z-50 px-4 md:px-8">
      <div className="container flex items-center h-20 justify-between">
        {/* Logo */}
        <Link href={isAdmin ? "/admin" : "/"} className="flex items-center gap-4 md:gap-6 flex-shrink-0">
          <div className="w-20 h-20 relative">
            <Image src="/logo.png" alt="PlanB" fill className="object-contain" />
          </div>
          <span className="font-extrabold text-2xl md:text-3xl tracking-tight leading-tight select-none" style={{ fontFamily: 'Geist, Inter, sans-serif' }}>
            {isAdmin ? (
              <>
                PlanB <span className="text-green-400 font-bold">Admin</span>
                <span className="block text-xs font-normal text-gray-400 ml-1 md:ml-2">(PlanBuyR)</span>
              </>
            ) : (
              <>
                PlanB <span className="text-green-400 font-bold">(PlanBuyR)</span>
              </>
            )}
          </span>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 ml-auto">
          {user ? (
            <>
              {/* {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`hover:text-green-400 transition-colors font-medium text-lg px-2 py-1 rounded ${pathname === link.href ? "text-green-400 bg-gray-800" : ""}`}
                >
                  {link.name}
                </Link>
              ))} */}
              <button
                onClick={handleLogout}
                className="ml-4 text-white hover:text-red-600 font-medium text-lg px-2 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="ml-4 text-white hover:underline font-medium text-lg transition"
            >
              Login
            </Link>
          )}
        </nav>
        {/* Profile/Avatar */}
        <div className="flex items-center gap-3 md:gap-4 ml-2">
          {/* Dark mode toggle */}
          {/* <button
            onClick={toggle}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 border border-gray-800 hover:ring-2 hover:ring-green-400 transition-all mr-2"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#fde68a"/></svg>
            ) : (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#fbbf24"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
          </button> */}
          {/* Mobile menu button */}
          <button
            className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-[#18181b] border-t border-gray-800 px-4 pb-4">
          <div className="flex flex-col gap-4 mt-2">
            {user ? (
              <>
                {/* {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`py-2 px-2 rounded hover:bg-gray-800 transition-colors font-medium text-lg ${pathname === link.href ? "text-green-400" : "text-white"}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))} */}
                
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="mt-2 text-white hover:text-red-600 font-medium text-lg px-2 py-1  rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="py-2 px-2 text-white hover:underline font-medium text-lg mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
} 