import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { toast } from "sonner";
import { toggleWishlist, useWishlist } from "@/lib/wishlist";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const wishlist = useWishlist();
  const liked = wishlist.includes(product.id);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowLiked = toggleWishlist(product.id);
    toast.success(nowLiked ? `${product.name} added to wishlist` : `${product.name} removed from wishlist`);
  };


  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-xl transition-all group">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <button
          onClick={toggleLike}
          aria-label="Wishlist"
          className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-white/90 hover:bg-white text-foreground shadow"
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>
      <div className="p-4">
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-display text-lg leading-tight hover:text-primary">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted-foreground/40"}`}
            />
          ))}
          <span className="ml-1">({product.reviews})</span>
        </div>
        <div className="mt-2 font-semibold text-lg">₹{product.price.toLocaleString("en-IN")}</div>
        <button
          onClick={() => {
            add(product.id, 1, "1 kg");
            toast.success(`${product.name} added to cart`);
          }}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-dark text-cream rounded-full py-2.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <ShoppingBag className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
