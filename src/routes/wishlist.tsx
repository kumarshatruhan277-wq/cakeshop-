import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionTitle } from "@/components/site/SectionTitle";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "My Wishlist — Sweet Delights" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="py-16 container mx-auto px-4">
      <SectionTitle>My Wishlist</SectionTitle>
      {items.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-12 h-12 mx-auto text-muted-foreground/40" />
          <p className="mt-4 text-muted-foreground">Your wishlist is empty. Tap the heart on any cake to save it here.</p>
          <Link to="/collections" className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 font-semibold">
            Browse Cakes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
