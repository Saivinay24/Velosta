# Velosta — Architecture Guide

> Technical deep-dive for developers working on or extending the Velosta codebase.

---

## System Overview

```
┌─────────────────────────────────────────────────────┐
│                    Next.js 14 App                    │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐ │
│  │ Phase 1   │  │ Phase 2   │  │ Phase 3           │ │
│  │ Budget    │→ │ Map       │→ │ Itinerary Builder │ │
│  │ Filter    │  │ View      │  │ + 3D Map          │ │
│  └──────────┘  └──────────┘  └───────────────────┘ │
│       │              │               │               │
│       └──────────────┼───────────────┘               │
│                      │                               │
│              ┌───────▼───────┐                       │
│              │  Zustand Store │                       │
│              │  (lib/store)   │                       │
│              └───────┬───────┘                       │
│                      │                               │
│         ┌────────────┼────────────┐                  │
│         │            │            │                  │
│    ┌────▼───┐  ┌─────▼────┐ ┌────▼──────┐          │
│    │ data.ts│  │ engine.ts│ │ export.ts  │          │
│    │ (POIs) │  │ (local)  │ │ (PDF/share)│          │
│    └────────┘  └──────────┘ └───────────┘           │
│                      │                               │
│              ┌───────▼───────┐                       │
│              │  API Routes    │                       │
│              │  /api/itinerary│                       │
│              └───────┬───────┘                       │
│                      │                               │
│              ┌───────▼───────┐                       │
│              │  OpenAI GPT-4  │  (optional)          │
│              └───────────────┘                       │
└─────────────────────────────────────────────────────┘
```

---

## File-by-File Reference

### Core Types — `lib/types.ts`

All shared TypeScript interfaces live here. **Always extend types here first** before using them in components.

Key types:
- `Destination` — A travel destination with POIs, coordinates, budget fit, and trip details
- `POI` — A point of interest with real GPS coordinates and metadata
- `Activity` — A single itinerary activity (generated from POIs)
- `DayPlan` — A day's worth of activities with a theme
- `Itinerary` — The complete trip plan with budget breakdown
- `UserPreferences` — Budget, days, trip type, categories
- `BudgetFit` / `DayFit` / `TripType` / `TripCategory` — Union string types

### State Management — `lib/store.ts`

Single Zustand store managing all app state. No context providers needed.

```typescript
import { useTravelStore } from '@/lib/store'

// In any component:
const { budgetValue, tripDays, currentStep, goToNextStep } = useTravelStore()
```

**State flow:**
1. Phase 1 sets `budgetValue`, `tripDays`, `tripType`, `selectedCategories`
2. Phase 2 reads preferences, user selects `selectedDestination`
3. Phase 3 generates `itinerary` and `days`, user edits via `setDays()`

**Transitions:**
- `goToNextStep()` — Sets `isTransitioning: true`, waits 800ms, advances `currentStep`
- `goToPreviousStep()` — Same pattern, decrements step
- `reset()` — Returns all state to initial values

### Destination Data — `lib/data.ts`

Exports:
- `budgetTiers` — Array of 4 `BudgetTier` objects (Weekend Escape / Short Adventure / Extended Explorer / Premium Experience)
- `destinations` — Array of `Destination` objects with real Indian locations and POIs (6-12 POIs each with GPS coordinates)
- `getDayFitColor()` — Calculates day fit (comfortable/moderate/tight) with associated color (green/yellow/orange) for a destination given selected days
- `filterByBudget()` — Filters destinations where estimatedCost ≤ budget
- `filterByTripType()` — Filters destinations by `bestFor` compatibility
- `sortByPopularity()` — Sorts destinations by popularity score (descending)

### Itinerary Engine — `lib/itinerary-engine.ts`

Generates itineraries **locally** without any API call. Used as fallback when OpenAI is not configured.

**Pipeline:**
1. `generateItinerary(destination, preferences)` — Main entry point
2. `prioritizePOIs(pois, tripType)` — Sorts POIs by relevance to trip type
3. `allocatePOIsForDay(pois, dayNum, totalDays, budget)` — Selects POIs for a specific day
4. `getDayThemes(numDays)` — Generates thematic names for each day
5. `computeBudgetBreakdown(days)` — Calculates per-category totals

### Export Utilities — `lib/export.ts`

- `exportToPDF(destination, days, budget, breakdown)` — Opens a print-ready HTML document
- `shareItinerary(destination, days, budget)` — Copies structured text to clipboard

Both use browser-native APIs (no external PDF library).

---

## Component Architecture

### `BudgetFilter.tsx` — Phase 1

**Responsibilities:**
- Render cinematic cloud-to-city descent with live Mapbox 3D city background
- Detect user geolocation for personalized city view (fallback: Hyderabad)
- Multi-layer cloud dissolve animation (3 drifting cloud masses + bottom haze)
- Animated "Where Journeys Begin" title reveal with staggered entrance
- Camera drift animation during cloud dissolve (zoom 14→15.5, pitch 45→55)
- Budget slider (₹3,000–₹2,00,000) with dynamic tier label
- Day selection buttons (2, 3, 4, 5, 7, 10, 14)
- Trip type selection (4 icon buttons: Solo/Couple/Friends/Family)
- Category toggles (Nature/Culture/Adventure/Relaxation)
- Trip summary chip displaying selections
- CTA button to advance to Phase 2 with map zoom-out transition

**Key patterns:**
- Inline CSS transitions for cloud opacity (avoids CSS animation override conflicts)
- Separate cloud-drift CSS animations for transform only
- Framer Motion `AnimatePresence` for sub-phase transitions (budget ↔ preferences)
- Zustand store for all preference state
- Glass panel styling with backdrop-blur
- useRef for Mapbox map instance + safe cleanup on unmount

### `MapView.tsx` — Phase 2

**Responsibilities:**
- Initialize Mapbox map with mercator projection centered on India
- Create GeoJSON-based circle layers for pins (never drift on zoom/pan)
- Add invisible HTML hit-target markers for hover/click interactivity
- Color-code pins by day-fit (green/yellow/orange)
- Size pins by popularity score
- Pin hover: increase radius + glow via `setPaintProperty`
- Show floating hover tooltip at bottom-center with destination details
- Handle pin click → flyTo + destination detail modal
- Display top bar with destination count, filter toggle, and progress dots
- Collapsible category filter panel
- Budget and duration info chips
- Interactive legend (day-fit color meanings)
- Empty state when no destinations match filters

**Key patterns:**
- Native Mapbox GeoJSON `circle` layers for drift-free pins
- `useMemo` for filtered destinations (re-filters on preference changes)
- DOM-based transparent hit-target markers for hover/click events
- No `scale` in Framer Motion transitions (breaks Mapbox coordinate mapping)
- `resize()` calls after animation completes to fix canvas sizing

### `ItineraryBuilder.tsx` — Phase 3

**Responsibilities:**
- Generate itinerary (API call with OpenAI GPT-4o-mini, or local engine fallback)
- Render staggered loading state with themed loading messages
- Render day tabs with activity counts, add/remove day controls
- Render draggable activity cards with @dnd-kit
- Activity cards show: type icon, time, title, description, cost, duration, confidence badge, tips
- Initialize 3D Mapbox map with building extrusions (55° pitch, -15° bearing)
- Place numbered activity markers (day + index) with active/inactive styling
- Draw gold route lines between activities (solid for active day, dashed for inactive)
- Auto-focus map bounds on active day's activities
- Show budget breakdown panel with stacked color bar and category grid
- Animated budget usage bar with over-budget warning
- PDF export and share buttons (top bar + bottom bar)
- Handle activity deletion
- Handle same-day reorder and cross-day drag-and-drop
- "Re-optimizing route..." indicator after each drag
- Day overlay and quick-nav buttons on the 3D map

**Key patterns:**
- `DndContext` + `SortableContext` from @dnd-kit for drag-and-drop
- `closestCenter` collision detection
- Polling-based map initialization (waits for DOM container to appear)
- `ResizeObserver` to keep map in sync with container size changes
- Two-layer marker design: outer div (Mapbox positioning) + inner div (safe to scale)
- Separate `useEffect` hooks for generation, map init, and markers/routes
- Activity reordering updates both `days` state and map visualization
- `calculateBudgetBreakdown()` from itinerary engine for cost tracking

---

## API Routes

### `POST /api/itinerary/generate`

**Request body:**
```json
{
  "destination_id": "manali",
  "budget": 50000,
  "duration_days": 5,
  "trip_type": "friends",
  "user_preferences": ["nature", "adventure"]
}
```

**Behavior:**
1. If `OPENAI_API_KEY` is set and valid → calls OpenAI GPT-4o-mini with structured JSON prompt
2. If not, or if AI call fails → returns `{ useLocalEngine: true }` signal for client-side fallback to `generateItinerary()` from `lib/itinerary-engine.ts`

**AI model:** `gpt-4o-mini` with `response_format: { type: 'json_object' }`

**Response:** `Itinerary` object with `days[]`, each containing `nodes[]` with real locations, costs, and tips

### `POST /api/itinerary/optimize`

**Request body:**
```json
{
  "days": [...],
  "modified_node_id": "d1_n2",
  "action": "reordered"
}
```

**Behavior:**
1. If `OPENAI_API_KEY` is set → sends to OpenAI for timing suggestions
2. Otherwise → returns generic optimization feedback

**Response:** `{ suggestions: string[], warnings: string[] }`

---

## Data Flow Diagram

```
User configures preferences
        │
        ▼
┌─────────────────┐
│  Zustand Store   │  ← budgetValue, tripDays, tripType, categories
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  data.ts filter  │  ← getFilteredDestinations(budget, type, categories)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  MapView pins    │  ← Filtered destinations rendered as markers
└────────┬────────┘
         │  User clicks destination
         ▼
┌─────────────────┐
│  API / Engine    │  ← generateItinerary(destination, preferences)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ItineraryBuilder│  ← days[], budgetBreakdown rendered as timeline + 3D map
└────────┬────────┘
         │  User drags/deletes/exports
         ▼
┌─────────────────┐
│  Store / Export  │  ← setDays(), exportToPDF(), shareItinerary()
└─────────────────┘
```

---

## Extending the App

### Adding a New Destination

In `lib/data.ts`, add to the `destinations` array:

```typescript
{
  id: 'your-destination-id',
  name: 'Destination Name',
  state: 'State Name',
  location: { lat: 12.3456, lng: 78.9012 },
  budgetFit: 'perfect',  // 'perfect' | 'stretch' | 'luxury'
  tripDetails: {
    minDays: 2,
    maxDays: 5,
    estimatedCost: 15000,
    highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
    category: 'nature',   // 'nature' | 'culture' | 'adventure' | 'relaxation'
    bestFor: ['couple', 'friends'],
  },
  imageUrl: '/images/destination.jpg',
  popularityScore: 85,
  pois: [
    {
      id: 'poi-1',
      name: 'POI Name',
      location: { lat: 12.3457, lng: 78.9013 },
      type: 'sight',  // 'transport' | 'accommodation' | 'food' | 'sight' | 'activity'
      description: 'Description text',
      estimatedCost: 500,
      estimatedDuration: 120,  // minutes
      rating: 4.5,
      tips: ['Tip 1', 'Tip 2'],
      bestTime: 'Morning',
    },
    // ... more POIs (aim for 8-12 per destination)
  ],
}
```

### Adding a New Trip Type

1. Add to `TripType` union in `lib/types.ts`
2. Add prioritization rules in `lib/itinerary-engine.ts` → `prioritizePOIs()`
3. Add icon and label in `components/BudgetFilter.tsx`
4. Add `bestFor` tag to relevant destinations in `lib/data.ts`

### Adding a New Budget Tier

1. Add to `budgetTiers` array in `lib/data.ts`
2. Update `BudgetTier` interface if new fields are needed
3. Update `BudgetFilter.tsx` to handle the new tier card

### Connecting a Real Database

1. Install Prisma: `npm install prisma @prisma/client`
2. Create schema matching `Destination` and `POI` types
3. Replace `destinations` array in `data.ts` with Prisma queries
4. Add `DATABASE_URL` to `.env.local`

---

## Performance Notes

- **Map rendering**: Uses DOM markers (not WebGL symbols) for rich HTML; limit to ~50 visible pins
- **Bundle size**: Main page is ~518 KB (includes Mapbox GL JS); could be reduced with dynamic imports
- **3D buildings**: Only rendered at zoom 14+; Mapbox handles LOD automatically
- **Drag-and-drop**: Uses @dnd-kit's optimized reordering algorithms
- **State updates**: Zustand provides O(1) subscription-based re-renders

---

## Environment Variables

| Variable | Scope | Required | Default Behavior |
|----------|-------|----------|-----------------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Client | **Yes** | Map won't render without it |
| `OPENAI_API_KEY` | Server | No | Falls back to local engine |
| `DATABASE_URL` | Server | No | Uses hardcoded data |

---

*Last updated: February 2026*
