"use client";
import { useState, useEffect } from "react";

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Prüfe beim Laden, ob ein Token im LocalStorage vorhanden ist
    const stored = localStorage.getItem("isAdmin");
    if (stored === "true") setIsAdmin(true);
  }, []);

  function login(password: string) {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  }

  return { isAdmin, login, logout };
}
