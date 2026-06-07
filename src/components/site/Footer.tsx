import { Link } from "@tanstack/react-router";
import { Cake, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark-gradient text-cream/80 mt-20">
      <div className="container mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="grid place-items-center w-10 h-10 rounded-full bg-primary/20 border border-primary/40">
              <Cake className="w-5 h-5 text-gold" />
            </span>
            <span className="font-display text-xl">
              Sweet <span className="text-gold">Delights</span>
            </span>
          </div>
          <p className="text-sm text-cream/60">
            Crafting luxury cakes that make every celebration sweeter and more memorable.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="grid place-items-center w-9 h-9 rounded-full bg-white/5 hover:bg-primary/30">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-cream font-display text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["Home", "/"],
              ["Collections", "/collections"],
              ["Best Sellers", "/best-sellers"],
              ["About Us", "/about"],
              ["Gallery", "/gallery"],
              ["Contact", "/contact"],
            ].map(([l, h]) => (
              <li key={h}>
                <Link to={h} className="hover:text-gold">{l}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-cream font-display text-lg mb-4">Help & Info</h4>
          <ul className="space-y-2 text-sm">
            <li>FAQs</li>
            <li>Delivery Information</li>
            <li>Refund Policy</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream font-display text-lg mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-gold" /> +91 98765 43210</li>
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-gold" /> hello@sweetdelights.com</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-gold" /> 123 Cake Street, Mumbai 400001</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Sweet Delights. All Rights Reserved.
      </div>
    </footer>
  );
}
