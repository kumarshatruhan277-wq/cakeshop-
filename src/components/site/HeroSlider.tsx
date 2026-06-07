import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import heroChocolate from "@/assets/hero-chocolate.jpg";
import heroWedding from "@/assets/hero-wedding.jpg";
import heroBirthday from "@/assets/hero-birthday.jpg";

const slides = [
  {
    eyebrow: "Premium Cakes For Every Occasion",
    title: "Crafting",
    titleAccent: "Sweet Luxury",
    script: "For Life's Most Precious Moments",
    description: "Handcrafted with love, our luxury cakes turn every celebration into an unforgettable experience.",
    image: heroChocolate,
  },
  {
    eyebrow: "Tiered Wedding Cake Collection",
    title: "Forever",
    titleAccent: "Begins Here",
    script: "Made For Your Big Day",
    description: "Multi-tier wedding cakes hand-dressed in silk buttercream and fresh blooms.",
    image: heroWedding,
  },
  {
    eyebrow: "Birthday Specials",
    title: "Make a Wish",
    titleAccent: "Taste the Magic",
    script: "Happy Birthday, Sweet Soul",
    description: "Pretty-in-pink birthday cakes loaded with seasonal fruit and silky cream.",
    image: heroBirthday,
  },
];

export function HeroSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = slides[idx];
  return (
    <section className="relative bg-dark-gradient text-cream overflow-hidden">
      <div className="container mx-auto px-4 py-10 md:py-24 grid md:grid-cols-2 gap-8 md:gap-10 items-center md:min-h-[560px]">
        <div className="relative order-2 md:order-1 z-10">
          <p className="uppercase tracking-[0.35em] text-xs text-gold/90 mb-4">{s.eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            {s.title} <br /> <span className="text-gold">{s.titleAccent}</span>
          </h1>
          <p className="font-script text-gold text-2xl md:text-3xl mt-3">{s.script}</p>
          <p className="mt-5 max-w-md text-cream/75">{s.description}</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 font-semibold hover:opacity-90"
            >
              <ShoppingBag className="w-4 h-4" /> Order Now
            </Link>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 border border-cream/30 text-cream rounded-full px-6 py-3 font-semibold hover:bg-cream/10"
            >
              View Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "bg-gold w-10" : "bg-cream/30 w-4"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <div className="aspect-square w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] mx-auto rounded-full overflow-hidden ring-1 ring-gold/30 shadow-2xl">
            <img src={s.image} alt={s.titleAccent} className="w-full h-full object-cover transition-all duration-700" />
          </div>
          <div className="absolute -top-2 right-2 md:right-12 bg-dark/80 backdrop-blur border border-gold/40 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs uppercase tracking-widest text-gold">
            Sweet Delights · Luxury
          </div>
        </div>
      </div>
    </section>
  );
}
