import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Banknote, HeartPulse, Settings2 } from "lucide-react";

const rupee = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

const splits = [
  {
    label: "Directly to Worker Bank Account",
    pct: 85,
    icon: Banknote,
    bar: "bg-emerald-deep",
    tint: "bg-emerald-deep/10 text-emerald-deep",
  },
  {
    label: "Worker Social Security & Health Fund",
    pct: 10,
    icon: HeartPulse,
    bar: "bg-brand-blue",
    tint: "bg-brand-blue/10 text-brand-blue",
  },
  {
    label: "Platform Maintenance Overhead",
    pct: 5,
    icon: Settings2,
    bar: "bg-coral",
    tint: "bg-coral/10 text-coral",
  },
];

export function PaymentBreakdownModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [amount, setAmount] = useState(1000);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">
            Sahyog Transparent Payment Breakdown
          </DialogTitle>
          <DialogDescription>
            Move the slider to see exactly where every rupee of your service cost goes.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 rounded-2xl bg-muted p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-muted-foreground">Service cost</span>
            <span className="text-2xl font-bold tabular-nums">{rupee(amount)}</span>
          </div>
          <Slider
            className="mt-4"
            value={[amount]}
            min={200}
            max={20000}
            step={100}
            onValueChange={(v) => setAmount(v[0] ?? 0)}
            aria-label="Service cost"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>₹200</span>
            <span>₹20,000</span>
          </div>
        </div>

        <div className="mt-2 flex h-3 overflow-hidden rounded-full">
          {splits.map((s) => (
            <div key={s.label} className={`${s.bar} h-full`} style={{ width: `${s.pct}%` }} />
          ))}
        </div>

        <ul className="mt-2 space-y-3">
          {splits.map((s) => (
            <li key={s.label} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${s.tint}`}>
                <s.icon size={18} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{s.label}</span>
                <span className="block text-xs text-muted-foreground">{s.pct}% of total</span>
              </span>
              <span className="text-base font-bold tabular-nums">{rupee((amount * s.pct) / 100)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-2 text-xs text-muted-foreground">
          Non-profit, fair-split pricing. No hidden commissions, ever.
        </p>
      </DialogContent>
    </Dialog>
  );
}
