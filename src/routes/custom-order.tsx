import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { SectionTitle } from "@/components/site/SectionTitle";

export const Route = createFileRoute("/custom-order")({
  head: () => ({ meta: [{ title: "Custom Cake Order — Sweet Delights" }] }),
  component: CustomOrder,
});

function CustomOrder() {
  const navigate = useNavigate();
  return (
    <div className="py-16 container mx-auto px-4 max-w-3xl">
      <SectionTitle eyebrow="Personalized">Custom Cake Order</SectionTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Custom order request received! We'll call you soon.");
          (e.target as HTMLFormElement).reset();
          setTimeout(() => navigate({ to: "/" }), 1200);
        }}
        className="bg-card border border-border rounded-2xl p-6 grid sm:grid-cols-2 gap-4"
      >
        <Field label="Occasion">
          <select required className="w-full rounded-xl border border-border bg-background px-4 py-3">
            <option value="">Select Occasion</option>
            <option>Birthday</option><option>Wedding</option><option>Anniversary</option><option>Corporate</option><option>Other</option>
          </select>
        </Field>
        <Field label="Cake Flavor">
          <select required className="w-full rounded-xl border border-border bg-background px-4 py-3">
            <option value="">Select Flavor</option>
            <option>Chocolate</option><option>Vanilla</option><option>Red Velvet</option><option>Butterscotch</option><option>Fruit</option>
          </select>
        </Field>
        <Field label="Weight">
          <select required className="w-full rounded-xl border border-border bg-background px-4 py-3">
            <option value="">Select Weight</option>
            <option>1 kg</option><option>2 kg</option><option>3 kg</option><option>5 kg</option>
          </select>
        </Field>
        <Field label="Delivery Date">
          <input type="date" required className="w-full rounded-xl border border-border bg-background px-4 py-3" />
        </Field>
        <Field label="Name"><input required className="w-full rounded-xl border border-border bg-background px-4 py-3" /></Field>
        <Field label="Phone"><input required type="tel" className="w-full rounded-xl border border-border bg-background px-4 py-3" /></Field>
        <div className="sm:col-span-2">
          <Field label="Special Instructions">
            <textarea rows={4} className="w-full rounded-xl border border-border bg-background px-4 py-3" placeholder="Describe your dream cake..." />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <button className="w-full bg-primary text-primary-foreground rounded-full py-3 font-semibold">Place Custom Order</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">{label}</span>
      {children}
    </label>
  );
}
