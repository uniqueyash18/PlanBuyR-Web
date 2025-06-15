"use client";
import { useEffect, useState, createContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { setUser } from "@/redux/slices/userSlice";
import { getItem } from "@/hooks/apiService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const DarkModeContext = createContext({
  dark: false,
  toggle: () => {},
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      dispatch(setUser(user));
    }
  }, []);
  const toggle = () => setDark((d) => !d);

  const isAdmin = pathname.startsWith("/admin") || pathname.startsWith("/auth") || user?.role === "admin";

  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      {!isAdmin && <Header isAdmin={false} />}
      {children}
    </DarkModeContext.Provider>
  );
} 