import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar,
  Phone,
  Check,
  Star,
  Users,
  Droplets,
  Wind,
  Zap,
  Flame,
  Menu,
  ShieldCheck,
} from "lucide-react";
import handyman from "@/assets/handyman.jpg";
import { PaymentBreakdownModal } from "@/components/PaymentBreakdownModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sahyog — Transparent Worker Cooperative Services in India" },
      {
        name: "description",
        content:
          "Sahyog is India's worker-owned services cooperative: fair-split non-profit pricing, double-blind peer review, and a fair dispatch queue for plumbing, AC, electrical and heating.",
      },
      { property: "og:title", content: "Sahyog — Transparent Worker Cooperative Services" },
      {
        property: "og:description",
        content:
          "Fair-split, non-profit pricing with 85% straight to the worker. Book trusted plumbing, AC, electrical and heating pros.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = ["Home", "About", "Plumbing", "Heating", "Air-Condition", "Electrical", "Contact Us"];

const categories = [
  { name: "Plumbing", icon: Droplets, active: false },
  { name: "Air-Condition", icon: Wind, active: true },
  { name: "Electrical", icon: Zap, active: false },
  { name: "Heating", icon: Flame, active: false },
];

function BookNowButton({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-coral-foreground shadow-lg transition-transform hover:scale-[1.03] active:scale-100 ${className}`}
    >
      <Calendar size={16} />
      Book Now
    </button>
  );
}

function Index() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-emerald-deep text-emerald-deep-foreground">
        <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 lg:flex lg:justify-between">
          <a href="/" className="flex min-w-0 items-center gap-1 text-2xl font-extrabold tracking-tight">
            <span className="truncate">Sahyog</span>
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-coral" />
          </a>

          <ul className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {navLinks.map((l) => (
              <li key={l}>
                <a href="#" className="opacity-80 transition-opacity hover:opacity-100">
                  {l}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <BookNowButton onClick={() => setOpen(true)} />
            <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 lg:hidden" aria-label="Menu">
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      <section className="hero-stripes bg-emerald-deep text-emerald-deep-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 pt-8 lg:grid-cols-2 lg:pb-32 lg:pt-12">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              India's <span className="text-coral">Transparent</span> Worker{" "}
              <span className="text-coral">Cooperative</span> Services
            </h1>

            <ul className="mt-8 space-y-3">
              {[
                "Fair-Split, Non-Profit Pricing",
                "Double-Blind Peer Review for Trust",
                "Dispatch Queue for Fair Job Equity",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3 text-base opacity-90">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-coral">
                    <Check size={14} className="text-coral-foreground" />
                  </span>
                  <span className="min-w-0">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="tel:8005550102"
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-sm font-semibold text-brand-blue-foreground shadow-lg transition-transform hover:scale-[1.03]"
              >
                <Phone size={16} />
                (800) 555-0102
              </a>
              <BookNowButton onClick={() => setOpen(true)} className="px-6 py-3.5" />
            </div>

            <div className="mt-10 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-white/10 px-5 py-4">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <ShieldCheck size={18} className="text-brand-blue" />
                Trustindex
              </span>
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </span>
              <span className="text-sm opacity-90">
                <strong className="font-bold">EXCELLENT</strong> — Based on 426 reviews
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] bg-emerald-stripe">
              <img
                src={handyman}
                alt="Smiling Sahyog cooperative service professional holding a wrench"
                width={912}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="glass-badge absolute left-3 top-6 flex items-center gap-3 rounded-2xl px-4 py-3 sm:left-[-1rem]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-coral">
                <Star size={16} className="fill-coral-foreground text-coral-foreground" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-sm font-bold">24/7 co-op services</span>
                <span className="block text-xs opacity-80">Best Services</span>
              </span>
            </div>

            <div className="glass-badge absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-3 rounded-2xl px-4 py-3 sm:right-[-1rem]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-blue">
                <Users size={16} className="text-brand-blue-foreground" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-sm font-bold">5.8k</span>
                <span className="block text-xs opacity-80">Community Members</span>
              </span>
            </div>

            <div className="glass-badge absolute bottom-6 left-1/2 flex w-[min(20rem,90%)] -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3">
              <span className="flex shrink-0 -space-x-2">
                {["A", "R", "S", "+"].map((c) => (
                  <span
                    key={c}
                    className="grid h-8 w-8 place-items-center rounded-full border-2 border-white/60 bg-emerald-stripe text-xs font-bold"
                  >
                    {c}
                  </span>
                ))}
              </span>
              <span className="min-w-0 text-sm font-semibold leading-tight">
                Our service co-op team members
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-14 max-w-7xl px-5 pb-24">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((c) => (
            <button
              key={c.name}
              className={`flex items-center gap-3 rounded-2xl border p-5 text-left shadow-[0_12px_40px_-18px_oklch(0.2_0.05_165_/_0.35)] transition-transform hover:-translate-y-1 ${
                c.active
                  ? "border-transparent bg-brand-blue text-brand-blue-foreground"
                  : "border-border bg-card text-card-foreground"
              }`}
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                  c.active ? "bg-white/20" : "bg-muted text-emerald-deep"
                }`}
              >
                <c.icon size={20} />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-bold">{c.name}</span>
                <span className={`block text-xs ${c.active ? "opacity-80" : "text-muted-foreground"}`}>
                  Co-op verified pros
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <PaymentBreakdownModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
