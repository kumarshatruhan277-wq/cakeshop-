import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionTitle } from "@/components/site/SectionTitle";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  notFoundComponent: () => (
    <div className="py-24 text-center">
      <h2 className="font-display text-2xl">Cake not found</h2>
      <Link to="/collections" className="text-primary mt-4 inline-block">Browse collections</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { p };
  },
});

const weights = ["0.5 kg", "1 kg", "1.5 kg", "2 kg"];

function ProductPage() {
  const { id } = Route.useParams();
  const product = getProduct(id)!;
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState("1 kg");
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="py-12 container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden bg-muted aspect-square max-w-md mx-auto w-full">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-display text-4xl">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted-foreground/40"}`} />
              ))}
            </div>
            <span className="text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
          </div>
          <div className="mt-4 text-3xl font-semibold text-primary">₹{product.price.toLocaleString("en-IN")}</div>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-6">
            <label className="text-sm font-semibold">Weight</label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {weights.map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={`rounded-full px-4 py-2 text-sm border ${weight === w ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold">Quantity</label>
            <div className="flex items-center gap-3 mt-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-secondary">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-secondary">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => {
                add(product.id, qty, weight);
                toast.success("Added to cart");
              }}
              className="inline-flex items-center gap-2 bg-dark text-cream rounded-full px-6 py-3 font-semibold hover:bg-primary hover:text-primary-foreground"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
            <button
              onClick={() => {
                add(product.id, qty, weight);
                navigate({ to: "/checkout" });
              }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 font-semibold"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionTitle>You May Also Like</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
