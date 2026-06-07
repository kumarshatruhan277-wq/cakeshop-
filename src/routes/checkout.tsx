import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Sweet Delights" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { detailed, total, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (detailed.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    const orderId = "SD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const order = {
      orderId,
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      address: form.get("address"),
      delivery: form.get("delivery"),
      payment: form.get("payment"),
      total,
      items: detailed.map((d) => ({ name: d.product.name, weight: d.weight, qty: d.quantity, subtotal: d.subtotal })),
      placedAt: new Date().toISOString(),
    };
    localStorage.setItem("sweet-delights-last-order", JSON.stringify(order));
    setTimeout(() => {
      clear();
      navigate({ to: "/order-success" });
    }, 600);
  };

  return (
    <div className="py-12 container mx-auto px-4 grid lg:grid-cols-3 gap-10">
      <form onSubmit={onSubmit} className="lg:col-span-2 space-y-6">
        <h1 className="font-display text-3xl">Checkout</h1>
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-lg">Contact Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input name="name" label="Full Name" required />
            <Input name="phone" label="Phone" type="tel" required />
            <div className="sm:col-span-2"><Input name="email" label="Email" type="email" required /></div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-lg">Delivery</h2>
          <Input name="address" label="Delivery Address" required />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input name="delivery" label="Preferred Delivery Date" type="date" required />
            <Input name="instructions" label="Special Instructions (optional)" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
          <h2 className="font-display text-lg">Payment Method</h2>
          {["Cash on Delivery", "UPI / Card on Delivery", "Pay Online (mock)"].map((m, i) => (
            <label key={m} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary cursor-pointer">
              <input type="radio" name="payment" value={m} defaultChecked={i === 0} className="accent-primary" />
              <span>{m}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          disabled={submitting || detailed.length === 0}
          className="w-full bg-primary text-primary-foreground rounded-full py-4 font-semibold text-lg disabled:opacity-60"
        >
          {submitting ? "Placing order..." : `Place Order — ₹${total.toLocaleString("en-IN")}`}
        </button>
      </form>
      <aside className="bg-card border border-border rounded-2xl p-6 h-fit sticky top-24">
        <h2 className="font-display text-xl mb-4">Order Summary</h2>
        <div className="space-y-3">
          {detailed.map((i) => (
            <div key={i.productId + i.weight} className="flex gap-3">
              <img src={i.product.image} alt="" className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1 text-sm">
                <div className="font-medium">{i.product.name}</div>
                <div className="text-xs text-muted-foreground">{i.weight} × {i.quantity}</div>
              </div>
              <div className="text-sm font-semibold">₹{i.subtotal.toLocaleString("en-IN")}</div>
            </div>
          ))}
          {detailed.length === 0 && <p className="text-sm text-muted-foreground">Your cart is empty.</p>}
        </div>
        <div className="border-t border-border mt-4 pt-4 flex justify-between font-semibold">
          <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
        </div>
      </aside>
    </div>
  );
}

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block text-sm">
      <span className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </label>
  );
}
