import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionTitle } from "@/components/site/SectionTitle";
import { categories, getByCategory, type Category } from "@/lib/products";

export const Route = createFileRoute("/category/$slug")({
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="py-24 text-center">
      <h2 className="font-display text-2xl">Category not found</h2>
      <Link to="/collections" className="text-primary mt-4 inline-block">Back to collections</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  loader: ({ params }) => {
    const cat = categories.find((c) => c.id === params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const cat = categories.find((c) => c.id === (slug as Category))!;
  const list = getByCategory(slug as Category);
  return (
    <div className="py-16 container mx-auto px-4">
      <SectionTitle eyebrow="Category">{cat.name}</SectionTitle>
      {list.length === 0 ? (
        <p className="text-center text-muted-foreground">No cakes in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
