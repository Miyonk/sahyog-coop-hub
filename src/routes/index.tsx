import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Handshake,
  Menu,
  User,
  HardHat,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Vote,
  Lock,
  ListOrdered,
  Gauge,
  PieChart,
  BadgeCheck,
  Sparkles,
  Check,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SplitCalculator } from "@/components/sahyog/SplitCalculator";
import { AuthModal, type AuthTab } from "@/components/sahyog/AuthModal";
import { services, dispatchQueue, heroImage, rupee } from "@/data/sahyog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sahyog — Worker-Owned Cooperative Service Network" },
      {
        name: "description",
        content:
          "Sahyog is India's 100% worker-owned cooperative services platform: 85% direct worker payout, 10% co-op healthcare fund, fair dispatch and double-blind reviews.",
      },
      { property: "og:title", content: "Sahyog — Worker-Owned Cooperative Service Network" },
      {
        property: "og:description",
        content:
          "Fair payouts for service professionals, transparent pricing for households. Zero private platform exploitation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Co-op Model", href: "#model" },
  { label: "FAQs", href: "#faqs" },
];

type Mode = "consumer" | "worker";

function Index() {
  const [mode, setMode] = useState<Mode>("consumer");
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>("consumer");
  const [selectedId, setSelectedId] = useState(services[0]!.id);
  const [pricingView, setPricingView] = useState<Mode>("consumer");

  const openAuth = (tab: AuthTab) => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  const seeSplit = (id: number) => {
    setSelectedId(id);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const workerMode = mode === "worker";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:flex lg:justify-between">
          <a href="#home" className="flex min-w-0 items-center gap-2">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-blue text-brand-blue-foreground">
              <Handshake size={20} />
            </span>
            <span className="truncate text-xl font-extrabold tracking-tight">Sahyog</span>
          </a>

          <ul className="hidden items-center gap-7 text-base font-medium lg:flex">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-muted-foreground transition-colors hover:text-brand-blue">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center rounded-full bg-muted p-1 lg:flex">
            {(["consumer", "worker"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  mode === m ? "text-brand-blue-foreground" : "text-muted-foreground"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="mode-pill"
                    className="absolute inset-0 rounded-full bg-brand-blue"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {m === "consumer" ? <User size={15} /> : <HardHat size={15} />}
                  {m === "consumer" ? "Consumer" : "Worker Co-op"}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden h-11 rounded-full px-5 text-sm font-semibold sm:inline-flex"
              onClick={() => openAuth(mode)}
            >
              <User size={15} /> Sign In
            </Button>
            <Button
              className="h-11 rounded-full bg-orange px-5 text-sm font-semibold text-orange-foreground hover:bg-orange/90"
              onClick={() => openAuth(mode)}
            >
              <Sparkles size={15} /> Get Started
            </Button>
            <button
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border lg:hidden"
              aria-label="Open menu"
              onClick={() => setMode(workerMode ? "consumer" : "worker")}
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="scroll-mt-20 bg-brand-tint">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-2 text-sm font-bold uppercase tracking-wider text-brand-blue">
              <BadgeCheck size={15} className="shrink-0" />
              SIH 26089 · Ministry of Cooperation Initiative
            </span>

            <motion.h1
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl"
            >
              {workerMode ? (
                <>
                  Own Your Work. Keep <span className="text-brand-blue">85%</span> of Every Job.
                </>
              ) : (
                <>
                  India's 100% <span className="text-brand-blue">Worker-Owned</span> Cooperative
                  Service Network
                </>
              )}
            </motion.h1>

            <p className="mt-5 text-lg text-muted-foreground">
              {workerMode
                ? "Join a cooperative you actually own — direct UPI payouts, a healthcare fund, and one-worker-one-vote governance."
                : "Fair payouts for service professionals, transparent pricing for households. Zero private platform exploitation."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className={`h-13 rounded-full px-6 py-3.5 text-base font-semibold ${
                  workerMode
                    ? "border border-orange bg-transparent text-orange hover:bg-orange/10"
                    : "bg-orange text-orange-foreground hover:bg-orange/90"
                }`}
                onClick={() => openAuth("consumer")}
              >
                <CalendarCheck size={17} /> Book a Service
              </Button>
              <Button
                className={`h-13 rounded-full px-6 py-3.5 text-base font-semibold ${
                  workerMode
                    ? "bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90"
                    : "border border-brand-blue bg-transparent text-brand-blue hover:bg-brand-blue/10"
                }`}
                onClick={() => openAuth("worker")}
              >
                <HardHat size={17} /> Join as Worker
              </Button>
            </div>

            <div className="mt-10 grid gap-4 rounded-2xl bg-brand-navy px-6 py-5 text-brand-navy-foreground sm:grid-cols-4">
              {[
                { v: "0%", l: "Aggregator Cut" },
                { v: "85%", l: "Direct Worker Payout" },
                { v: "10%", l: "Co-op Healthcare Fund" },
                { v: "5.8k", l: "Verified Members" },
              ].map((m) => (
                <div key={m.l} className="min-w-0">
                  <p className="text-2xl font-extrabold">{m.v}</p>
                  <p className="text-sm opacity-80">{m.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Sahyog cooperative service professionals at work"
              loading="lazy"
              className="h-[26rem] w-full rounded-2xl object-cover shadow-[var(--shadow-card)] lg:h-[32rem]"
            />
            <div className="absolute left-4 top-6 flex items-center gap-2 rounded-2xl bg-card px-4 py-3 shadow-[var(--shadow-card)]">
              <ListOrdered size={18} className="shrink-0 text-coop" />
              <span className="text-sm font-bold">Fair Dispatch Active</span>
            </div>
            <div className="absolute bottom-6 right-4 flex items-center gap-2 rounded-2xl bg-card px-4 py-3 shadow-[var(--shadow-card)]">
              <Vote size={18} className="shrink-0 text-brand-blue" />
              <span className="text-sm font-bold">One-Worker-One-Vote Governance</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-blue">What we offer</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Professional Home &amp; Community Services
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <motion.article
                key={s.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
              >
                <img src={s.image} alt={s.name} loading="lazy" className="h-40 w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                  <p className="mt-4 text-base font-semibold">
                    {rupee(s.price)}{" "}
                    <span className="text-sm font-medium text-coop">
                      ({rupee(s.workerShare)} to worker)
                    </span>
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 h-11 rounded-xl border-brand-blue text-sm font-semibold text-brand-blue hover:bg-brand-blue/10"
                    onClick={() => seeSplit(s.id)}
                  >
                    <PieChart size={15} /> See the Split
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SplitCalculator selectedId={selectedId} onSelect={setSelectedId} />

      {/* WHY SAHYOG */}
      <section id="model" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-blue">Why Sahyog</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            A cooperative model, engineered into the product
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-brand-tint p-6">
              <PieChart size={22} className="text-brand-blue" />
              <h3 className="mt-3 text-lg font-bold">Transparent Split UI</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Every booking shows the exact 85 / 10 / 5 breakdown before payment.
              </p>
              <a
                href="#calculator"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue"
              >
                Open the calculator <ArrowRight size={15} />
              </a>
            </div>

            <div className="rounded-2xl bg-brand-tint p-6">
              <Lock size={22} className="text-brand-blue" />
              <h3 className="mt-3 text-lg font-bold">Double-Blind Reviews</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Both ratings stay hidden until both sides submit, so nobody can retaliate.
              </p>
              <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-sm font-semibold">
                🔒 Sealed 48h
              </span>
            </div>

            <div className="rounded-2xl bg-brand-tint p-6">
              <ListOrdered size={22} className="text-brand-blue" />
              <h3 className="mt-3 text-lg font-bold">Fair Dispatch Queue</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Jobs rotate by fairness score and proximity — not by who pays for visibility.
              </p>
              <ul className="mt-4 space-y-2">
                {dispatchQueue.map((w, i) => (
                  <li
                    key={w.name}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-card px-3 py-2"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-blue/10 text-sm font-bold text-brand-blue">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{w.name}</span>
                      <span className="block truncate text-sm text-muted-foreground">{w.meta}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-coop/15 px-2 py-1 text-xs font-semibold text-coop">
                      {i === 0 ? "Next" : "Queued"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-tint p-6">
              <Gauge size={22} className="text-brand-blue" />
              <h3 className="mt-3 text-lg font-bold">Progressive Strike Engine</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Graded warnings and retraining before any suspension — no silent deactivations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-brand-tint py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="min-w-0">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-blue">Pricing</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Honest pricing, both sides of the transaction
              </h2>
            </div>
            <div className="flex shrink-0 items-center rounded-full bg-card p-1">
              {(["consumer", "worker"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setPricingView(v)}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    pricingView === v ? "text-brand-blue-foreground" : "text-muted-foreground"
                  }`}
                >
                  {pricingView === v && (
                    <motion.span
                      layoutId="pricing-pill"
                      className="absolute inset-0 rounded-full bg-brand-blue"
                      transition={{ type: "spring", stiffness: 340, damping: 30 }}
                    />
                  )}
                  <span className="relative">{v === "consumer" ? "Customer View" : "Worker View"}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-xl font-bold">Standard Booking</h3>
              <p className="mt-1 text-sm text-muted-foreground">Pay per job, no membership needed.</p>
              <ul className="mt-5 space-y-3 text-base">
                {(pricingView === "consumer"
                  ? [
                      ["Service charge", rupee(499)],
                      ["Worker payout (85%)", rupee(424)],
                      ["Healthcare fund (10%)", rupee(50)],
                      ["Infra overhead (5%)", rupee(25)],
                    ]
                  : [
                      ["Job value", rupee(499)],
                      ["Your UPI payout", rupee(424)],
                      ["Into your health fund", rupee(50)],
                      ["Aggregator commission", rupee(0)],
                    ]
                ).map(([l, v]) => (
                  <li key={l} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                    <span className="min-w-0 text-muted-foreground">{l}</span>
                    <span className="font-semibold tabular-nums">{v}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-coop/15 px-3 py-1.5 text-sm font-semibold text-coop">
                <ShieldCheck size={15} /> Verified provider
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-orange bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="absolute inset-x-0 top-0 h-1.5 bg-orange" />
              <h3 className="text-xl font-bold">Co-op Member Plan</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {pricingView === "consumer"
                  ? "Support worker-ownership on every booking."
                  : "Full membership in the cooperative you work for."}
              </p>
              <ul className="mt-5 space-y-3 text-base">
                {[
                  "Zero middleman cuts, forever",
                  "10% auto-routed to the healthcare fund",
                  "One-worker-one-vote governance rights",
                  "Year-end surplus dividend payout",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-orange" />
                    <span className="min-w-0">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 h-12 w-full rounded-xl bg-orange text-base font-semibold text-orange-foreground hover:bg-orange/90"
                onClick={() => openAuth(pricingView === "consumer" ? "consumer" : "worker")}
              >
                <Sparkles size={16} /> Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faqs" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible defaultValue="q1" className="mt-8">
            <AccordionItem value="q1">
              <AccordionTrigger className="text-left text-base font-semibold">
                How does the 85-10-5 split work?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Every payment is divided automatically: 85% goes straight to the worker's UPI, 10%
                funds the collectively owned healthcare pool, and 5% covers infrastructure. Nothing
                is taken as private profit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger className="text-left text-base font-semibold">
                How do double-blind reviews prevent retaliation?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Neither party sees the other's rating until both have submitted or 48 hours pass, so
                honest feedback can't be punished with a revenge rating.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger className="text-left text-base font-semibold">
                How does the fair dispatch queue help new workers?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Jobs are allocated by rotation, fairness score and proximity, guaranteeing newcomers
                a steady share of work instead of being buried by legacy ratings.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-border bg-brand-navy py-10 text-brand-navy-foreground">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-lg font-extrabold">
              <Handshake size={20} className="shrink-0" /> Sahyog
            </p>
            <p className="mt-1 text-sm opacity-80">
              SIH 26089 prototype · Worker-owned cooperative services · Coming soon: Hindi /
              regional language support.
            </p>
          </div>
          <Button
            className="h-11 shrink-0 rounded-full bg-orange px-5 text-sm font-semibold text-orange-foreground hover:bg-orange/90"
            onClick={() => openAuth(mode)}
          >
            <Sparkles size={15} /> Get Started
          </Button>
        </div>
      </footer>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} tab={authTab} onTabChange={setAuthTab} />
    </div>
  );
}
