import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Cake, Diamond, Heart, Truck } from "lucide-react";
import { toast } from "sonner";
import { HeroSlider } from "@/components/site/HeroSlider";
import { ReviewsSlider } from "@/components/site/ReviewsSlider";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ProductCard } from "@/components/site/ProductCard";
import { bestSellers, categories, products } from "@/lib/products";
import aboutChef from "@/assets/about-chef.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sweet Delights — Luxury Cakes for Every Occasion" },
      { name: "description", content: "Handcrafted luxury cakes for weddings, birthdays and every sweet celebration." },
    ],
  }),
  component: Home,
});

function Home() {
  const gallery = products.slice(0, 8);
  return (
    <div>
      <HeroSlider />

      {/* Collections */}
      <section className="py-20 container mx-auto px-4">
        <SectionTitle eyebrow="Our">Our Cake Collections</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((c) => {
            const first = products.find((p) => p.category === c.id);
            return (
              <Link
                key={c.id}
                to="/category/$slug"
                params={{ slug: c.id }}
                className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-square bg-muted overflow-hidden">
                  {first && (
                    <img
                      src={first.image}
                      alt={c.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center text-lg shadow">
                    <Cake className="w-5 h-5" />
                  </span>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold uppercase text-sm tracking-wide">{c.name}</h3>
                  <span className="inline-flex items-center gap-1 text-primary text-sm mt-2">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-2">
            <div className="flex-1" />
            <Link to="/best-sellers" className="text-primary inline-flex items-center gap-1 text-sm font-semibold">
              View All Cakes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <SectionTitle>Best Sellers</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-dark-gradient text-cream py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <img src={aboutChef} alt="Chef" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
            <div className="absolute -bottom-6 -right-4 md:right-10 bg-primary text-primary-foreground rounded-full w-28 h-28 grid place-items-center text-center font-display shadow-xl">
              <div>
                <div className="text-2xl font-bold">10+</div>
                <div className="text-[10px] uppercase tracking-wide">Years of excellence</div>
              </div>
            </div>
          </div>
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-gold mb-3">About Us</p>
            <h2 className="font-display text-4xl md:text-5xl">
              Passion in <span className="text-gold">Every Slice</span>
            </h2>
            <p className="mt-4 text-cream/75 max-w-md">
              At Sweet Delights, every cake is more than a dessert — it's a masterpiece. We use the finest ingredients,
              artistic designs, and a lot of love to bring sweetness to your special moments.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8 text-center">
              {[
                { icon: Diamond, label: "Premium Ingredients" },
                { icon: Heart, label: "Handcrafted Perfection" },
                { icon: Truck, label: "Freshly Baked Everyday" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
                  <div className="text-xs">{label}</div>
                </div>
              ))}
            </div>
            <Link to="/custom-order" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 mt-8 font-semibold">
              Place Custom Order <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 container mx-auto px-4">
        <SectionTitle>What Our Customers Say</SectionTitle>
        <ReviewsSlider />
      </section>

      {/* Gallery */}
      <section className="pb-20 container mx-auto px-4">
        <SectionTitle>Cake Gallery</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((p) => (
            <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="aspect-square overflow-hidden rounded-2xl block group">
              <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/gallery" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 font-semibold">
            View More Photos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Custom order CTA */}
      <CustomOrderSection />
    </div>
  );
}

function CustomOrderSection() {
  const navigate = useNavigate();
  return (
    <section id="custom" className="bg-secondary/30 py-16">
      <div className="container mx-auto px-4">
        <SectionTitle>Custom Cake Order</SectionTitle>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Custom order request received! We'll call you soon.");
              (e.target as HTMLFormElement).reset();
              setTimeout(() => navigate({ to: "/order-success" }), 1200);
            }}
            className="grid sm:grid-cols-2 gap-3"
          >
            <select required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm">
              <option value="">Select Occasion</option>
              <option>Birthday</option><option>Wedding</option><option>Anniversary</option><option>Corporate</option><option>Other</option>
            </select>
            <select required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm">
              <option value="">Select Cake Flavor</option>
              <option>Chocolate</option><option>Vanilla</option><option>Red Velvet</option><option>Butterscotch</option><option>Fruit</option>
            </select>
            <select required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm">
              <option value="">Select Weight</option>
              <option>1 kg</option><option>2 kg</option><option>3 kg</option><option>5 kg</option>
            </select>
            <input type="date" required placeholder="dd / mm / yyyy" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
            <textarea
              rows={3}
              placeholder="Special Instructions (Optional)"
              className="sm:col-span-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            />
            <div className="sm:col-span-2 flex justify-center">
              <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-3 font-semibold hover:opacity-90">
                Place Custom Order <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
          <div className="grid gap-5">
            {[
              { icon: Diamond, title: "Premium Quality", text: "We use the finest ingredients for unmatched taste." },
              { icon: Truck, title: "On-Time Delivery", text: "We deliver happiness right at your doorstep." },
              { icon: Heart, title: "100% Satisfaction", text: "Your happiness is our biggest reward." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-base">{title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
