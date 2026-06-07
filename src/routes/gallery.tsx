import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { SectionTitle } from "@/components/site/SectionTitle";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Cake Gallery — Sweet Delights" }] }),
  component: () => (
    <div className="py-16 container mx-auto px-4">
      <SectionTitle eyebrow="Inspiration">Cake Gallery</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="aspect-square rounded-2xl overflow-hidden group">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </Link>
        ))}
      </div>
    </div>
  ),
});
