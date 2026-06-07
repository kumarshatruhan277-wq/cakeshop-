import { createFileRoute } from "@tanstack/react-router";
import { Diamond, Heart, Truck } from "lucide-react";
import aboutChef from "@/assets/about-chef.jpg";
import { SectionTitle } from "@/components/site/SectionTitle";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Sweet Delights" }] }),
  component: () => (
    <div>
      <div className="bg-dark-gradient text-cream py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <img src={aboutChef} alt="Chef at work" className="rounded-2xl shadow-2xl" />
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-gold mb-3">About Us</p>
            <h1 className="font-display text-4xl md:text-5xl">Passion in <span className="text-gold">Every Slice</span></h1>
            <p className="mt-4 text-cream/75">
              Sweet Delights was born from a love of celebration. For over a decade we have been
              hand-crafting cakes from the finest ingredients, dressing each one in detail and care,
              and delivering joy by the slice.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: Diamond, label: "Premium Ingredients" },
                { icon: Heart, label: "Handcrafted Perfection" },
                { icon: Truck, label: "Freshly Baked" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
                  <div className="text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 container mx-auto px-4 text-center max-w-2xl">
        <SectionTitle>Our Story</SectionTitle>
        <p className="text-muted-foreground">
          From a tiny home oven to a celebrated luxury cake studio, our journey has been sweetened
          by every customer who let us be part of their special moments. We blend classic technique
          with bold artistry to create cakes you'll remember for a lifetime.
        </p>
      </div>
    </div>
  ),
});
