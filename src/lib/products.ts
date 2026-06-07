import chocolateTruffle from "@/assets/cake-chocolate-truffle.jpg";
import redVelvet from "@/assets/cake-red-velvet.jpg";
import blackForest from "@/assets/cake-black-forest.jpg";
import butterscotch from "@/assets/cake-butterscotch.jpg";
import hazelnut from "@/assets/cake-hazelnut.jpg";
import fruit from "@/assets/cake-fruit.jpg";
import pinkRose from "@/assets/cake-pink-rose.jpg";
import vanilla from "@/assets/cake-vanilla.jpg";
import tiramisu from "@/assets/cake-tiramisu.jpg";
import heroWedding from "@/assets/hero-wedding.jpg";
import heroBirthday from "@/assets/hero-birthday.jpg";

export type Category =
  | "wedding"
  | "birthday"
  | "chocolate"
  | "custom"
  | "fruit";

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: Category;
  description: string;
  bestSeller?: boolean;
}

export const categories: { id: Category; name: string; icon: string }[] = [
  { id: "wedding", name: "Wedding Cakes", icon: "🎂" },
  { id: "birthday", name: "Birthday Cakes", icon: "🎉" },
  { id: "chocolate", name: "Premium Chocolate", icon: "🍫" },
  { id: "custom", name: "Custom Cakes", icon: "✨" },
  { id: "fruit", name: "Fruit Cakes", icon: "🍓" },
];

export const products: Product[] = [
  {
    id: "royal-chocolate-truffle",
    name: "Royal Chocolate Truffle",
    price: 1499,
    rating: 4.8,
    reviews: 128,
    image: chocolateTruffle,
    category: "chocolate",
    description:
      "Rich double-chocolate sponge layered with truffle ganache, topped with handcrafted chocolate truffles and gold dust.",
    bestSeller: true,
  },
  {
    id: "red-velvet-delight",
    name: "Red Velvet Delight",
    price: 1299,
    rating: 4.7,
    reviews: 96,
    image: redVelvet,
    category: "birthday",
    description:
      "Velvety crimson sponge with luxurious cream cheese frosting, finished with a hand-piped rose.",
    bestSeller: true,
  },
  {
    id: "black-forest",
    name: "Black Forest",
    price: 1199,
    rating: 4.6,
    reviews: 154,
    image: blackForest,
    category: "chocolate",
    description:
      "A classic combination of chocolate sponge, fresh cherries and clouds of whipped cream.",
    bestSeller: true,
  },
  {
    id: "butterscotch-bliss",
    name: "Butterscotch Bliss",
    price: 1199,
    rating: 4.5,
    reviews: 112,
    image: butterscotch,
    category: "birthday",
    description:
      "Buttery sponge soaked in caramel, topped with butterscotch crunch and house-made cream.",
    bestSeller: true,
  },
  {
    id: "chocolate-hazelnut",
    name: "Chocolate Hazelnut",
    price: 1499,
    rating: 4.9,
    reviews: 87,
    image: hazelnut,
    category: "chocolate",
    description:
      "Decadent chocolate cake with toasted hazelnut praline and ferrero-style truffles.",
    bestSeller: true,
  },
  {
    id: "fresh-fruit-paradise",
    name: "Fresh Fruit Paradise",
    price: 1399,
    rating: 4.7,
    reviews: 73,
    image: fruit,
    category: "fruit",
    description:
      "Light vanilla sponge layered with whipped cream and a crown of seasonal fresh fruit.",
  },
  {
    id: "pink-rose-bouquet",
    name: "Pink Rose Bouquet",
    price: 1899,
    rating: 4.9,
    reviews: 65,
    image: pinkRose,
    category: "custom",
    description:
      "A romantic floral statement cake hand-piped to look like a bouquet of pink roses.",
  },
  {
    id: "vanilla-gold",
    name: "Vanilla Gold",
    price: 1099,
    rating: 4.5,
    reviews: 142,
    image: vanilla,
    category: "birthday",
    description:
      "Madagascan vanilla bean sponge with silky buttercream and edible gold accents.",
  },
  {
    id: "tiramisu-classico",
    name: "Tiramisu Classico",
    price: 1349,
    rating: 4.8,
    reviews: 58,
    image: tiramisu,
    category: "chocolate",
    description:
      "Espresso-soaked layers with mascarpone cream and a generous dusting of cocoa.",
  },
  {
    id: "royal-wedding-tier",
    name: "Royal Wedding Tier",
    price: 4999,
    rating: 5.0,
    reviews: 42,
    image: heroWedding,
    category: "wedding",
    description:
      "Three-tier wedding masterpiece dressed in pearl buttercream and fresh roses.",
  },
  {
    id: "strawberry-blush",
    name: "Strawberry Blush",
    price: 1299,
    rating: 4.6,
    reviews: 89,
    image: heroBirthday,
    category: "fruit",
    description:
      "Pillow-soft pink sponge crowned with fresh strawberries and edible roses.",
  },
  {
    id: "midnight-truffle",
    name: "Midnight Truffle",
    price: 1599,
    rating: 4.9,
    reviews: 51,
    image: chocolateTruffle,
    category: "chocolate",
    description:
      "Deep dark chocolate ganache with a molten truffle center for true chocolate lovers.",
  },
];

export const bestSellers = products.filter((p) => p.bestSeller);

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const getByCategory = (cat: Category) =>
  products.filter((p) => p.category === cat);
