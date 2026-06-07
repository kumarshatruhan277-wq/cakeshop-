import { Link } from "@tanstack/react-router";
import { Cake, Heart, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

const nav = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/best-sellers", label: "Best Sellers" },
  { to: "/about", label: "About Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  const wishlist = useWishlist();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-dark-gradient text-cream border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid place-items-center w-10 h-10 rounded-full bg-primary/20 border border-primary/40">
            <Cake className="w-5 h-5 text-gold" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl text-cream">Sweet</span>
            <span className="block font-display text-xl text-gold -mt-1">Delights</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm tracking-wide">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="uppercase hover:text-gold transition-colors"
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-gold border-b-2 border-gold pb-1" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/wishlist" className="relative grid place-items-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10" aria-label="Wishlist">
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? "fill-primary text-primary" : ""}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full w-5 h-5 grid place-items-center font-semibold">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative grid place-items-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10">
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full w-5 h-5 grid place-items-center font-semibold">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/collections"
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm font-semibold hover:opacity-90"
          >
            Order Now
          </Link>
          <button className="lg:hidden grid place-items-center w-10 h-10" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-dark-gradient">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-1 uppercase text-sm">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
