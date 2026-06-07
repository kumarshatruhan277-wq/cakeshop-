import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionTitle } from "@/components/site/SectionTitle";
import { bestSellers } from "@/lib/products";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({ meta: [{ title: "Best Sellers — Sweet Delights" }] }),
  component: () => (
    <div className="py-16 container mx-auto px-4">
      <SectionTitle eyebrow="Customer Favorites">Best Sellers</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  ),
});
