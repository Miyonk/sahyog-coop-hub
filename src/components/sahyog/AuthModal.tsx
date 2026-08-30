import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HardHat, ShieldCheck, Smartphone, User, Wallet, CalendarCheck } from "lucide-react";
import { services, rupee } from "@/data/sahyog";

export type AuthTab = "consumer" | "worker";

export function AuthModal({
  open,
  onOpenChange,
  tab,
  onTabChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tab: AuthTab;
  onTabChange: (t: AuthTab) => void;
}) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [serviceId, setServiceId] = useState(String(services[0]!.id));
  const [address, setAddress] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold tracking-tight">
            Welcome to Sahyog
          </DialogTitle>
          <DialogDescription className="text-base">
            One cooperative, two portals — households and worker-owners.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => onTabChange(v as AuthTab)}>
          <TabsList className="grid w-full grid-cols-2 rounded-xl">
            <TabsTrigger value="consumer" className="gap-2 text-sm font-semibold">
              <User size={15} /> Consumer
            </TabsTrigger>
            <TabsTrigger value="worker" className="gap-2 text-sm font-semibold">
              <HardHat size={15} /> Worker Co-op
            </TabsTrigger>
          </TabsList>

          <div className="mt-5 rounded-2xl bg-brand-tint p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
              <Smartphone size={15} className="shrink-0" /> Mobile verification
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
              <Input
                inputMode="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 rounded-xl bg-background text-base"
              />
              <Button
                type="button"
                className="h-11 shrink-0 rounded-xl bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90"
                onClick={() => {
                  setOtpSent(true);
                  toast.success("OTP sent (demo): 1234");
                }}
              >
                Send OTP
              </Button>
            </div>

            {otpSent && (
              <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                <Input
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-11 rounded-xl bg-background text-base tracking-[0.4em]"
                />
                <Button
                  type="button"
                  className="h-11 shrink-0 rounded-xl bg-coop text-coop-foreground hover:bg-coop/90"
                  onClick={() => {
                    setVerified(true);
                    toast.success("Mobile number verified");
                  }}
                >
                  <ShieldCheck size={15} /> Verify
                </Button>
              </div>
            )}

            {verified && (
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-coop">
                <ShieldCheck size={15} /> Verified — demo session active
              </p>
            )}
          </div>

          <TabsContent value="consumer" className="mt-5">
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Booking request sent to the fair dispatch queue!");
              }}
            >
              <div>
                <label className="text-sm font-semibold">Service</label>
                <Select value={serviceId} onValueChange={setServiceId}>
                  <SelectTrigger className="mt-2 h-11 rounded-xl text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.name} — {rupee(s.price)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-semibold" htmlFor="address">
                  Service address
                </label>
                <Input
                  id="address"
                  placeholder="Flat 402, Sector 21, Noida"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-2 h-11 rounded-xl text-base"
                />
              </div>
              <Button
                type="submit"
                className="h-12 rounded-xl bg-orange text-base font-semibold text-orange-foreground hover:bg-orange/90"
              >
                <CalendarCheck size={16} /> Book a Service
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="worker" className="mt-5">
            <div className="rounded-2xl border border-border p-4">
              <p className="text-sm font-semibold text-muted-foreground">Today's earnings summary</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Jobs done", value: "4" },
                  { label: "UPI payout", value: rupee(1832) },
                  { label: "Health fund", value: rupee(215) },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-brand-tint px-4 py-3">
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-xl font-extrabold">{s.value}</p>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                className="mt-4 h-12 w-full rounded-xl bg-brand-blue text-base font-semibold text-brand-blue-foreground hover:bg-brand-blue/90"
                onClick={() => toast.success("Payout of ₹1,832 sent to your UPI ID (demo)")}
              >
                <Wallet size={16} /> Withdraw to UPI
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <p className="text-sm text-muted-foreground">
          Coming soon: Hindi / regional language support.
        </p>
      </DialogContent>
    </Dialog>
  );
}
