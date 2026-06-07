import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionTitle } from "@/components/site/SectionTitle";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "All Cake Collections — Sweet Delights" },
      { name: "description", content: "Browse our full collection of luxury cakes." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <div className="py-16 container mx-auto px-4">
      <SectionTitle eyebrow="Shop">Our Cake Collections</SectionTitle>
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <Link to="/collections" className="rounded-full px-4 py-2 text-sm border border-primary bg-primary text-primary-foreground">
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            to="/category/$slug"
            params={{ slug: c.id }}
            className="rounded-full px-4 py-2 text-sm border border-border hover:border-primary hover:text-primary"
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
