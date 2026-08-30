import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { Wallet, HeartPulse, Server, Calculator } from "lucide-react";
import { services, SPLIT, rupee } from "@/data/sahyog";
import { Input } from "@/components/ui/input";

function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(display, value, {
      duration: 0.6,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span className="tabular-nums">{rupee(display)}</span>;
}

const rows = [
  { key: "worker", label: "Worker Payout", pct: SPLIT.worker, icon: Wallet, bar: "bg-brand-blue", tint: "bg-brand-blue/10 text-brand-blue" },
  { key: "healthcare", label: "Co-op Healthcare Fund", pct: SPLIT.healthcare, icon: HeartPulse, bar: "bg-coop", tint: "bg-coop/15 text-coop" },
  { key: "infra", label: "Infra Overhead", pct: SPLIT.infra, icon: Server, bar: "bg-orange", tint: "bg-orange/15 text-orange" },
] as const;

export function SplitCalculator({
  selectedId,
  onSelect,
}: {
  selectedId: number;
  onSelect: (id: number) => void;
}) {
  const [bookings, setBookings] = useState(1);
  const service = services.find((s) => s.id === selectedId) ?? services[0]!;
  const total = service.price * Math.max(1, bookings || 1);

  return (
    <section id="calculator" className="scroll-mt-24 bg-brand-tint py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-blue">
            Live Split Calculator
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Every rupee, accounted for in real time
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Pick a service and the number of bookings — the 85 / 10 / 5 co-op split recalculates instantly.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
            <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Calculator size={16} className="shrink-0" />
              Choose a service
            </p>
            <div className="mt-4 grid gap-2">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelect(s.id)}
                  className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                    s.id === service.id
                      ? "border-brand-blue bg-brand-blue text-brand-blue-foreground"
                      : "border-border bg-background hover:border-brand-blue"
                  }`}
                >
                  <span className="min-w-0 truncate text-base font-semibold">{s.name}</span>
                  <span className="shrink-0 text-sm font-bold tabular-nums">{rupee(s.price)}</span>
                </button>
              ))}
            </div>

            <label className="mt-6 block text-sm font-semibold" htmlFor="bookings">
              Bookings this month
            </label>
            <Input
              id="bookings"
              type="number"
              min={1}
              max={99}
              value={bookings}
              onChange={(e) => setBookings(Number(e.target.value))}
              className="mt-2 h-12 rounded-xl text-base"
            />
          </div>

          <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
              <span className="min-w-0 text-sm font-semibold text-muted-foreground">
                Total customer payment
              </span>
              <span className="text-3xl font-extrabold">
                <CountUp value={total} />
              </span>
            </div>

            <div className="mt-5 flex h-4 overflow-hidden rounded-full bg-muted">
              {rows.map((r) => (
                <motion.div
                  key={r.key}
                  className={`${r.bar} h-full`}
                  initial={false}
                  animate={{ width: `${r.pct * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              ))}
            </div>

            <ul className="mt-6 space-y-4">
              {rows.map((r) => (
                <li
                  key={r.key}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3"
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${r.tint}`}>
                    <r.icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-base font-semibold">{r.label}</span>
                    <span className="block text-sm text-muted-foreground">
                      {Math.round(r.pct * 100)}% of every booking
                    </span>
                  </span>
                  <span className="text-lg font-extrabold">
                    <CountUp value={total * r.pct} />
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-xl bg-brand-tint px-4 py-3 text-sm font-medium text-brand-blue">
              Zero aggregator commission. The 10% healthcare fund is owned by the workers themselves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
