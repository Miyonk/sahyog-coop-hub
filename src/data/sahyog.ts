export const SPLIT = {
  worker: 0.85,
  healthcare: 0.1,
  infra: 0.05,
} as const;

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  workerShare: number;
  image: string;
};

export const services: Service[] = [
  {
    id: 1,
    name: "Plumbing Services",
    description: "Leak repair, fittings and bathroom installations.",
    price: 499,
    workerShare: 424,
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Electrical & Wiring",
    description: "Safe wiring, switchboards and fault diagnosis.",
    price: 399,
    workerShare: 339,
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "AC Repair & Maintenance",
    description: "Servicing, gas refill and deep coil cleaning.",
    price: 699,
    workerShare: 594,
    image:
      "https://images.unsplash.com/photo-1631545806609-24bb6f4f8d5b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Appliance & Handyman",
    description: "Mounting, carpentry and appliance fixes.",
    price: 449,
    workerShare: 381,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  },
];

export const heroImage =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80";

export const dispatchQueue = [
  { name: "Ramesh K.", meta: "1.2 km away · 6 min wait", jobs: "New member · priority slot" },
  { name: "Anita S.", meta: "2.4 km away · 12 min wait", jobs: "3 jobs this week" },
  { name: "Farhan A.", meta: "3.8 km away · 20 min wait", jobs: "5 jobs this week" },
];

export const rupee = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
