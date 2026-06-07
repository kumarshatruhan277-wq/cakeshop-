import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { SectionTitle } from "@/components/site/SectionTitle";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Sweet Delights" }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="py-16 container mx-auto px-4 grid lg:grid-cols-2 gap-10">
      <div>
        <SectionTitle eyebrow="Get in Touch">We'd Love to Hear From You</SectionTitle>
        <div className="space-y-4 mt-6">
          {[
            { icon: Phone, title: "Call Us", text: "+91 98765 43210" },
            { icon: Mail, title: "Email", text: "hello@sweetdelights.com" },
            { icon: MapPin, title: "Visit", text: "123 Cake Street, Mumbai 400001" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4 bg-card border border-border rounded-2xl p-4">
              <span className="w-10 h-10 rounded-full bg-primary/15 text-primary grid place-items-center"><Icon className="w-5 h-5" /></span>
              <div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-muted-foreground">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Thanks! We'll get back to you soon.");
          (e.target as HTMLFormElement).reset();
        }}
        className="bg-card border border-border rounded-2xl p-6 space-y-4"
      >
        <h2 className="font-display text-2xl">Send a Message</h2>
        <Input name="name" placeholder="Your Name" required />
        <Input name="email" type="email" placeholder="Your Email" required />
        <Input name="subject" placeholder="Subject" />
        <textarea name="message" required placeholder="Your Message" rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40" />
        <button className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-semibold w-full">Send Message</button>
      </form>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40" />;
}
