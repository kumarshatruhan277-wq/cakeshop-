import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/order-success")({
  head: () => ({ meta: [{ title: "Order Confirmed — Sweet Delights" }] }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const [order, setOrder] = useState<any>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sweet-delights-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);
  return (
    <div className="py-20 container mx-auto px-4 max-w-xl text-center">
      <div className="w-20 h-20 rounded-full bg-primary/20 grid place-items-center mx-auto">
        <CheckCircle2 className="w-12 h-12 text-primary" />
      </div>
      <h1 className="font-display text-4xl mt-6">Order Placed!</h1>
      <p className="text-muted-foreground mt-2">Thank you for ordering from Sweet Delights. We'll bake with love and deliver soon.</p>
      {order && (
        <div className="bg-card border border-border rounded-2xl p-6 mt-8 text-left">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Order ID</span><span className="font-semibold">{order.orderId}</span></div>
          <div className="flex justify-between text-sm mt-2"><span className="text-muted-foreground">Name</span><span>{order.name}</span></div>
          <div className="flex justify-between text-sm mt-2"><span className="text-muted-foreground">Delivery</span><span>{order.delivery}</span></div>
          <div className="flex justify-between text-sm mt-2"><span className="text-muted-foreground">Payment</span><span>{order.payment}</span></div>
          <div className="border-t border-border my-4" />
          {order.items.map((it: any, i: number) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{it.name} <span className="text-muted-foreground">({it.weight} × {it.qty})</span></span>
              <span>₹{it.subtotal.toLocaleString("en-IN")}</span>
            </div>
          ))}
          <div className="border-t border-border mt-4 pt-3 flex justify-between font-semibold">
            <span>Total Paid</span><span>₹{order.total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      )}
      <Link to="/collections" className="inline-block mt-8 bg-primary text-primary-foreground rounded-full px-6 py-3 font-semibold">
        Continue Shopping
      </Link>
    </div>
  );
}
