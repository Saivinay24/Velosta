# Velosta — Spatial Travel Planning ✈️

> A premium, map-driven travel planning experience that feels like navigating through space rather than browsing a website.

Velosta transforms travel planning into an immersive spatial journey: set your preferences → explore destinations on an interactive globe → build your itinerary in a 3D cityscape — all in one continuous flow.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Then add your keys:

| Variable | Required | Source |
|----------|----------|--------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | **Yes** | [mapbox.com/access-tokens](https://account.mapbox.com/access-tokens/) (free) |
| `OPENAI_API_KEY` | No | [platform.openai.com](https://platform.openai.com/api-keys) — app works without it via local engine |

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎬 The User Journey

Velosta guides users through a **3-phase cinematic flow** — no hard cuts, no page reloads:

### Phase 1 → Preferences (Cinematic Cloud-to-City Intro)

A full-screen cinematic opening where users descend through clouds to reveal a live 3D map of their city:

- **Live Mapbox city background** — 3D bird's-eye view of user's actual city (via geolocation) or Hyderabad default
- **Multi-layer cloud dissolve animation** — 3 drifting cloud layers fade to reveal the city below
- **"Where Journeys Begin" title reveal** — staggered serif text with gold divider
- **Trip Type** selector — Solo / Couple / Family / Friends (Lucide icons)
- **Duration** — 2, 3, 4, 5, 7, 10, 14 day buttons
- **Budget** — Interactive slider ₹3,000–₹2,00,000 with dynamic tier label ("Weekend Escape" → "Premium Experience")
- **Categories** — Nature, Culture, Adventure, Relaxation toggle pills

Smooth transitions and staggered animations create a premium first impression.

### Phase 2 → Globe Exploration (Interactive Map)

An interactive Mapbox map centered on India, showing all destinations filtered by the user's preferences:

- **GeoJSON-based pins** — Native Mapbox circle layers that never drift on zoom/pan
- **Day-fit color coding** — Green (comfortable), Yellow (moderate), Orange (tight) based on selected trip days
- **Budget & trip type filtering** — Destinations filter in real-time as preferences change
- **Hover tooltips** — Destination name, state, cost, duration, highlights, day-fit badge, category icon
- **Destination detail modal** — Full card with highlights, top POIs, best-for tags, day-fit indicator
- **Click to select** — Choose a destination to build your itinerary
- **Collapsible filter panel** — Toggle category filters from the top bar
- **Interactive legend** — Day-fit color explanations
- **Empty state** — Friendly message when no destinations match filters

### Phase 3 → Itinerary Builder (3D Map + Timeline)

A split-panel view for planning your day-by-day itinerary:

| Panel | Content |
|-------|---------|
| **Left (40%)** | Day tabs, draggable activity timeline, budget breakdown |
| **Right (60%)** | 3D Mapbox map with building extrusions, route lines, activity markers |

Features:
- **AI-powered generation** — OpenAI GPT-4o-mini integration with intelligent local fallback engine
- **Cross-day drag-and-drop** — Reorder activities within and between days using @dnd-kit
- **Activity deletion** — Remove unwanted activities with one click
- **Add/remove days** — Dynamically add "Free Day" or remove current day
- **Live budget tracking** — Per-day and total cost breakdown with category split, animated budget bar
- **Over-budget warning** — Bar turns orange→red and shows ⚠️ when exceeding budget
- **PDF export** — Download a beautifully formatted trip plan with styled HTML
- **Share to clipboard** — Copy a structured text summary for sharing
- **Real POI coordinates** — Every activity is placed at its actual location on the map
- **Route visualization** — Gold connecting lines between activities, solid for active day, dashed for others
- **Numbered map markers** — Show day number + activity index, active/inactive styling
- **3D building extrusions** — Warm beige buildings at 50% opacity for spatial context
- **Cinematic map entry** — flyTo animation on destination load
- **Day quick navigation** — Circular buttons on map to switch between days
- **Re-optimization indicator** — "Re-optimizing route..." with spinner after each drag
- **Loading state** — Staggered loading items ("Analyzing real traveler experiences...", etc.)

---

## 🏗️ Project Structure

```
velosta/
├── app/
│   ├── globals.css                  # Design system: glass panels, animations, responsive
│   ├── layout.tsx                   # Root layout with meta tags
│   ├── page.tsx                     # Main app — phase transitions
│   └── api/
│       └── itinerary/
│           ├── generate/route.ts    # AI itinerary generation (OpenAI + fallback)
│           └── optimize/route.ts    # AI re-optimization after drag-and-drop
├── components/
│   ├── BudgetFilter.tsx             # Phase 1: Cinematic intro & preferences
│   ├── MapView.tsx                  # Phase 2: Interactive globe with filtered pins
│   └── ItineraryBuilder.tsx         # Phase 3: 3D map + drag-and-drop timeline
├── lib/
│   ├── types.ts                     # Full TypeScript type system
│   ├── store.ts                     # Zustand state management
│   ├── data.ts                      # Real Indian destinations & POIs with coordinates
│   ├── itinerary-engine.ts          # Local itinerary generation from POI data
│   └── export.ts                    # PDF export & share-to-clipboard utilities
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── .env.local.example
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS + custom design tokens |
| **Animations** | Framer Motion |
| **Map** | Mapbox GL JS (globe projection + 3D buildings) |
| **Drag-and-Drop** | @dnd-kit (core + sortable + utilities) |
| **State** | Zustand |
| **Icons** | Lucide React |
| **AI** | OpenAI GPT-4 (optional) with local engine fallback |
| **Export** | Browser-native PDF generation |

---

## 📐 Type System (`lib/types.ts`)

The app uses a comprehensive type system:

```
Coordinates          — { lat, lng }
BudgetTier           — id, label, range, description, icon, examples, avgDuration
TripType             — 'solo' | 'couple' | 'family' | 'friends'
TripCategory         — 'nature' | 'culture' | 'adventure' | 'relaxation'
BudgetFit            — 'perfect' | 'stretch' | 'luxury'
DayFit               — 'comfortable' | 'moderate' | 'tight'
Destination          — id, name, state, location, budgetFit, tripDetails, pois[]
POI                  — id, name, location, type, description, cost, duration, rating, tips
Activity             — nodeId, type, time, title, description, duration, cost, icon, location
DayPlan              — day, theme, nodes: Activity[]
BudgetBreakdown      — accommodation, food, activities, transport, buffer
Itinerary            — itineraryId, destination, totalCost, days[], budgetBreakdown
UserPreferences      — budget, days, tripType, categories[]
```

---

## 🗺️ State Management (`lib/store.ts`)

Zustand store with these slices:

| Slice | Properties |
|-------|-----------|
| **Preferences** | `budgetValue`, `tripDays`, `tripType`, `selectedCategories` |
| **Map** | `selectedDestination` |
| **Itinerary** | `itinerary`, `days`, `activeDay` |
| **Flow** | `currentStep` (1/2/3), `isTransitioning`, `goToNextStep()`, `goToPreviousStep()`, `reset()` |
| **Helpers** | `getUserPreferences()` |

---

## 🧠 Itinerary Engine (`lib/itinerary-engine.ts`)

When no OpenAI key is configured, the app generates realistic itineraries locally:

1. **POI Prioritization** — Ranks points of interest by trip type (solo → sights, couple → food/relaxation, family → activities, friends → adventure)
2. **Day Allocation** — Distributes POIs across days, respecting daily budget limits
3. **Timeline Construction** — Assigns realistic time slots, durations, and costs
4. **Theme Generation** — Names each day (e.g., "Arrival & Local Exploration", "Hidden Gems Day")
5. **Budget Computation** — Calculates per-category breakdown (accommodation, food, activities, transport, buffer)

---

## 📤 Export System (`lib/export.ts`)

Two export options available from the itinerary builder:

| Feature | Details |
|---------|---------|
| **PDF Export** | Opens a formatted print-ready document with destination header, day-by-day timeline, budget breakdown, and map reference. Uses browser-native `window.print()`. |
| **Share to Clipboard** | Copies a structured text summary with all days, activities, timings, costs, and total budget. |

---

## 🌍 Destination Data (`lib/data.ts`)

Ships with **real Indian destinations**, each containing:

- Accurate GPS coordinates
- Multiple POIs (points of interest) with real locations
- Budget fit classification
- Trip type compatibility
- Category tags
- Popularity scores
- Trip duration ranges

Destinations span nature (Manali, Coorg), culture (Jaipur, Varanasi), adventure (Rishikesh, Ladakh), and relaxation (Goa, Alleppey) categories.

---

## 🎨 Design System (`globals.css`)

| Token | Usage |
|-------|-------|
| Glass panels | Frosted-glass cards with `backdrop-blur` |
| Warm neutrals | Ivory `#F6F3EE`, Sandstone `#D8C7B3`, Beige `#E8DFD2` |
| Accent colors | Terracotta `#C5784A`, Soft Gold `#B8963E` |
| Animations | Fade-in, slide-up, pulse, shimmer keyframes |
| Responsive | Mobile-first with breakpoints at 768px and 1024px |

---

## 📱 Mobile Responsive

All three phases adapt to mobile:

| Phase | Mobile Adaptation |
|-------|------------------|
| Preferences | Vertical card stack, swipeable budget tiers |
| Map | Full-screen globe, bottom sheet filters |
| Itinerary | Stacked layout (map on top, timeline below), touch drag-and-drop |

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in the Vercel dashboard.

### Manual Production Build

```bash
npm run build    # Creates optimized production build
npm start        # Starts production server
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | **Yes** | Mapbox public token for map rendering (free tier: 50k loads/month) |
| `OPENAI_API_KEY` | No | OpenAI API key for AI-powered itinerary generation. Without it, the local engine generates itineraries from POI data. |
| `DATABASE_URL` | No | PostgreSQL connection string (for future real experience data) |

---

## 🔮 Future Roadmap

### Phase 2: Data & AI Enhancement
- [ ] PostgreSQL + PostGIS database for destinations and experiences
- [ ] Admin panel for destination management
- [ ] Traveler experience submission and community voting
- [ ] RAG-powered AI itineraries trained on real traveler data
- [ ] Seasonal and weather-aware recommendations

### Phase 3: Booking & Commerce
- [ ] Payment gateway (Razorpay / Stripe)
- [ ] Hotel booking API integration
- [ ] Transport booking (IRCTC / RedBus)
- [ ] Confirmation emails and booking management

### Phase 4: Social & Accounts
- [ ] User authentication (NextAuth.js)
- [ ] Save and revisit itineraries
- [ ] Share public itinerary links
- [ ] Collaborative group trip planning
- [ ] Voice input ("Show me hill stations under ₹10k")

### Phase 5: Advanced Features
- [ ] Multi-destination chained trips
- [ ] Template itinerary library
- [ ] Analytics dashboard
- [ ] Smart filters ("Romantic getaways", "Weekend escapes")
- [ ] Offline PWA support

---

## 🐛 Current Limitations

- **No real booking** — Itinerary planning only (booking is Phase 3)
- **No user accounts** — No login/save functionality yet
- **Static destination data** — Hardcoded in `lib/data.ts` (database is Phase 2)
- **AI optional** — Without an OpenAI key, uses the local engine (which still produces quality itineraries)
- **India-focused** — Current destination data covers Indian destinations

---

## 💡 Developer Tips

1. **Mapbox free tier** gives 50,000 map loads/month — plenty for development and small production
2. **AI costs** — Cache frequently generated itineraries to reduce API calls
3. **Performance** — Map uses viewport-based rendering; consider ISR for destination data at scale
4. **Type safety** — All types are centralized in `lib/types.ts`; extend there first
5. **Adding destinations** — Add to the `destinations` array in `lib/data.ts` with real coordinates and POIs

---

## 📚 Related Documentation

| Document | Description |
|----------|-------------|
| [`FEATURE_TRACKER.md`](./FEATURE_TRACKER.md) | **Master feature tracker** — every feature, UI detail, and micro-interaction tracked to the pixel |
| [`UI_WALKTHROUGH.md`](./UI_WALKTHROUGH.md) | Complete UI walkthrough — every screen, panel, button, and interaction |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Technical deep-dive — system diagram, data flow, extension guides |
| [`MAPBOX_SETUP.md`](./MAPBOX_SETUP.md) | Step-by-step Mapbox token setup guide |
| [`PRODUCT_VISION.md`](./PRODUCT_VISION.md) | Design philosophy, visual system, motion design |
| [`velosta_redesign_prd.md`](./velosta_redesign_prd.md) | Full product requirements with specs and schemas |
| [`.env.local.example`](./.env.local.example) | Environment variable template |

---

**Built with ❤️ for Velosta** — *Where journeys begin in space, not on a screen.*
