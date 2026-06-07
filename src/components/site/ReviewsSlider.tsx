import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Ananya & Rahul",
    rating: 5,
    text: "The cake was beyond beautiful and tasted absolutely amazing! It made our anniversary so special.",
    initials: "AR",
  },
  {
    name: "Priya Mehta",
    rating: 5,
    text: "Best cake we've ever had! So moist, rich and perfectly designed. Highly recommend Sweet Delights.",
    initials: "PM",
  },
  {
    name: "Karan & Neha",
    rating: 5,
    text: "They truly care about every little detail. Our wedding cake was a dream come true!",
    initials: "KN",
  },
  {
    name: "Sanya Kapoor",
    rating: 5,
    text: "Showstopping presentation and unbelievable flavor. My guests still talk about it.",
    initials: "SK",
  },
  {
    name: "Arjun Verma",
    rating: 5,
    text: "Custom design was nailed to perfection. Fast delivery and lovely packaging.",
    initials: "AV",
  },
];

export function ReviewsSlider() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pages = Math.max(1, reviews.length - perPage + 1);
  useEffect(() => {
    const t = setInterval(() => setPage((p) => (p + 1) % pages), 5000);
    return () => clearInterval(t);
  }, [pages]);

  const visible = reviews.slice(page, page + perPage);

  return (
    <div className="relative">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((r) => (
          <div key={r.name} className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-center text-sm text-foreground/80 mb-5">"{r.text}"</p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 grid place-items-center text-primary font-semibold">
                {r.initials}
              </div>
              <div className="font-medium">{r.name}</div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setPage((p) => (p - 1 + pages) % pages)}
        className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow grid place-items-center hover:bg-primary hover:text-primary-foreground"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setPage((p) => (p + 1) % pages)}
        className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow grid place-items-center hover:bg-primary hover:text-primary-foreground"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
