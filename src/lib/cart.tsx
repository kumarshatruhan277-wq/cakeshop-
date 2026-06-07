import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

export interface CartItem {
  productId: string;
  quantity: number;
  weight: string;
}

interface CartContextValue {
  items: CartItem[];
  add: (productId: string, quantity?: number, weight?: string) => void;
  remove: (productId: string, weight: string) => void;
  setQty: (productId: string, weight: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  detailed: (CartItem & { product: Product; subtotal: number })[];
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "sweet-delights-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const add: CartContextValue["add"] = (productId, quantity = 1, weight = "1 kg") => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.weight === weight);
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { productId, quantity, weight }];
    });
  };

  const remove: CartContextValue["remove"] = (productId, weight) => {
    setItems((p) => p.filter((i) => !(i.productId === productId && i.weight === weight)));
  };

  const setQty: CartContextValue["setQty"] = (productId, weight, qty) => {
    if (qty <= 0) return remove(productId, weight);
    setItems((p) =>
      p.map((i) => (i.productId === productId && i.weight === weight ? { ...i, quantity: qty } : i)),
    );
  };

  const clear = () => setItems([]);

  const weightMultiplier = (w: string) => {
    if (w === "0.5 kg") return 0.6;
    if (w === "1 kg") return 1;
    if (w === "1.5 kg") return 1.4;
    if (w === "2 kg") return 1.85;
    return 1;
  };

  const detailed = items
    .map((i) => {
      const product = getProduct(i.productId);
      if (!product) return null;
      const subtotal = Math.round(product.price * weightMultiplier(i.weight) * i.quantity);
      return { ...i, product, subtotal };
    })
    .filter(Boolean) as (CartItem & { product: Product; subtotal: number })[];

  const total = detailed.reduce((s, i) => s + i.subtotal, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, total, detailed }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
