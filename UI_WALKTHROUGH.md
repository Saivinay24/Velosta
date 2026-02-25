# Velosta — Complete UI Walkthrough

> Every screen, panel, button, and interaction in the app — from first load to final export.

---

## Table of Contents

0. [The Original Vision & How It Maps to the UI](#0-the-original-vision--how-it-maps-to-the-ui)
1. [App Shell & Global UI](#1-app-shell--global-ui)
2. [Phase 1 — Cinematic Intro & Preferences](#2-phase-1--cinematic-intro--preferences)
3. [Phase 2 — Globe Exploration & Map](#3-phase-2--globe-exploration--map)
4. [Phase 3 — Itinerary Builder & 3D Map](#4-phase-3--itinerary-builder--3d-map)
5. [Transitions Between Phases](#5-transitions-between-phases)
6. [Design Tokens & Visual Language](#6-design-tokens--visual-language)
7. [Mobile Responsive Behavior](#7-mobile-responsive-behavior)

---

## 0. The Original Vision & How It Maps to the UI

> *"You open the website. The first thing you see is, you know, you're coming from the top down from the clouds. Then you slowly zoom into a bird's-eye view of the city you're living in. That is the opening."*

The entire app is built around this **single continuous camera journey** idea. There are no page loads, no route changes, no hard cuts. The user descends from the sky, makes choices, and zooms deeper into the world. Here's how every piece of the original vision maps to what you see on screen:

### The Pipeline

```
Cloud View → Budget Selection → Zoom Out to Reachable Destinations → Hover Details →
Zoom Into Selected City → AI Itinerary Generation → Drag-and-Drop Spatial Optimization → Final Export
```

### Vision → Implementation Map

| Original Vision | What You See in the App |
|----------------|------------------------|
| **"Coming from the top down from the clouds"** | Phase 1 opens with a full-screen cloud animation — white radial gradients at 80% opacity slowly dissolving (2.5s) to reveal the warm city-toned background below. The scale contracts from 1.3× to 1.0× to simulate descent. |
| **"Bird's-eye view of the city, slightly blurred in the background"** | After clouds clear, a warm ivory-to-sandstone gradient remains with subtle terracotta/gold radial glows pulsing gently (8–10s breathing cycles), evoking a blurred overhead cityscape. The glass panel floats on top of this atmosphere. |
| **"3 or 4 main options — Below ₹5,000, Below ₹8,000..."** | The Budget sub-phase shows a range slider (₹3,000–₹2,00,000) with a live budget display and dynamic tier label. The tier names update as you drag: "Budget Explorer", "Mid-Range Voyager", "Premium Connoisseur". |
| **"The same city view should smoothly zoom out. No black screen, no cut."** | When user clicks "Explore Destinations", the entire Phase 1 panel fades out + scales to 0.92 over 600ms. A brief spinner overlay bridges the transition (800ms). Phase 2 fades in seamlessly — no page reload, no route change. It's all `AnimatePresence` within one React component tree. |
| **"Whatever nearby places you can go to within that budget — those places will show up as location pins on the map"** | Phase 2 renders a Mapbox globe centered on India. Pins appear for every destination matching the user's budget. The `filterByBudget()` function in `lib/data.ts` does the filtering; pins are DOM markers placed at real GPS coordinates. |
| **"When you hover over each pin — average number of days, basic highlights, what type of trip it suits"** | Hovering a pin triggers a floating glass tooltip at the bottom of the screen showing: destination name, state, days range, estimated cost, category badge, day-fit indicator, and 3 highlight bullet points. |
| **"Number of days depends on the energy of the person... color code it"** | Every pin is color-coded by **day compatibility**, not just budget. Green = comfortable (user has enough days), Yellow = slightly hectic, Orange = too tight. The `getDayFitColor()` function calculates this by comparing user's selected days against the destination's `minDays`/`maxDays`. A legend in the bottom-left explains the colors. |
| **"We're not restricting. We're just indicating."** | All destinations still appear regardless of day fit. The color just indicates comfort level. The user can still click an orange "tight" destination — the app doesn't block them. |
| **"Trip type — with friends, adventure is fine. With family, avoid risky activities."** | The preferences sub-phase includes a 4-option trip type selector (Solo/Couple/Friends/Family). Destinations are filtered by `bestFor` compatibility. The itinerary engine in `lib/itinerary-engine.ts` prioritizes POIs differently per trip type (e.g., friends → adventure/food, family → sights/activities). |
| **"Once you click on a specific destination, the map does not change to a new page. No scene cut."** | Clicking a pin first zooms the globe toward that destination (`flyTo` with zoom 9, pitch 30°, curved easing, 2s duration). A detail modal slides up. When user confirms, the phase transitions to Phase 3 — again, no route change, just state + animation. |
| **"The same map smoothly zooms in again — into a 3D bird's-eye view of that city"** | Phase 3 initializes a new Mapbox map centered on the destination at zoom 12, pitch 50°, bearing -15°. A 3D building extrusion layer renders the city blocks in warm beige (#E8DFD2) at 50% opacity. |
| **"Basic map view, but in 3D. Like how you see blocks in Google Maps — just structures."** | The 3D layer uses Mapbox's `fill-extrusion` on the `building` source layer. You see structural outlines — no textures, no satellite imagery, no street view. Just the spatial layout of buildings and roads. |
| **"The user understands: where the beach is, where the hotel is, how far things are"** | Every itinerary activity is placed at its **real GPS coordinate** (from POI data). Numbered markers appear on the map. Gold route lines connect them in order. Switching days re-draws the routes and re-focuses the map. |
| **"On the side panel, the itinerary starts generating"** | The left panel (38% width) shows a loading animation for ~2 seconds ("Crafting your itinerary... Analyzing real traveler experiences... Mapping points of interest... Optimizing your schedule... Building timeline"). Then the day-by-day timeline renders. |
| **"Icon-based. You can drag and drop. You can move things from Day 1 to Day 2."** | Each activity has a type icon (🚌 transport, 🏨 stay, 🍽️ food, 📸 sight, 📍 activity). Cards are fully draggable via @dnd-kit — within the same day (reorder) or across days (cross-day move). After each drag, a brief "Re-optimizing route..." indicator appears. |
| **"The map updates live. If you add a museum, you'll immediately see where it is."** | Markers and route lines re-render every time `days` state changes. Reorder an activity → markers reposition → route re-draws → map re-focuses to the active day's bounds. |
| **"If you reorder places, the route redraws"** | Route lines are GeoJSON `LineString` layers. Active day: solid gold line (4px). Inactive days: dashed lines (2px, 40% opacity). They update immediately on drag-end. |
| **"The user can see that visually and fix it"** | The split-panel layout means the timeline and map are always visible side-by-side. The user can spot inefficient routes (e.g., zig-zagging) and fix them by dragging cards. |
| **"Most AI tools just generate and expect you to accept. Here, the user has control."** | The itinerary is fully editable: drag to reorder, delete unwanted activities, add new days, remove days. The AI generates a starting point; the user sculpts it. |
| **"Export the full plan as a PDF. Save it. Share it."** | Bottom of the left panel has "Export PDF" (opens a formatted print document) and "Share" (copies structured text to clipboard). Both buttons are always accessible. |
| **"Not just another booking app. More like spatial travel planning."** | There are no booking forms, no payment screens, no search bars. The entire interface is a map-based spatial experience. You navigate through geography, not through forms. |

### The Emotional Arc

```
Moment                     | Feeling
─────────────────────────────────────────
Cloud descent (0–2.2s)     | Wonder, anticipation
"Where Journeys Begin"     | Cinematic, premium
Budget + preferences       | Personal, intentional
Globe with pins            | Exploration, discovery
Hovering destinations      | Curiosity, comparison
City 3D zoom-in            | Immersion, commitment
Itinerary generating       | Excitement, anticipation
Drag-and-drop planning     | Control, creativity
Export & share             | Accomplishment, readiness
```

---

## 1. App Shell & Global UI

### Root Layout (`app/layout.tsx`)

The entire app lives inside a single page — there are no route changes. Everything is controlled by `currentStep` (1, 2, or 3) in the Zustand store.

```
<html>
  <head>
    — Google Fonts: Playfair Display (serif) + Inter (sans-serif)
    — Mapbox GL CSS
  </head>
  <body>
    <main class="min-h-screen bg-ivory">
      — Transition overlay (spinner during phase changes)
      — AnimatePresence: renders Phase 1, 2, or 3
    </main>
  </body>
</html>
```

**Title:** "Velosta — Where Journeys Begin in Space"

### Transition Overlay

When switching between phases, a full-screen overlay appears:

```
┌─────────────────────────────────────┐
│                                     │
│          ◌ (spinning ring)          │
│                                     │
│   ivory/80 background + blur        │
│                                     │
└─────────────────────────────────────┘
```

- Background: `bg-ivory/80` with `backdrop-blur-sm`
- Spinner: 32px ring, `border-sandstone/30` with `border-t-gold`, spinning
- Duration: ~800ms
- z-index: 50 (above everything)

---

## 2. Phase 1 — Cinematic Intro & Preferences

**Component:** `BudgetFilter.tsx`  
**Duration on screen:** Until user clicks "Explore Destinations"

> *This is the "coming from the top down from the clouds" moment. The user's very first impression. It must feel cinematic, warm, and premium — like the opening shot of a travel film.*

### 2.1 The Cloud-to-City Descent (Background Layer)

The entire screen is a **multi-layered animated atmosphere** that simulates descending through clouds into a warm city below. This is not a static background — it moves.

**What happens in the first 2.5 seconds:**

```
t=0.0s    The screen is mostly white/translucent — you're in the clouds
          4 overlapping white radial gradients at 80% opacity
          Scale is 1.3× (zoomed in, close to the clouds)

t=0.0–2.5s  The white cloud layer fades from 80% → 4% opacity
            Simultaneously scales from 1.3× → 1.0× (descending)
            The warm gradient beneath becomes visible:
              ivory → beige → sandstone (diagonal gradient)

t=1.5s    The "city" layer starts appearing:
            Terracotta and gold radial glows at 6% opacity
            These represent the warm tones of a city seen from above
            Positioned at 20%, 50%, and 80% of the viewport

t=2.5s+   The clouds have dissolved. The warm cityscape atmosphere is settled.
            Two ambient light orbs now breathe perpetually:
              — Golden glow (top-right): 600px orb, breathes 30→50→30% (8s cycle)
              — Terracotta glow (bottom-left): 500px orb, breathes 20→40→20% (10s cycle)
            This creates a living, breathing, warm "golden hour" atmosphere
```

**Layer stack (bottom to top):**

| Layer | What | Timing |
|-------|------|--------|
| 1. Base gradient | `bg-gradient-to-br from-ivory via-beige to-sandstone` | Always visible |
| 2. Cloud layer | 4 white `radial-gradient` ellipses, 80% → 4% opacity | 0–2.5s dissolve |
| 3. City warmth | 3 terracotta/gold `radial-gradient` circles, 0% → 6% opacity | Fade in at 1.5s |
| 4. Golden glow | 600px round orb, top-right | Perpetual breathing (8s) |
| 5. Warm glow | 500px round orb, bottom-left | Perpetual breathing (10s, 3s delay) |

> The combined effect: you descend through clouds, the haze clears, and you're floating above a warm, sunlit city. The glass panel with "Start Your Journey" sits in this atmosphere like a card floating in golden light.

### 2.2 The Title Reveal — "Where Journeys Begin" (0–2.2 seconds)

While the clouds dissolve, a centered title sequence plays. This auto-advances after 2.2 seconds — the user doesn't interact with it, they just *experience* it.

```
┌─────────────────────────────────────────┐
│                                         │
│               V E L O S T A             │  ← tracking-[0.4em] uppercase, sandstone
│                                         │
│         Where Journeys Begin            │  ← 5xl/6xl, Playfair Display, charcoal
│                                         │
│              ─────── (48px)             │  ← gold line, animates width from 0→48px
│                                         │
└─────────────────────────────────────────┘
```

**Animations (staggered):**
- "Velosta" text: fade in at 0.3s
- "Where Journeys Begin": fade in + slide up at 0.6s
- Gold divider line: grows from 0 to 48px at 1.2s
- Entire block exits at 2.2s (fade up + slight scale down)

### 2.3 Main Panel — Budget Sub-Phase

After the intro, a centered **glass panel** slides in from below:

```
┌──────────────────────────────────────────┐
│                                          │
│              V E L O S T A               │  ← xs tracking-[0.3em], sandstone
│          Start Your Journey              │  ← 3xl/4xl Playfair Display, charcoal
│              ─── (40px)                  │  ← gold divider
│                                          │
│       What's your travel budget?         │  ← sm, light, charcoal-light
│                                          │
│             ₹50,000                      │  ← 4xl/5xl Playfair Display, bold
│              Explorer                    │  ← xs, gold, tier label
│                                          │
│  ├──────────●──────────────────────┤     │  ← range slider ₹3,000 → ₹2,00,000
│  ₹3,000                    ₹2,00,000    │  ← xs labels
│                                          │
│          How many days?                  │  ← sm, light, centered
│                                          │
│   [ 2 ] [ 3 ] [ 4 ] [■5■] [ 7 ] [10] [14]  ← day buttons (selected = charcoal bg)
│                                          │
│  ┌──────────────────────────────────┐    │
│  │             Next                  │    │  ← terracotta→gold gradient button
│  └──────────────────────────────────┘    │
│                                          │
│            ● ○ ○                         │  ← progress dots
│                                          │
└──────────────────────────────────────────┘
```

**Panel Styling:**
- Class: `glass-panel rounded-3xl p-8 md:p-10 max-w-xl`
- Background: rgba(253,252,250,0.85) with backdrop-blur(20px)
- Border: 1px solid rgba(216,199,179,0.3)
- Shadow: 0 8px 32px rgba(44,44,44,0.08)

**Budget Slider:**
- Custom styled range input
- Track: sandstone → gold gradient, 4px height
- Thumb: 24px gold circle with white border and gold shadow
- Hover: thumb scales to 1.15x

**Budget Display:**
- Value animates on change (fade-in + slight slide)
- Tier label changes dynamically based on value:
  - ₹3,000–₹15,000 → "Budget Explorer"
  - ₹15,001–₹50,000 → "Mid-Range Voyager"
  - ₹50,001+ → "Premium Connoisseur"

**Day Buttons:**
- Options: 2, 3, 4, 5, 7, 10, 14
- Selected: `bg-charcoal text-warm-white shadow-md`
- Unselected: `bg-beige/60 text-charcoal-light`
- Rounded-lg, text-sm

### 2.4 Main Panel — Preferences Sub-Phase

Slides in from the right after clicking "Next":

```
┌──────────────────────────────────────────┐
│                                          │
│              V E L O S T A               │
│          Start Your Journey              │
│              ─── (40px)                  │
│                                          │
│          Who's traveling?                │  ← sm, light
│                                          │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │  👤  │ │  ❤️  │ │ 👥  │ │  🏠  │   │  ← Lucide icons, not emoji
│  │ Solo │ │Couple│ │Friends││Family│   │
│  └──────┘ └──────┘ └──────┘ └──────┘   │
│                                          │  (selected = charcoal bg + white text)
│         What excites you? (optional)     │
│                                          │
│  ( 🏔 Nature ) ( 🏛 Culture ) ( 🧭 Adventure ) ( 🌴 Relaxation )
│                                          │  ← pill toggles
│                                          │  selected: gold/20 bg + gold/40 border
│                                          │  unselected: beige/40 bg
│  ┌──────────────────────────────────┐    │
│  │ ₹50,000 · 5 days · Friends      │    │  ← summary glass panel
│  └──────────────────────────────────┘    │
│                                          │
│  [ Back ]  [ ══ Explore Destinations ══ ]│
│                                          │  ← Back: bordered button
│            ○ ● ○                         │  ← Explore: gradient button
│                                          │
└──────────────────────────────────────────┘
```

**Trip Type Grid:**
- 4 columns, each a tall button with icon + label
- Icons from Lucide: User, Heart, Users, HomeIcon
- Selected: `bg-charcoal text-warm-white shadow-md`
- Unselected: `bg-beige/50 text-charcoal-light`

**Category Pills:**
- Flex-wrap centered layout
- Each pill: icon + label in a rounded-full button
- Selected: `bg-gold/20 text-charcoal border-gold/40`
- Unselected: `bg-beige/40 text-charcoal-light/70 border-transparent`

**Summary Chip:**
- Glass panel with rounded-xl
- Shows: budget · days · trip type in one line
- Text: xs charcoal-light/50 label + sm medium charcoal value

**CTA Buttons:**
- "Back": bordered, sandstone border, hover terracotta
- "Explore Destinations": terracotta→gold gradient, white text, shadow, hover scale 1.02

**Progress Dots:**
- 3 dots at bottom (2px rounded circles)
- Active dot: `bg-terracotta`
- Inactive: `bg-sandstone/40`

---

## 3. Phase 2 — Globe Exploration & Map

**Component:** `MapView.tsx`  
**Full-screen map view**

### 3.1 The Map

```
┌─────────────────────────────────────────────────────────┐
│ ┌─ Top Bar ──────────────────────────────────────────┐  │
│ │  ← Back    "12 Destinations"     🔽filter  ○●○     │  │
│ │            within ₹50,000 · 5 days                 │  │
│ └────────────────────────────────────────────────────┘  │
│                                                         │
│  ┌────────┐                              ┌────────┐    │
│  │ Budget │                              │Duration│    │
│  │₹50,000 │                              │ 5 Days │    │
│  └────────┘                              └────────┘    │
│                                                         │
│                    🌐 Globe Map                         │
│              (Mapbox, globe projection)                  │
│                                                         │
│         🟢 Manali    🟡 Shimla     🔵 Goa              │
│                   🟢 Rishikesh                          │
│              🟡 Jaipur        🟢 Coorg                  │
│                                                         │
│  ┌─────────────┐                                       │
│  │Day Compat.  │         (Destination tooltip           │
│  │ 🟢 Comfy    │          appears on hover)             │
│  │ 🟡 Hectic   │                                       │
│  │ 🟠 Tight    │                          [Nav ↑↓ 🧭]  │
│  └─────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

**Map Configuration:**
- Style: `mapbox://styles/mapbox/light-v11`
- Center: India (78.9629, 22.5937)
- Zoom: 4.2
- Projection: `globe`
- Pitch: 0, Bearing: 0
- Fog: ivory/beige atmosphere, no stars

**Map Controls:**
- Navigation control (bottom-right): compass + zoom + pitch
- Custom styled: rounded-12px, sandstone border

### 3.2 Top Bar

Glass panel spanning full width, pinned to top:

```
┌──────────────────────────────────────────────────┐
│ ← Back          12 Destinations        🔽  ○●○  │
│              within ₹50,000 · 5 days             │
└──────────────────────────────────────────────────┘
```

- Back button: ArrowLeft icon + "Back" text (hidden on mobile)
- Center: destination count (serif, semibold, lg) + budget/days subtext (xs)
- Right: Filter toggle button + progress dots (dot 2 = terracotta)
- Animation: slides in from top with 0.3s delay

### 3.3 Collapsible Filter Panel

Toggles below the top bar when filter icon is clicked:

```
┌──────────────────────────────────────────────────┐
│  ( 🏔 Nature ) ( 🏛 Culture ) ( 🧭 Adventure ) ( 🌴 Relaxation )  │
└──────────────────────────────────────────────────┘
```

- Animated height from 0 to auto
- Same category pills as Phase 1
- Selected: `bg-charcoal text-warm-white`
- Unselected: `bg-beige/60 text-charcoal-light`

### 3.4 Budget & Duration Chips

Two floating glass panels:

**Left chip (top-left, below top bar):**
```
┌─────────┐
│ Budget   │  ← 10px, charcoal-light/50
│ ₹50,000  │  ← base, Playfair Display, semibold
└─────────┘
```

**Right chip (top-right, below top bar):**
```
┌─────────┐
│ Duration │
│ 5 Days   │
└─────────┘
```

### 3.5 Map Pins

Each destination gets a circular DOM marker:

**Sizing:** Based on `popularityScore`:
- Score > 90 → 18px
- Score > 85 → 15px
- Others → 13px

**Color coding** (based on day-fit, not budget):
- 🟢 `#22c55e` (green) — Comfortable: user days ≥ destination maxDays
- 🟡 `#eab308` (yellow) — Moderate: user days between min and max
- 🟠 `#f97316` (orange) — Tight: user days < destination minDays

**Styling:**
- Circular, white 2.5px border
- Colored box-shadow glow
- `gold-pulse` animation (subtle pulsing shadow)

**Hover Behavior:**
- Pin scales to 1.5x
- Shadow intensifies
- z-index jumps to 100
- Hover tooltip appears at bottom-center of screen

**Click Behavior:**
- Map flies to destination (zoom 9, pitch 30, 2s duration, ease-in-out curve)
- Destination detail modal appears

### 3.6 Hover Tooltip

Floating glass panel at bottom-center of screen:

```
┌───────────────────────────────────────────┐
│ 🟢  Manali                   🏔 Nature    │
│     Himachal Pradesh                      │
│                                           │
│     📅 3-5 days    ₹ 12,000              │
│                                           │
│     🕐 5 days — Comfortable               │  ← day-fit badge
│                                           │
│     ✓ Snow-capped Himalayan peaks         │
│     ✓ River rafting in Beas               │
│     ✓ Old Manali cafés and culture        │
└───────────────────────────────────────────┘
```

- Min-width: 300px, max-width: 360px
- Colored dot matches pin color
- Category badge: icon + label in rounded-full pill
- Day-fit badge: colored background with clock icon
- Highlights: checkmarks in gold
- Animate: fade in + slide up, 200ms

### 3.7 Destination Detail Modal

Full-screen overlay with centered glass card:

```
┌──────────────────────────────────────────────────┐
│                                                  │
│   Manali                                    ✕    │
│   Himachal Pradesh                               │
│   📅 3-5 days  ₹ 12,000  ⭐ 95%                │
│                                                  │
│   🕐 5 days available — Comfortable              │
│                                                  │
│   HIGHLIGHTS                                     │
│   ✓ Snow-capped Himalayan peaks                  │
│   ✓ River rafting in Beas                        │
│   ✓ Old Manali cafés and culture                 │
│                                                  │
│   TOP PLACES                                     │
│   📍 Hadimba Temple   📍 Solang Valley           │
│   📍 Old Manali       📍 Jogini Falls            │
│                                                  │
│   (couple) (friends) (solo)                      │
│                                                  │
│   [ Other Options ]  [ Build Itinerary → ]       │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Overlay:** `bg-charcoal/30 backdrop-blur-sm`

**Card:**
- Glass panel, rounded-3xl, max-w-lg
- Slides in from bottom (y:40 → 0, slight scale)

**Content:**
- Destination name: 3xl Playfair Display, bold
- State: sm, charcoal-light/50
- Stats row: calendar icon + days, rupee icon + cost, star icon + popularity
- Day-fit badge: colored background matching pin system
- Highlights: gold checkmarks
- Top Places: beige pills with MapPin icon, showing first 4 POIs
- Best-for tags: rounded-full pills, matching trip type gets gold highlight

**Buttons:**
- "Other Options": bordered, resets map view
- "Build Itinerary →": terracotta→gold gradient

### 3.8 Legend

Bottom-left glass panel:

```
┌────────────────┐
│ DAY COMPATIB.  │
│ 🟢 Comfortable │
│ 🟡 Slightly hectic│
│ 🟠 Too tight   │
└────────────────┘
```

### 3.9 Empty State

Centered glass panel when no destinations match filters:

```
┌──────────────────────────────┐
│           😔                 │
│     No trips found           │
│  Try adjusting your budget,  │
│  days, or filters.           │
│  [ Adjust Preferences ]      │
└──────────────────────────────┘
```

---

## 4. Phase 3 — Itinerary Builder & 3D Map

**Component:** `ItineraryBuilder.tsx`  
**Split-panel layout with timeline + 3D map**

### 4.1 Loading State

Full-screen centered loader shown for ~2 seconds while itinerary generates:

```
┌─────────────────────────────────────────┐
│                                         │
│              ◌ (spinning ring)          │
│                                         │
│       Crafting your itinerary           │  ← 2xl Playfair Display
│            for Manali                   │  ← sm, charcoal-light/60
│       ₹50,000 · 5 days                 │  ← xs, charcoal-light/40
│                                         │
│  ◌ Analyzing real traveler experiences  │  ← staggered items
│  ◌ Mapping points of interest           │    each with spinning Loader2 icon
│  ◌ Optimizing your schedule             │    appear 0.5s apart
│  ◌ Building timeline                    │
│                                         │
└─────────────────────────────────────────┘
```

### 4.2 Top Bar

Sticky glass panel header:

```
┌──────────────────────────────────────────────────────┐
│ ← Map         Manali           📤 📥  ○ ○ ●        │
│           5 days · Drag to customize                  │
└──────────────────────────────────────────────────────┘
```

- Back: ArrowLeft + "Map" label (hidden on mobile)
- Center: destination name (lg serif) + day count subtitle
- Right: Share button (Share2), Export button (Download), progress dots (dot 3 active)
- Share shows "Copied to clipboard!" tooltip on click (gold text, fades after 2s)

### 4.3 Split Panel Layout

```
┌────────────────────────┬──────────────────────────────┐
│                        │                              │
│   Left Panel (38%)     │    Right Panel (62%)         │
│   Itinerary Timeline   │    3D Mapbox Map             │
│                        │                              │
│   ┌── Day Tabs ──────┐ │                              │
│   │ [D1] [D2] [D3] + │ │    (3D buildings, markers,  │
│   └──────────────────┘ │     route lines)             │
│                        │                              │
│   Day Theme Title      │    ┌──────────────────────┐  │
│   ────── (gold)        │    │ Day 2 · Hidden Gems  │  │
│                        │    └──────────────────────┘  │
│   ┌── Activity ──────┐ │                              │
│   │ ⋮ 🚌 06:00       │ │        ①─────②─────③       │
│   │   Arrive in ...   │ │       (numbered markers     │
│   │   4h · ₹3,000  ✕ │ │        with route lines)    │
│   └──────────────────┘ │                              │
│        │ (connector)   │                              │
│   ┌── Activity ──────┐ │                              │
│   │ ⋮ 🏨 10:00       │ │                              │
│   │   Check-in at ... │ │                              │
│   │   1h · ₹2,500  ✕ │ │                              │
│   └──────────────────┘ │                              │
│        │               │                              │
│   (more activities...) │                              │
│                        │                              │
│   ┌── Bottom Bar ────┐ │    ┌─────────────────────┐   │
│   │ Total: ₹24,500   │ │    │  ① ② ③ ④ ⑤         │   │
│   │ ████████░░ 49%   │ │    │  (day quick nav)    │   │
│   │ [Export PDF] [📤] │ │    └─────────────────────┘   │
│   └──────────────────┘ │                              │
└────────────────────────┴──────────────────────────────┘
```

### 4.4 Day Tabs

Horizontal scrollable tab bar:

```
┌──────────────────────────────────────────┐
│  [■Day 1■(5)] [Day 2(4)] [Day 3(3)] [+] [🗑]  │
└──────────────────────────────────────────┘
```

- Active day: `bg-charcoal text-warm-white shadow-sm`
- Inactive: `text-charcoal-light/60 hover:bg-beige/60`
- Activity count shown in parentheses after day label
- Plus button (+): adds a new "Free Day"
- Trash button (🗑): removes current day (only if more than 1 day exists)
- Scrollable with hidden scrollbar (`scrollbar-hide`)

### 4.5 Activity Cards (Draggable)

Each activity is a **sortable card** with drag handle:

```
┌─────────────────────────────────────────────┐
│ ⋮  🚌   06:00                    ₹3,000 ✕  │  ← drag handle, icon, time, cost, delete
│  ⋮      Arrive in Manali                    │  ← title (sm, semibold)
│         Travel to Manali, HP                 │  ← description (xs, truncated)
│                                              │
│         4h 0m  · ✓ 20 travelers  ████░      │  ← duration, confidence
│         ─────────────────────                │
│         💡 Book tickets in advance           │  ← tip (first one only)
└─────────────────────────────────────────────┘
```

**Card Styling:**
- `bg-warm-white rounded-xl p-3.5`
- Left colored border (3px) based on activity type:
  - Transport: `#6366f1` (indigo)
  - Accommodation: `#C4734F` (terracotta)
  - Food: `#22c55e` (green)
  - Sight: `#C9A96E` (gold)
  - Activity: `#3b82f6` (blue)
- When dragging: `opacity 0.5, shadow-lg, ring-1 ring-gold/30`

**Drag Handle:**
- GripVertical icon (left side)
- `cursor-grab`, turns `cursor-grabbing` when active
- Color: sandstone/30 → gold on hover

**Icon Badge:**
- Rounded-lg, background matches type at 15% opacity
- Lucide icon in terracotta

**Content Details:**
- Time: 10px, charcoal-light/40
- Title: sm, semibold, charcoal, truncated
- Cost: xs, semibold, terracotta (right-aligned)
- Delete button (✕): 3px X icon, charcoal-light/20 → red-400 on hover
- Description: xs, charcoal-light/50, line-clamp-1
- Duration: "Xh Ym" format
- Confidence badge: "✓ N travelers" in sandstone pill
- Confidence bar: thin colored bar proportional to confidence score
- Tip: first tip shown below a thin divider, preceded by 💡

**Between Cards:**
- 1px vertical sandstone/25 connector line (3px height)

**Empty Day:**
```
┌──────────────────────────┐
│      📍 (faded icon)     │
│    No activities yet     │
│  Drag activities here    │
│  or add a new day        │
└──────────────────────────┘
```

### 4.6 Bottom Summary Bar

Sticky glass panel at the bottom of the left panel:

```
┌──────────────────────────────────────────┐
│  ◌ Re-optimizing route...                │  ← shown only during drag optimization
│                                          │
│  Estimated Total              ₹24,500 📊 │  ← toggle breakdown
│  ████████████████░░░░░░░░░░░░░░░         │  ← budget usage bar
│  49% of ₹50,000 budget                   │
│                                          │
│  ┌── Budget Breakdown (expandable) ────┐ │
│  │ ████████████████████████████████     │ │  ← stacked color bar
│  │ 🟤 Stay ₹7,500  🟢 Food ₹4,000    │ │
│  │ 🔵 Activities ₹3,500 🟣 Transport  │ │
│  │ 🟡 Buffer ₹1,000                   │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  [ ═══ Export PDF ═══ ] [ 📤 ]           │
│                                          │
└──────────────────────────────────────────┘
```

**Budget Bar:**
- Height: 6px (1.5), rounded-full
- Background: sandstone/20
- Fill: terracotta→gold gradient (animates width from 0)
- Over 90%: changes to orange→red gradient
- Label: "X% of ₹Y budget" + warning emoji if over 100%

**Budget Breakdown Chart:**
- Toggleable via BarChart3/ChevronUp icon
- Stacked horizontal bar: all 5 categories proportionally
  - Stay: `#C4734F` (terracotta)
  - Food: `#22c55e` (green)
  - Activities: `#3b82f6` (blue)
  - Transport: `#6366f1` (indigo)
  - Buffer: `#C9A96E` (gold)
- Grid below: 3 columns showing color dot + label + ₹amount

**Optimization Indicator:**
- Appears for 600ms after any drag-and-drop
- Gold text: "Re-optimizing route..." with spinning Loader2
- Animated height in/out

**Action Buttons:**
- Export PDF: full-width gradient button (terracotta→gold), Download icon
- Share: bordered button with Share2 icon

### 4.7 3D Map (Right Panel)

**Map Configuration:**
- Style: `mapbox://styles/mapbox/light-v11`
- Center: destination coordinates
- Zoom: 12
- Pitch: 50°
- Bearing: -15°
- 3D building layer enabled

**3D Building Layer:**
- Source: `composite` / `building`
- Filter: extrude = true
- Color: `#E8DFD2` (warm beige)
- Opacity: 0.5
- Height interpolated by zoom (0 at zoom 12, full at zoom 14+)
- Inserted below the first symbol layer (labels stay on top)

**Activity Markers:**
Numbered circular markers for each activity across all days:

```
  ┌────┐
  │ D1 │  ← day number (7px)
  │  3 │  ← activity index (11px)
  └────┘
```

- Active day markers: 34px, terracotta→gold gradient, 3px white border, strong shadow
- Inactive day markers: 26px, sandstone→gold gradient, 2px border, faded (60% opacity)
- Hover: scale 1.3x, z-index 1000
- Click: switches to that day

**Route Lines:**
For each day, a GeoJSON LineString connects activity coordinates:

- Active day: solid line, 4px width, 90% opacity
- Inactive days: dashed line (2,2), 2px width, 40% opacity
- Colors cycle: `#C9A96E`, `#D4B57E`, `#BF9D5E`, `#C4734F`, `#3b82f6`
- Line-join: round, line-cap: round

**Map Auto-Focus:**
- On day change, map fits bounds to active day's activities
- Padding: 80px all sides
- Max zoom: 14
- Animation duration: 1000ms
- Single-activity days: flyTo center at zoom 13

**Day Overlay (top-left):**
```
┌──────────────────────────────┐
│ Day 2 · Hidden Gems Day     │  ← xs, charcoal-light/60
└──────────────────────────────┘
```

**Day Quick Nav (bottom-center):**
```
   ① ② ③ ④ ⑤
```
- Circular buttons (32px)
- Active: terracotta→gold gradient with shadow
- Inactive: glass-panel style
- Click switches active day

---

## 5. Transitions Between Phases

### Phase 1 → Phase 2

1. User clicks "Explore Destinations"
2. `isExiting` set → entire Phase 1 fades out + scales to 0.92 (600ms)
3. `goToNextStep()` triggered → `isTransitioning: true`
4. Overlay spinner appears (ivory/80 backdrop)
5. After 800ms, `currentStep` changes to 2
6. Phase 2 fades in (opacity 0→1, 800ms)
7. Top bar slides in from top (delay 0.3s)
8. Info chips slide in from sides (delay 0.5-0.6s)
9. Legend slides in from bottom (delay 0.8s)
10. Map pins render after map `load` event

### Phase 2 → Phase 3

1. User clicks "Build Itinerary →" in destination modal
2. `setSelectedDestination(dest)` → destination saved in store
3. After 600ms, `goToNextStep()` fires
4. Transition overlay appears
5. After 800ms, `currentStep` changes to 3
6. Loading screen shows for ~2s (itinerary generating)
7. Builder view fades in (800ms)
8. Top bar renders immediately
9. 3D map initializes (zoom 12, pitch 50)
10. Markers and routes render after map load
11. Map overlay and quick nav animate in (delay 0.5s)

### Phase 3 → Phase 2 (Back)

1. User clicks "← Map"
2. `goToPreviousStep()` → transition overlay for 600ms
3. Phase 2 re-renders with previous map state

### Phase 2 → Phase 1 (Back)

1. User clicks "← Back"
2. Same transition pattern, returns to preferences panel

---

## 6. Design Tokens & Visual Language

### Color Palette

| Token | Hex | CSS Variable | Tailwind Class | Usage |
|-------|-----|-------------|----------------|-------|
| Ivory | `#F6F3EE` | `--ivory` | `bg-ivory` | Page background |
| Sandstone | `#D8C7B3` | `--sandstone` | `bg-sandstone` | Borders, secondary |
| Warm Beige | `#E8DFD2` | `--warm-beige` | `bg-beige` | Cards, panels |
| Terracotta | `#C4734F` | `--terracotta` | `text-terracotta` | Primary accent, CTAs |
| Soft Gold | `#C9A96E` | `--soft-gold` | `text-gold` | Highlights, routes |
| Deep Charcoal | `#2C2C2C` | `--deep-charcoal` | `text-charcoal` | Primary text |
| Charcoal Light | `#4A4A4A` | `--charcoal-light` | `text-charcoal-light` | Secondary text |
| Warm White | `#FDFCFA` | `--warm-white` | `bg-warm-white` | Card backgrounds |

### Typography

| Element | Font | Weight | Example Class |
|---------|------|--------|--------------|
| Page titles | Playfair Display | 600–700 | `font-serif text-5xl font-semibold` |
| Section headers | Playfair Display | 500–600 | `font-serif text-lg font-semibold` |
| Body text | Inter | 300–500 | `text-sm font-light` |
| Labels | Inter | 500 | `text-xs font-medium` |
| Micro text | Inter | 400 | `text-[10px]` |

### Shared UI Patterns

**Glass Panel:**
```css
background: rgba(253, 252, 250, 0.85);
backdrop-filter: blur(20px);
border: 1px solid rgba(216, 199, 179, 0.3);
box-shadow: 0 8px 32px rgba(44, 44, 44, 0.08);
```

**Gradient Buttons:**
```css
background: linear-gradient(135deg, #C4734F 0%, #C9A96E 100%);
box-shadow: 0 4px 20px rgba(196, 115, 79, 0.3);
color: #FDFCFA;
```

**Gold Divider:**
```css
width: 40px; height: 2px; background: #C9A96E;
```

**Custom Scrollbar:**
- Width: 5px
- Thumb: sandstone, 3px radius
- Hover: terracotta

### Animations

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| `gold-pulse` | 2.5s infinite | ease-in-out | Map pins |
| `shimmer` | 2.5s infinite | linear | Loading shimmer |
| `fade-in` | 0.8s | ease-out | General fade |
| `slide-up` | 0.6s | ease-out | Content entrance |
| Phase transition | 800ms | cubic-bezier(0.4, 0, 0.2, 1) | Between phases |
| Cloud descent | 2.5s | ease-out | Phase 1 intro |
| Card entrance | 300-500ms staggered | ease-out | Framer Motion variants |

---

## 7. Mobile Responsive Behavior

### Breakpoints

| Breakpoint | Width | Behavior |
|-----------|-------|----------|
| Mobile | < 768px | Stacked layouts, reduced spacing |
| Tablet | 768–1024px | Intermediate sizing |
| Desktop | > 1024px | Full split-panel layout |

### Phase 1 (Mobile)

- Glass panel: `mx-4` (small horizontal margin)
- Title: 3xl instead of 4xl
- Budget value: 4xl instead of 5xl
- Day buttons: wrap naturally with flex
- Padding: p-8 instead of p-10

### Phase 2 (Mobile)

- "Back" label hidden (`hidden sm:inline`)
- Info chips remain but float over map
- Tooltip width: min 300px
- Modal: `p-4` margin around modal card
- Filter panel wraps categories

### Phase 3 (Mobile)

- Layout switches from side-by-side to **stacked vertical** (`flex-col md:flex-row`)
- Timeline panel: full width, max-height 50vh, scrollable
- Map panel: full width, fills remaining space below
- "Map" back label hidden on mobile
- Day tabs scroll horizontally
- Activity cards retain full layout
- Bottom summary bar stretches full width

### Glass Panel (Mobile)

- Backdrop blur reduced: 12px instead of 20px (performance)

---

*Last updated: February 2026*
