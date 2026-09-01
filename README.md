# Sahyog Builder

Build a modern, high-converting landing page for a worker cooperative platform named "Sahyog". Use Tailwind CSS, React, and Lucide icons. Match the visual layout and color scheme of the provided design reference: dark emerald green hero background with vertical accent stripes, white body background, soft rounded corners (rounded-2xl), bright blue secondary buttons, and vibrant coral-red primary buttons.

1. Navigation Bar:
- Logo on the left: "Sahyog" (Clean typography with a small green accent dot).
- Center links: Home, About, Plumbing, Heating, Air-Condition, Electrical, Contact Us.
- Right CTA button: Coral-red pill button with a calendar icon and text "Book Now".

2. Hero Section Layout (2-Column Grid):
- Left Column:
  - Main Headline: "India's Transparent Worker Cooperative Services" (highlight "Transparent" and "Cooperative" in coral-red font).
  - Subtext/Bullets: Short bullet points for "Fair-Split, Non-Profit Pricing", "Double-Blind Peer Review for Trust", and "Dispatch Queue for Fair Job Equity".
  - Dual Action Buttons: A bright blue pill button with a phone icon "(800) 555-0102" alongside a coral-red "Book Now" button.
  - Social Proof / Trust Badge: "Trustindex" verified checkmark, 5-star rating graphic, and text "EXCELLENT - Based on 426 reviews".

- Right Column:
  - Large portrait image container featuring a smiling handyman/service professional holding a wrench.
  - Floating Glassmorphism Badges positioned over the image:
    1. Top Left Badge: Red star icon with text "24/7 co-op services / Best Services".
    2. Middle Right Badge: User icon with text "5.8k / Community Members".
    3. Bottom Badge: Overlapping user avatar stack with text "Our service co-op team members +".

3. Quick Service Category Selector Bar (Positioned below the Hero section):
- A horizontal grid of 4 clean white cards with rounded corners and subtle shadows:
  - Card 1: Plumbing (Faucet icon)
  - Card 2: Air-Condition (AC unit icon) -> Set as ACTIVE state with a vibrant bright blue background and white text.
  - Card 3: Electrical (Lightning bolt icon)
  - Card 4: Heating (Flame icon)

4. Demo Modal (Interactive Feature):
- When clicking any "Book Now" button, trigger a sleek popup modal titled "Sahyog Transparent Payment Breakdown".
- Include a live slider for service cost (e.g., ₹1000) showing a real-time split visualizer:
  - 85% directly to Worker Bank Account.
  - 10% to Worker Social Security & Health Fund.
  - 5% Platform Maintenance Overhead.

Make the UI fully responsive, ultra-clean, and high contrast.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sahyog-coop-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/946b731f-19b7-408e-a0b4-589acdefe407).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
