# Velosta — Product Vision Document

> A premium travel planning web experience that feels like navigating through space rather than browsing a website.

---

## 1. Product Vision

Velosta is a spatial travel planner that:

- Blends **historic architectural elegance** with **modern minimal UI**
- Uses a **light theme** with warm neutral tones
- Simulates **cinematic spatial zoom transitions** between phases
- Guides users through a **3-phase journey**:
  1. Trip Preferences (cinematic intro)
  2. Globe Exploration (interactive map)
  3. Destination Itinerary Builder (3D city view)

> [!IMPORTANT]
> The experience feels **timeless, refined, and immersive** — not futuristic, not cyberpunk, not game-like.

---

## 2. Core Experience Narrative

The entire product behaves like **one continuous camera journey**.

### User Flow

```
Configure Trip → Zoom Out to Globe → Explore Pins → Zoom Into Destination → Build Itinerary in 3D Context
```

### Transition Qualities

| Quality | Description | Implementation |
|---------|-------------|----------------|
| Smooth | No jank or stutter | Framer Motion `AnimatePresence` with 800ms transitions |
| Spatially logical | Movement follows physical reality | Globe → city zoom via Mapbox `flyTo()` |
| Cinematic but calm | Film-like pacing, no drama | Staggered animations, ease-in-out timing |
| Elegant and premium | Every frame feels intentional | Glass panels, warm color palette, breathing space |

> No abrupt page reloads. No hard cuts. Phase transitions use `isTransitioning` state with animated overlays.

---

## 3. Visual Design System

### 3.1 Theme — Implemented

**Light theme only.**

#### Primary Palette (in `globals.css`)

| Token | Hex | Usage |
|-------|-----|-------|
| Ivory | `#F6F3EE` | Background |
| Sandstone | `#D8C7B3` | Secondary surfaces, borders |
| Warm Beige | `#E8DFD2` | Cards & panels |
| Muted Terracotta | `#C5784A` | Primary accent, CTAs |
| Soft Gold | `#B8963E` | Route highlights, premium elements |
| Deep Navy | `#2C3E50` | Text, contrast elements |

> [!CAUTION]
> No neon. No dark cyber aesthetics. No glowing sci-fi elements.

### 3.2 Lighting & Atmosphere

**Lighting Style:**
- Soft golden daylight (warm background gradient)
- Museum-grade illumination (glass panels with subtle backdrop blur)
- Natural shadows (card elevation system)
- Subtle depth (frosted glass layering)

**Mood:**
- Calm luxury
- Editorial travel photography
- *National Geographic* meets *Apple UI*

### 3.3 Typography — Implemented

| Element | Style | Implementation |
|---------|-------|----------------|
| Headers | Elegant serif or refined modern serif | System serif stack |
| Body | Clean geometric sans-serif | System sans-serif stack |

**Hierarchy principles:**
- Strong spacing (`space-y-*`, generous padding)
- Airy layout (max-width containers)
- Large breathing margins (responsive gutters)

---

## 4. Phase Architecture — All Implemented ✅

### Phase 1 — Trip Preferences (`BudgetFilter.tsx`)

**Purpose:** Configure the trip with a cinematic, cloud-to-city descent experience over a live 3D map.

#### Visual
- Live Mapbox 3D city background — user's actual city (geolocation) or Hyderabad default
- Multi-layer cloud dissolve animation — 3 drifting cloud masses fade over 3s to reveal the city below
- Camera drifts during dissolve (zoom 14→15.5, pitch 45→55°, bearing -10→-25°, 6s)
- 3D building extrusions in warm beige on the background map
- Warm glow orbs (gold + terracotta) appear after clouds clear
- Glass-panel cards for preferences
- Animated "Where Journeys Begin" title reveal with staggered letter entrance

#### UI Elements (implemented)

| Element | Details |
|---------|---------|
| **Budget Slider** | ₹3,000–₹2,00,000 range slider with dynamic tier label ("Weekend Escape" → "Premium Experience") |
| **Day Selection** | Button group: 2, 3, 4, 5, 7, 10, 14 days |
| **Trip Type** | Solo / Couple / Family / Friends icon buttons (Lucide React icons) |
| **Categories** | Nature / Culture / Adventure / Relaxation toggle pills |
| **Trip Summary** | Glass chip showing "₹50,000 · 5 days · Friends" |
| **CTA** | "Explore Destinations" with hover animation + map zoom-out |
| **Sub-phase flow** | Budget → (Next) → Preferences → (Explore Destinations) with slide transitions |
| **Progress Dots** | 3 dots tracking sub-phase position |

#### Interaction
When user clicks "Explore Destinations":
1. Fade-out transition (800ms)
2. Phase state transitions to `2`
3. Globe map fades in with pin loading animation

---

### Phase 2 — Globe Exploration (`MapView.tsx`)

**Purpose:** Show destinations filtered by preferences in a spatial context.

#### Visual
- Mapbox mercator projection centered on India
- Warm light map style (`light-v11`)
- GeoJSON-based circle-layer pins (native Mapbox — never drift on zoom/pan)
- Invisible HTML hit-targets for hover/click interactivity

#### Destination Pin System (implemented)

| Pin Color | Meaning | Sizing |
|-----------|---------|--------|
| 🟢 Green (`#22c55e`) | Comfortable — user has enough days | By popularity score |
| 🟡 Yellow (`#eab308`) | Moderate — slightly hectic | Score >90 → 10px |
| � Orange (`#f97316`) | Tight — not enough days | Score >85 → 8px, else 7px |

**Pin Hover:**
- Pin radius increases +3px via `setPaintProperty`
- Glow expands +8px, opacity increases
- Floating tooltip appears at bottom-center

**Pin Click:**
- Map flies to destination (zoom 9, 2s duration, curved easing)
- Destination detail modal slides up

#### UI Panels (implemented)

| Position | Content |
|----------|---------|
| Top bar | Back button, destination count, budget/days subtext, filter toggle, progress dots |
| Top bar → collapsible | Category filter pills (Nature/Culture/Adventure/Relaxation) |
| Top-left | Budget chip (glass panel with ₹ value) |
| Top-right | Duration chip (glass panel with day count) |
| Bottom-center | Hover tooltip: name, state, cost, days, highlights, category, day-fit badge |
| Center (on click) | Destination detail modal: highlights, top POIs, best-for tags, build CTA |
| Bottom-left | Interactive legend (day-fit color meanings) |

#### Interaction
Click destination pin →
- Store sets `selectedDestination`
- Smooth transition to Phase 3
- Map shifts from globe to 3D city view

---

### Phase 3 — Itinerary Builder (`ItineraryBuilder.tsx`)

**Purpose:** Build and customize a day-by-day itinerary in a 3D spatial context.

#### Layout (implemented)

| Panel | Width | Content |
|-------|-------|---------|
| Left panel | 38% | Day tabs, activity timeline, budget breakdown, export buttons |
| Right panel | 62% | 3D Mapbox map with building extrusions, activity markers, route lines |

#### Itinerary Builder Components (implemented)

- **Day Tabs:** Day 1 (5), Day 2 (4), ... Day N — click to switch, shows activity count
- **Add Day (+):** Adds a "Free Day" with empty nodes
- **Remove Day (🗑):** Removes current day (only if >1 day)
- **Draggable activity cards** with type-colored left border and icons:
  - 🚌 Transport (`#6366f1` indigo)
  - 🏨 Accommodation (`#C4734F` terracotta)
  - 🍽️ Food (`#22c55e` green)
  - 📸 Sight (`#C9A96E` gold)
  - 📍 Activity (`#3b82f6` blue)

Each card shows:
- Drag handle (GripVertical)
- Activity type icon in colored badge
- Time slot (`text-[10px]`)
- Title (sm, semibold, truncated) and description (xs, line-clamp-1)
- Duration in "Xh Ym" format
- Estimated cost with ₹ formatting (terracotta)
- Delete button (✕, turns red on hover)
- "✓ N travelers" confidence badge
- Confidence bar (proportional fill)
- First tip with 💡 icon below divider

#### Map Reflection Logic (implemented)

Every itinerary item:
- [x] Places a numbered marker (D{day}/{index}) on the 3D map
- [x] Connects with gold route lines (solid active, dashed inactive)
- [x] Updates markers and routes if activities are reordered
- [x] Shows building extrusions for spatial context
- [x] Auto-focuses bounds on active day's activities
- [x] Markers have active/inactive styling (size, opacity, gradient)
- [x] Day quick-nav buttons on map bottom

**Route Style:**
- Warm gold lines (`#B8963E`)
- 3px width
- Smooth line joins

#### Additional Features (implemented)

| Feature | Details |
|---------|---------|
| **Cross-day drag-and-drop** | Drag activities between days via @dnd-kit |
| **Activity deletion** | Click ✕ to remove any activity |
| **Budget breakdown** | Per-category pie (accommodation, food, activities, transport) |
| **PDF export** | Formatted printable document via `lib/export.ts` |
| **Share** | Copy structured text itinerary to clipboard |
| **AI generation** | OpenAI GPT-4 with local engine fallback |
| **Back navigation** | Return to globe view |

---

## 5. Motion Design System — Implemented

### Transition Timing

| Property | Value | Implementation |
|----------|-------|----------------|
| Phase transitions | 800ms | Framer Motion `AnimatePresence` |
| Card entrance | 300–500ms staggered | `variants` with `staggerChildren` |
| Pin animations | 200ms | CSS scale + opacity transitions |
| Drag physics | Smooth, real-time | @dnd-kit with `closestCorners` strategy |

### Camera Behavior

| Motion | Phase | Implementation |
|--------|-------|----------------|
| Globe rotation | Phase 2 | Mapbox `dragRotate` enabled |
| Zoom to destination | Phase 2→3 | Mapbox `flyTo()` with zoom 14 |
| 3D tilt | Phase 3 | 60° pitch with building extrusions |

---

## 6. UX Goals — Achieved

The user feels:

- ✅ They are **exploring**, not browsing — globe interaction, spatial pins
- ✅ Travel planning is **immersive** — 3D maps, cinematic transitions
- ✅ The product is **premium and thoughtful** — glass panels, warm palette, animations
- ✅ The UI **respects breathing space** — generous padding, clean typography

---

## 7. What This Is NOT

| ❌ Anti-Pattern | Why | How We Avoid It |
|----------------|-----|-----------------|
| Booking site clone | We're building an experience, not a form | Spatial flow, no form wizards |
| Cyberpunk | Clashes with timeless elegance | Warm ivory/gold palette only |
| Neon futuristic | Too aggressive, too cold | Terracotta and sandstone accents |
| Flat SaaS dashboard | No soul, no immersion | 3D maps, glass panels, animations |
| Gaming interface | Wrong emotional register | Calm transitions, editorial feel |

---

## 8. Technical Architecture — Implemented

| Layer | Technology | File(s) |
|-------|-----------|---------|
| Framework | Next.js 14 (App Router) | `app/`, `next.config.js` |
| Language | TypeScript (strict) | `tsconfig.json`, `lib/types.ts` |
| 3D Maps | Mapbox GL JS (globe + 3D buildings) | `components/MapView.tsx`, `components/ItineraryBuilder.tsx` |
| Motion | Framer Motion | `components/BudgetFilter.tsx`, `app/page.tsx` |
| Drag-and-Drop | @dnd-kit | `components/ItineraryBuilder.tsx` |
| State | Zustand | `lib/store.ts` |
| Styling | Tailwind CSS + custom CSS | `tailwind.config.js`, `app/globals.css` |
| AI | OpenAI GPT-4 + local fallback | `app/api/itinerary/generate/route.ts`, `lib/itinerary-engine.ts` |
| Export | Browser-native PDF + clipboard | `lib/export.ts` |

---

## 9. Emotional Outcome

The product feels:

> **Timeless · Refined · Architectural · Editorial · Premium · Calm · Intelligent**

The user navigates through **space and geography**, not clicks through cards.

---

## 10. Implementation Status

| Vision Element | Status | Notes |
|---------------|--------|-------|
| Cinematic cloud-to-city descent | ✅ Done | Multi-layer cloud dissolve over live 3D Mapbox city |
| Geolocation city background | ✅ Done | User's actual city or Hyderabad default |
| Camera drift during intro | ✅ Done | flyTo: zoom 14→15.5, pitch 45→55, bearing -10→-25 |
| "Where Journeys Begin" title | ✅ Done | Staggered serif text with gold divider |
| Light theme with warm palette | ✅ Done | Custom design tokens: ivory, sandstone, terracotta, gold |
| Glass panel UI system | ✅ Done | Frosted glass with backdrop-blur, warm borders |
| Budget slider (₹3k–₹2L) | ✅ Done | Custom styled with dynamic tier labels (4 tiers) |
| Day selection (buttons) | ✅ Done | 2, 3, 4, 5, 7, 10, 14 day options |
| Trip type selector | ✅ Done | Solo/Couple/Family/Friends with Lucide icons |
| Category filtering | ✅ Done | Nature/Culture/Adventure/Relaxation toggle pills |
| Sub-phase transitions | ✅ Done | Budget ↔ Preferences with slide animations |
| Map exploration | ✅ Done | Mapbox mercator centered on India |
| GeoJSON pin system | ✅ Done | Native circle layers — never drift on zoom |
| Day-fit color coding | ✅ Done | Green/yellow/orange based on available days |
| Pin sizing by popularity | ✅ Done | Score-based radius (7/8/10px) |
| Pin hover effects | ✅ Done | Radius +3px, glow increase via setPaintProperty |
| Hover tooltips | ✅ Done | Floating glass panel with name, cost, days, highlights, day-fit |
| Destination detail modal | ✅ Done | Full card with highlights, POIs, best-for tags |
| Collapsible filter panel | ✅ Done | Toggle from top bar |
| Info chips on map | ✅ Done | Budget + duration floating panels |
| Empty state | ✅ Done | Friendly message when no destinations match |
| Interactive legend | ✅ Done | Day-fit color explanations |
| 3D city itinerary view | ✅ Done | Mapbox 3D buildings at 55° pitch, -15° bearing |
| AI itinerary generation | ✅ Done | OpenAI GPT-4o-mini + local engine fallback |
| Staggered loading state | ✅ Done | 4 themed loading messages |
| Day tabs with counts | ✅ Done | Activity count badges, add/remove controls |
| Drag-and-drop itinerary | ✅ Done | @dnd-kit with same-day + cross-day support |
| Type-colored activity cards | ✅ Done | Left border + icon badge colored by type |
| Confidence indicators | ✅ Done | "✓ N travelers" badge + proportional bar |
| Numbered map markers | ✅ Done | D{day}/{index}, active/inactive styling |
| Gold route lines | ✅ Done | Solid active, dashed inactive, 5-color cycle |
| Map auto-focus | ✅ Done | fitBounds on day change |
| Day quick navigation | ✅ Done | Circular buttons on map |
| Budget breakdown chart | ✅ Done | Expandable stacked bar, 5 categories |
| Budget usage bar | ✅ Done | Animated fill, over-budget warning |
| Re-optimization indicator | ✅ Done | "Re-optimizing route..." after drag |
| PDF export | ✅ Done | Styled HTML print document |
| Share functionality | ✅ Done | Clipboard text export |
| Mobile responsive | ✅ Done | Stacked layouts, reduced blur, scroll adjustments |

---

*Velosta — Where journeys begin in space, not on a screen.*
