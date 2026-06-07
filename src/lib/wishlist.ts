import { useEffect, useState } from "react";

const KEY = "sweet-delights-wishlist";
const EVT = "wishlist-changed";

export function readWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleWishlist(id: string): boolean {
  const list = readWishlist();
  const exists = list.includes(id);
  const next = exists ? list.filter((x) => x !== id) : [...list, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVT));
  return !exists;
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    setIds(readWishlist());
    const onChange = () => setIds(readWishlist());
    window.addEventListener(EVT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return ids;
}
