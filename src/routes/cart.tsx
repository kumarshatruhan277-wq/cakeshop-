import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Sweet Delights" }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, total, clear } = useCart();

  if (detailed.length === 0) {
    return (
      <div className="py-24 text-center container mx-auto px-4">
        <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-3xl">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Discover our handcrafted cakes and add a sweet treat.</p>
        <Link to="/collections" className="inline-block mt-6 bg-primary text-primary-foreground rounded-full px-6 py-3 font-semibold">
          Browse Cakes
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 container mx-auto px-4 grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <h1 className="font-display text-3xl mb-6">Your Cart</h1>
        <div className="space-y-4">
          {detailed.map((i) => (
            <div key={i.productId + i.weight} className="flex gap-4 bg-card border border-border rounded-2xl p-4">
              <img src={i.product.image} alt={i.product.name} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg">{i.product.name}</h3>
                    <p className="text-xs text-muted-foreground">{i.weight}</p>
                  </div>
                  <button onClick={() => remove(i.productId, i.weight)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setQty(i.productId, i.weight, i.quantity - 1)} className="w-8 h-8 rounded-full border border-border grid place-items-center">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{i.quantity}</span>
                    <button onClick={() => setQty(i.productId, i.weight, i.quantity + 1)} className="w-8 h-8 rounded-full border border-border grid place-items-center">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="font-semibold">₹{i.subtotal.toLocaleString("en-IN")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={clear} className="text-sm text-muted-foreground hover:text-destructive mt-4">Clear cart</button>
      </div>
      <aside className="bg-card border border-border rounded-2xl p-6 h-fit sticky top-24">
        <h2 className="font-display text-xl mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span className="text-primary">Free</span></div>
          <div className="border-t border-border pt-3 flex justify-between text-base font-semibold">
            <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <Link to="/checkout" className="block text-center bg-primary text-primary-foreground rounded-full px-6 py-3 mt-6 font-semibold">
          Proceed to Checkout
        </Link>
        <Link to="/collections" className="block text-center text-primary text-sm mt-3">Continue Shopping</Link>
      </aside>
    </div>
  );
}
