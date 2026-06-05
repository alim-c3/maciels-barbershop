# Maciel's Barber Shop — Setup Guide

## Prerequisites

- [Node.js 18+](https://nodejs.org/) — install this first
- [Supabase account](https://supabase.com/) — free tier is sufficient
- [Vercel account](https://vercel.com/) — for deployment

## 1. Install dependencies

```bash
cd maciels-barbershop
npm install
```

## 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Go to **Storage** → New Bucket → Name: `gallery`, toggle Public on
4. Copy your project URL and keys from **Settings → API**

## 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 5. Update shop details

Edit `src/lib/data.ts` to update:
- `SHOP` — phone number, real Booksy URL, Instagram URL, real Google Maps embed
- `BARBERS` — real photos and bios when available
- `HOURS` — actual hours of operation
- `SERVICES` — real pricing

## 6. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage |
| `/book` | Booking wizard |
| `/barbers` | All 6 barbers |
| `/services` | All services |
| `/gallery` | Photo gallery |
| `/reviews` | Reviews |
| `/about` | About the shop |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog article |
| `/contact` | Contact + map |
| `/faq` | FAQ accordion |
| `/policies` | Cancellation/privacy policies |
| `/admin` | Admin dashboard |

## Database tables

- `appointments` — bookings with status tracking
- `reviews` — approved customer reviews
- `gallery_images` — approved gallery photos
- `contact_submissions` — contact form entries
- `blocked_slots` — admin-blocked availability

## Customer profiles + haircut photos (Phase 1.5)

Gallery images are already linked to `barber_id` and `customer_name` in the schema.
When ready to build customer-facing profiles:
1. Add a `customers` table in Supabase
2. Add Supabase Auth for customer login
3. Link `gallery_images` to `customer_id`
4. Create `/customers/[id]` page showing their cut history
