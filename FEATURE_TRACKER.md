# Velosta — Feature Tracker

> Every feature, UI detail, interaction, and micro-animation — tracked down to the pixel.  
> Use this as the single source of truth for what's been built, what's in progress, and what's planned.

---

## Table of Contents

1. [Phase 1 — Cinematic Intro & Preferences](#phase-1--cinematic-intro--preferences)
2. [Phase 2 — Globe Exploration & Map](#phase-2--globe-exploration--map)
3. [Phase 3 — Itinerary Builder & 3D Map](#phase-3--itinerary-builder--3d-map)
4. [Phase Transitions & Navigation](#phase-transitions--navigation)
5. [Design System](#design-system)
6. [Data & Backend](#data--backend)
7. [Export & Sharing](#export--sharing)
8. [Mobile Responsive](#mobile-responsive)
9. [Future Roadmap](#future-roadmap)

---

## Phase 1 — Cinematic Intro & Preferences

**Component:** `components/BudgetFilter.tsx`

### Background & Atmosphere

| Feature | Status | Details |
|---------|--------|---------|
| Live Mapbox city background | ✅ Done | 3D bird's-eye map of user's city (or Hyderabad default) behind glass panel |
| Geolocation detection | ✅ Done | Uses `navigator.geolocation` to center map on user's actual city |
| Geolocation fallback | ✅ Done | Falls back to Hyderabad (17.385, 78.4867) if denied/timeout (3s) |
| 3D building extrusion on background | ✅ Done | `fill-extrusion` layer with warm beige `#E8DFD2` at 60% opacity |
| Warm fog atmosphere | ✅ Done | Mapbox fog: ivory/beige, no stars, subtle horizon blend |
| Soft tint overlay on map | ✅ Done | 1.5px blur + faint ivory gradient after clouds dissolve |
| Golden glow orb (top-right) | ✅ Done | 600px radial gradient, gold at 12% opacity, appears after clouds |
| Warm glow orb (bottom-left) | ✅ Done | 400px radial gradient, terracotta at 8% opacity, appears after clouds |
| Gradient fallback (no Mapbox token) | ✅ Done | `linear-gradient(135deg, #F6F3EE, #E8DFD2, #D8C7B3)` |

### Cloud-to-City Descent Animation

| Feature | Status | Details |
|---------|--------|---------|
| Multi-layer cloud overlay | ✅ Done | 3 drifting cloud masses + bottom haze, all white/warm radial gradients |
| Cloud mass 1 (slow drift) | ✅ Done | 5 large radial gradients, `cloud-drift-slow` animation (22s cycle) |
| Cloud mass 2 (mid drift) | ✅ Done | 5 mid-size wisps, `cloud-drift-mid` animation (16s cycle) |
| Cloud mass 3 (fast thin wisps) | ✅ Done | 4 thin warm wisps, `cloud-drift-fast` animation (11s cycle) |
| Bottom haze layer | ✅ Done | White gradient from bottom — "breaking through clouds" feel |
| Cloud opacity dissolve | ✅ Done | Inline CSS transition: opacity 1→0 over 3s (cubic-bezier) |
| Cloud descent transform | ✅ Done | `translateY(0)→translateY(40px)` + `scale(1)→scale(1.03)` over 4s |
| Camera drift during dissolve | ✅ Done | Mapbox `flyTo`: zoom 14→15.5, pitch 45→55, bearing -10→-25, 6s duration |
| No CSS animation class for opacity | ✅ Done | Opacity is controlled ONLY by inline React styles to avoid override conflicts |

### Title Reveal — "Where Journeys Begin"

| Feature | Status | Details |
|---------|--------|---------|
| "VELOSTA" brand text | ✅ Done | `tracking-[0.4em]` uppercase, sandstone color, text-shadow for readability |
| "Where Journeys Begin" heading | ✅ Done | `text-5xl md:text-6xl`, Playfair Display, charcoal, fade in + slide up |
| Gold divider line | ✅ Done | 2px height, animates width from 0→56px at 1.2s delay |
| Staggered entrance animation | ✅ Done | Brand at 0.3s, heading at 0.6s, divider at 1.2s |
| Auto-advance to budget panel | ✅ Done | Exits at ~4.8s (with Mapbox) or ~3.5s (without) — `opacity:0, y:-40, scale:0.92` |
| Text shadow for legibility | ✅ Done | White text-shadow glow so text reads over any map background |

### Budget Sub-Phase

| Feature | Status | Details |
|---------|--------|---------|
| Glass panel container | ✅ Done | `glass-panel rounded-3xl p-8 md:p-10 max-w-xl`, frosted glass with backdrop-blur(20px) |
| "VELOSTA" brand header | ✅ Done | `text-xs tracking-[0.3em]` uppercase, sandstone |
| "Start Your Journey" title | ✅ Done | `text-3xl md:text-4xl` Playfair Display, charcoal |
| Gold divider under title | ✅ Done | 40px wide, 2px height, `bg-gold` |
| Budget range slider | ✅ Done | Custom styled: sandstone→gold gradient track, 24px gold thumb, ₹3,000–₹2,00,000 |
| Budget value display | ✅ Done | `text-4xl md:text-5xl` Playfair Display, bold, animates on change (fade+slide) |
| Dynamic tier label | ✅ Done | Updates based on value: "Weekend Escape" / "Short Adventure" / "Extended Explorer" / "Premium Experience" |
| Tier label animation | ✅ Done | `text-xs text-gold`, fades in on change |
| Slider range labels | ✅ Done | "₹3,000" left, "₹2,00,000" right, `text-xs text-charcoal-light/50` |
| Slider thumb hover scale | ✅ Done | `transform: scale(1.15)` on hover via CSS |
| Day selection buttons | ✅ Done | Options: 2, 3, 4, 5, 7, 10, 14 |
| Day button — selected state | ✅ Done | `bg-charcoal text-warm-white shadow-md` |
| Day button — unselected state | ✅ Done | `bg-beige/60 text-charcoal-light hover:bg-sandstone/30` |
| Day button sizing | ✅ Done | `px-3 py-1.5 rounded-lg text-sm font-medium` |
| "Next" CTA button | ✅ Done | Terracotta→gold gradient, `py-3.5 rounded-xl`, white text, `boxShadow: 0 4px 20px` |
| CTA hover/tap animations | ✅ Done | Framer Motion: `whileHover: scale 1.02, y: -1`, `whileTap: scale 0.98` |
| Progress dots (3 total) | ✅ Done | 2px rounded circles; active = `bg-terracotta`, inactive = `bg-sandstone/40` |
| Panel slide-in animation | ✅ Done | `opacity:0, y:40` → `opacity:1, y:0` over 0.9s with 0.1s delay |

### Preferences Sub-Phase

| Feature | Status | Details |
|---------|--------|---------|
| Slide transition from budget | ✅ Done | AnimatePresence: old exits `x:-20`, new enters `x:20`, 0.4s |
| Trip type selector | ✅ Done | 4-column grid: Solo (User icon), Couple (Heart), Friends (Users), Family (Home) |
| Trip type — selected state | ✅ Done | `bg-charcoal text-warm-white shadow-md` |
| Trip type — unselected state | ✅ Done | `bg-beige/50 text-charcoal-light hover:bg-sandstone/30` |
| Trip type icons | ✅ Done | Lucide React icons (User, Heart, Users, HomeIcon) at `w-5 h-5` |
| Category toggle pills | ✅ Done | Nature (Mountain), Culture (Landmark), Adventure (Compass), Relaxation (Palmtree) |
| Category — selected state | ✅ Done | `bg-gold/20 text-charcoal border-gold/40` |
| Category — unselected state | ✅ Done | `bg-beige/40 text-charcoal-light/70 border-transparent hover:border-sandstone/40` |
| Category pills layout | ✅ Done | `flex-wrap justify-center gap-2`, `px-4 py-2 rounded-full text-sm` |
| "(optional)" label on categories | ✅ Done | `text-charcoal-light/40` next to "What excites you?" |
| Trip summary chip | ✅ Done | Glass panel showing "₹50,000 · 5 days · Friends" |
| Summary chip detail | ✅ Done | Label `text-xs text-charcoal-light/50`, value `text-sm font-medium text-charcoal` |
| "Back" button | ✅ Done | Bordered, `border-sandstone/40 hover:border-terracotta/50` |
| "Explore Destinations" CTA | ✅ Done | Same gradient as "Next", `flex-1`, full gradient styling |
| Progress dots update | ✅ Done | Dot 2 = terracotta when on preferences sub-phase |
| Map zoom-out on explore | ✅ Done | `flyTo: zoom 4, pitch 0, bearing 0, duration 1200ms` |

---

## Phase 2 — Globe Exploration & Map

**Component:** `components/MapView.tsx`

### Map Configuration

| Feature | Status | Details |
|---------|--------|---------|
| Mapbox initialization | ✅ Done | `mapbox://styles/mapbox/light-v11` |
| Map center | ✅ Done | India center: `[78.9629, 22.5937]` |
| Initial zoom level | ✅ Done | 4.2 |
| Map projection | ✅ Done | `mercator` (stable pin placement — avoids drift on zoom) |
| Warm fog/atmosphere | ✅ Done | Ivory/beige colors, no stars, subtle horizon blend |
| Navigation control | ✅ Done | Bottom-right: compass + zoom + pitch, custom styled (rounded-12px, sandstone border) |
| Map resize handling | ✅ Done | `resize()` after load + 200ms timeout + 900ms after animation |
| Error state display | ✅ Done | Red alert box if Mapbox fails, centered on screen |
| Missing token error | ✅ Done | Shows "Mapbox token is missing!" message |

### Pin System (GeoJSON Layers)

| Feature | Status | Details |
|---------|--------|---------|
| GeoJSON-based pins | ✅ Done | Native Mapbox `circle` layers — pins never drift on zoom/pan |
| Pin glow layer | ✅ Done | `circle-blur: 0.8`, 25% opacity, matches pin color |
| White border layer | ✅ Done | Size = pin size + 2, solid white |
| Main pin circle layer | ✅ Done | Solid fill, size based on popularity score |
| Pin sizing by popularity | ✅ Done | Score >90 → 10px, >85 → 8px, others → 7px |
| Pin color by day-fit | ✅ Done | Green `#22c55e` (comfortable), Yellow `#eab308` (moderate), Orange `#f97316` (tight) |
| Invisible HTML hit-targets | ✅ Done | 32px transparent circular markers for hover/click interactivity |
| Pin hover — size increase | ✅ Done | Hovered pin: +3px radius via `setPaintProperty` |
| Pin hover — glow increase | ✅ Done | Glow expands +8px, opacity 0.25→0.45 |
| Pin hover — reset on leave | ✅ Done | Sizes and glow reset to defaults with 50ms delay |
| Pin click — fly to location | ✅ Done | `flyTo: zoom 9, duration 2000ms, curve 1.5, ease-in-out` |
| Pin click — opens detail modal | ✅ Done | Sets `selectedCard` state → modal appears |
| Dynamic filter updates | ✅ Done | Pins rebuild when budget/tripType/categories change via `useMemo` |
| Old pins cleanup | ✅ Done | Removes old layers, sources, and markers before rebuilding |

### Destination Filtering

| Feature | Status | Details |
|---------|--------|---------|
| Filter by budget | ✅ Done | `filterByBudget(budgetValue)` — destinations with `estimatedCost ≤ budget` |
| Filter by trip type | ✅ Done | `filterByTripType(dests, tripType)` — destinations matching `bestFor` array |
| Filter by categories | ✅ Done | Intersection filter on `tripDetails.category` |
| Real-time filter updates | ✅ Done | `useMemo` dependency on `[budgetValue, tripType, selectedCategories]` |

### Top Bar

| Feature | Status | Details |
|---------|--------|---------|
| Glass panel top bar | ✅ Done | Full-width, `glass-panel p-4 z-10`, slides in from top (delay 0.3s) |
| Back button (← Back) | ✅ Done | ArrowLeft icon + "Back" label (hidden on mobile via `hidden sm:inline`) |
| Destination count | ✅ Done | `"12 Destinations"` — `text-lg font-serif font-semibold` |
| Budget/days subtext | ✅ Done | `"within ₹50,000 · 5 days"` — `text-xs text-charcoal-light/60` |
| Filter toggle button | ✅ Done | Filter icon, toggles `showFilters` state, active = `bg-charcoal text-warm-white` |
| Progress dots | ✅ Done | 3 dots, dot 2 = `bg-terracotta` (active) |

### Collapsible Filter Panel

| Feature | Status | Details |
|---------|--------|---------|
| Animated collapse/expand | ✅ Done | `AnimatePresence` with height 0→auto, opacity, y offset, 0.3s |
| Category filter pills | ✅ Done | Same 4 categories (Nature/Culture/Adventure/Relaxation) |
| Selected state | ✅ Done | `bg-charcoal text-warm-white` |
| Unselected state | ✅ Done | `bg-beige/60 text-charcoal-light hover:bg-sandstone/30` |

### Budget & Duration Info Chips

| Feature | Status | Details |
|---------|--------|---------|
| Budget chip (top-left) | ✅ Done | Glass panel, shows "Budget" label + "₹50,000" value (Playfair Display) |
| Duration chip (top-right) | ✅ Done | Glass panel, shows "Duration" label + "5 Days" value |
| Slide-in animation | ✅ Done | Left chip: `x:-20→0` (delay 0.5s), right chip: `x:20→0` (delay 0.6s) |

### Hover Tooltip

| Feature | Status | Details |
|---------|--------|---------|
| Floating glass panel at bottom-center | ✅ Done | `bottom-24 left-1/2 -translate-x-1/2`, min-width 300px, max-width 360px |
| Colored dot matching pin color | ✅ Done | 12px circle with matching box-shadow glow |
| Destination name (serif) | ✅ Done | `font-serif font-semibold text-lg text-charcoal` |
| Category badge | ✅ Done | Icon + capitalized label in `rounded-full bg-beige/60` pill |
| State name | ✅ Done | `text-xs text-charcoal-light/50` |
| Days range | ✅ Done | Calendar icon + "3-5 days" |
| Estimated cost | ✅ Done | IndianRupee icon + formatted value |
| Day-fit badge | ✅ Done | Colored background + Clock icon + "{X} days — {Comfortable/Hectic/Tight}" |
| Highlights (3 items) | ✅ Done | Gold checkmarks ("✓") + highlight text |
| Entrance animation | ✅ Done | `opacity:0, y:10` → `opacity:1, y:0`, 200ms |
| Non-interactive | ✅ Done | `pointer-events-none` so tooltip doesn't block map interaction |

### Destination Detail Modal

| Feature | Status | Details |
|---------|--------|---------|
| Overlay backdrop | ✅ Done | `bg-charcoal/30 backdrop-blur-sm`, click to dismiss |
| Modal card | ✅ Done | Glass panel, `rounded-3xl p-8 md:p-10 max-w-lg` |
| Slide-up entrance | ✅ Done | `y:40→0, scale:0.95→1`, 0.4s ease |
| Destination name | ✅ Done | `text-3xl font-serif font-bold` |
| State name | ✅ Done | `text-sm text-charcoal-light/50` |
| Stats row | ✅ Done | Calendar + days, IndianRupee + cost, Star + popularity% |
| Close button (✕) | ✅ Done | Top-right, `text-charcoal-light/40 hover:text-charcoal` |
| Day-fit badge | ✅ Done | Colored background, Clock icon, "{X} days available — {label}" |
| Highlights section | ✅ Done | "HIGHLIGHTS" uppercase header + gold checkmarks |
| Top POIs preview | ✅ Done | "TOP PLACES" header + first 4 POIs in beige pills with MapPin icon |
| Best-for tags | ✅ Done | `rounded-full` pills, matching trip type gets gold highlight |
| "Other Options" button | ✅ Done | Bordered, resets map view (`flyTo` India center) |
| "Build Itinerary →" button | ✅ Done | Terracotta→gold gradient, triggers Phase 3 |

### Legend

| Feature | Status | Details |
|---------|--------|---------|
| Bottom-left glass panel | ✅ Done | `rounded-2xl p-4`, slides in from bottom (delay 0.8s) |
| "DAY COMPATIBILITY" header | ✅ Done | `text-xs tracking-wide uppercase` |
| 3 color indicators | ✅ Done | Green = Comfortable, Yellow = Slightly hectic, Orange = Too tight |
| Colored dots | ✅ Done | `w-3 h-3 rounded-full border-2 border-warm-white` |

### Empty State

| Feature | Status | Details |
|---------|--------|---------|
| Centered glass panel | ✅ Done | Shows when `filteredDestinations.length === 0 && mapLoaded` |
| Sad emoji | ✅ Done | "😔" + "No trips found" heading |
| Help text | ✅ Done | "Try adjusting your budget, days, or filters" |
| "Adjust Preferences" button | ✅ Done | Terracotta→gold gradient, returns to Phase 1 |

---

## Phase 3 — Itinerary Builder & 3D Map

**Component:** `components/ItineraryBuilder.tsx`

### Loading State

| Feature | Status | Details |
|---------|--------|---------|
| Full-screen centered loader | ✅ Done | `min-h-screen bg-ivory` |
| Spinning ring | ✅ Done | 64px circle, `border-sandstone/30 border-t-gold`, continuous 3s rotation |
| "Crafting your itinerary" heading | ✅ Done | `text-2xl font-serif font-semibold` |
| Destination name subtitle | ✅ Done | `text-sm text-charcoal-light/60` — "for {name}" |
| Budget/days subtitle | ✅ Done | `text-xs text-charcoal-light/40` — "₹50,000 · 5 days" |
| Staggered loading items | ✅ Done | 4 items appear 0.5s apart, each with spinning Loader2 icon |
| Loading item texts | ✅ Done | "Analyzing real traveler experiences", "Mapping points of interest", "Optimizing your schedule", "Building timeline" |

### AI Itinerary Generation

| Feature | Status | Details |
|---------|--------|---------|
| API call to `/api/itinerary/generate` | ✅ Done | POST with destination_id, budget, duration_days, trip_type, user_preferences |
| OpenAI GPT-4o-mini integration | ✅ Done | Calls OpenAI if `OPENAI_API_KEY` is set and valid |
| Structured JSON response format | ✅ Done | `response_format: { type: 'json_object' }` for reliable parsing |
| AI prompt engineering | ✅ Done | System prompt defines Indian travel expertise + strict JSON schema |
| Local engine fallback | ✅ Done | Falls back to `generateItinerary()` from `lib/itinerary-engine.ts` |
| AI response validation | ✅ Done | Checks for valid `days` array, ensures `location`, `nodeId`, `confidence` defaults |
| Graceful error handling | ✅ Done | Catches API errors, logs warning, uses local engine |

### Local Itinerary Engine (`lib/itinerary-engine.ts`)

| Feature | Status | Details |
|---------|--------|---------|
| POI prioritization by trip type | ✅ Done | Friends/solo → boost activities, family/couple → boost sights/food |
| Day allocation algorithm | ✅ Done | Distributes POIs across days, max 3 per day, respects daily budget (50%) |
| First day: arrival transport | ✅ Done | Auto-generates 6:00 AM arrival activity with 30% daily budget |
| First day: hotel check-in | ✅ Done | Uses accommodation POI if available, 35% daily budget |
| Daily meals | ✅ Done | Breakfast (non-first days) and dinner (non-last days) auto-generated |
| Last day: departure transport | ✅ Done | Auto-generates departure with 30% daily budget |
| Day theme generation | ✅ Done | Smart themes: "Arrival & First Impressions", "Nature & Culture", "Hidden Gems", etc. |
| Time slot assignment | ✅ Done | Realistic times with 30-min travel buffers between activities |
| Confidence scoring | ✅ Done | Based on POI rating (rating/5, capped at 0.98) |
| "Based on X travelers" | ✅ Done | `rating * 5` as experience count |
| Budget breakdown calculation | ✅ Done | Categories: accommodation, food, activities, transport, buffer (5% of total) |
| Random location offsets | ✅ Done | `offsetLocation()` for generated activities without specific POI coordinates |

### Top Bar

| Feature | Status | Details |
|---------|--------|---------|
| Glass panel header | ✅ Done | `glass-panel border-b border-sandstone/20 sticky top-0 z-20` |
| "← Map" back button | ✅ Done | ArrowLeft + "Map" label (hidden on mobile) |
| Destination name | ✅ Done | `text-lg font-serif font-semibold text-charcoal` |
| Subtitle | ✅ Done | `"{N} days · Drag to customize"` — `text-xs text-charcoal-light/50` |
| Share button | ✅ Done | Share2 icon, hover bg-beige/60 |
| Share feedback tooltip | ✅ Done | "Copied to clipboard!" in gold, fades after 2s, positioned below button |
| Export PDF button | ✅ Done | Download icon, hover bg-beige/60 |
| Progress dots | ✅ Done | 3 dots, dot 3 = `bg-terracotta` (active) |

### Split Panel Layout

| Feature | Status | Details |
|---------|--------|---------|
| Left panel width | ✅ Done | 38% on desktop (`md:w-[38%]`) |
| Right panel width | ✅ Done | 62% on desktop (`md:w-[62%]`) |
| Responsive stacking | ✅ Done | `flex-col md:flex-row` — stacked on mobile |
| Left panel max-height (mobile) | ✅ Done | `max-h-[50vh]` on mobile, scrollable |
| Border between panels | ✅ Done | `border-r border-sandstone/15` |

### Day Tabs

| Feature | Status | Details |
|---------|--------|---------|
| Horizontal scrollable tab bar | ✅ Done | `overflow-x-auto scrollbar-hide` |
| Active tab style | ✅ Done | `bg-charcoal text-warm-white shadow-sm` |
| Inactive tab style | ✅ Done | `text-charcoal-light/60 hover:bg-beige/60` |
| Activity count badge | ✅ Done | `(N)` in parentheses, `text-[9px] opacity-60` |
| Add day button (+) | ✅ Done | Plus icon, adds "Free Day" with empty nodes |
| Remove day button (🗑) | ✅ Done | Trash2 icon, only visible when >1 day exists |
| Remove day — auto-adjust active | ✅ Done | If active day is removed, adjusts to last available day |
| Tab bar stickiness | ✅ Done | `sticky top-0 z-10 glass-panel border-b border-sandstone/15` |

### Draggable Activity Cards

| Feature | Status | Details |
|---------|--------|---------|
| @dnd-kit integration | ✅ Done | `DndContext` + `SortableContext` + `useSortable` |
| Drag handle (GripVertical) | ✅ Done | Left side, `cursor-grab` → `cursor-grabbing`, `text-sandstone/30 hover:text-gold` |
| Left colored border by type | ✅ Done | 3px border: transport=#6366f1, accommodation=#C4734F, food=#22c55e, sight=#C9A96E, activity=#3b82f6 |
| Activity type icon badge | ✅ Done | Rounded-lg, background at 15% opacity of type color, icon in terracotta |
| Icons per type | ✅ Done | Bus, Home, UtensilsCrossed, Camera, MapPin (Lucide React) |
| Time display | ✅ Done | `text-[10px] text-charcoal-light/40 font-medium` |
| Title | ✅ Done | `text-sm font-semibold text-charcoal truncate` |
| Cost | ✅ Done | `text-xs font-semibold text-terracotta` right-aligned |
| Delete button (✕) | ✅ Done | X icon, `text-charcoal-light/20 hover:text-red-400`, 3px icon |
| Description | ✅ Done | `text-xs text-charcoal-light/50`, `line-clamp-1` |
| Duration | ✅ Done | `"Xh Ym"` format, `text-[10px] text-charcoal-light/40` |
| "✓ N travelers" confidence badge | ✅ Done | Sandstone pill, `text-[10px]` |
| Confidence bar | ✅ Done | Thin colored bar proportional to confidence score, max-w-[50px] |
| Tip display | ✅ Done | First tip shown below thin divider, preceded by 💡, `text-[10px]` |
| Card dragging state | ✅ Done | `opacity: 0.5, shadow-lg, ring-1 ring-gold/30` |
| Connector line between cards | ✅ Done | `w-[1px] h-3 bg-sandstone/25` centered |
| Same-day reorder | ✅ Done | `arrayMove` from @dnd-kit/sortable |
| Cross-day drag-and-drop | ✅ Done | Detects source/target day, moves node between day arrays |
| Drag activation distance | ✅ Done | `PointerSensor` with `distance: 8` to prevent accidental drags |
| Keyboard drag support | ✅ Done | `KeyboardSensor` with `sortableKeyboardCoordinates` |
| Collision detection | ✅ Done | `closestCenter` strategy |

### Empty Day State

| Feature | Status | Details |
|---------|--------|---------|
| Centered placeholder | ✅ Done | MapPin icon (faded) + "No activities yet" + "Drag activities here or add a new day" |
| Styling | ✅ Done | `text-center py-10 text-charcoal-light/40` |

### Bottom Summary Bar

| Feature | Status | Details |
|---------|--------|---------|
| Sticky positioning | ✅ Done | `sticky bottom-0 glass-panel border-t border-sandstone/15 p-3` |
| "Re-optimizing route..." indicator | ✅ Done | Gold text + spinning Loader2, appears for 600ms after any drag, AnimatePresence |
| "Estimated Total" label | ✅ Done | `text-xs text-charcoal-light/60` |
| Total cost display | ✅ Done | `text-lg font-serif font-bold text-charcoal` with ₹ formatting |
| Budget breakdown toggle | ✅ Done | BarChart3 / ChevronUp icon, toggles `showBreakdown` state |
| Budget usage bar | ✅ Done | 6px height, rounded-full, animated width from 0 |
| Bar gradient (normal) | ✅ Done | `linear-gradient(to right, #C4734F, #C9A96E)` |
| Bar gradient (>90% budget) | ✅ Done | Changes to `linear-gradient(to right, #f97316, #ef4444)` |
| Budget percentage text | ✅ Done | `"49% of ₹50,000 budget"` — `text-[10px] text-charcoal-light/40` |
| Over-budget warning | ✅ Done | `"⚠️ Over budget"` in `text-red-400` when >100% |
| Animated budget fill | ✅ Done | `initial: width 0`, `animate: width X%`, `delay: 0.3s, duration: 1s` |

### Budget Breakdown Chart

| Feature | Status | Details |
|---------|--------|---------|
| Expandable via toggle | ✅ Done | AnimatePresence with height 0→auto animation |
| Stacked horizontal bar | ✅ Done | All 5 categories proportionally in `h-3 rounded-full` |
| Category colors | ✅ Done | Stay=#C4734F, Food=#22c55e, Activities=#3b82f6, Transport=#6366f1, Buffer=#C9A96E |
| Category grid | ✅ Done | `grid-cols-3`, each: color dot + label + ₹amount |
| Zero-value filtering | ✅ Done | Items with value=0 hidden from grid |

### 3D Map (Right Panel)

| Feature | Status | Details |
|---------|--------|---------|
| Map style | ✅ Done | `mapbox://styles/mapbox/light-v11` |
| Center on destination | ✅ Done | `[dest.location.lng, dest.location.lat]` |
| Initial zoom | ✅ Done | 14 |
| Initial pitch | ✅ Done | 55° |
| Initial bearing | ✅ Done | -15° |
| 3D building extrusion layer | ✅ Done | `fill-extrusion`, color=#E8DFD2, opacity=0.5, height interpolated by zoom |
| Label layer insertion order | ✅ Done | 3D layer inserted below first symbol layer (labels stay on top) |
| Warm fog atmosphere | ✅ Done | Ivory/beige, no stars |
| Cinematic entry animation | ✅ Done | `flyTo` with zoom 14, pitch 55, bearing -15, 2000ms, curve 1.2 |
| Navigation controls | ✅ Done | Top-right: compass + zoom + pitch |
| Polling-based initialization | ✅ Done | Polls for DOM container up to 30 times (3s max) before init |
| ResizeObserver | ✅ Done | Keeps map in sync with container size changes |
| Map loading indicator | ✅ Done | Shows spinner + "Loading {name} city map..." until map is ready |

### Activity Markers on Map

| Feature | Status | Details |
|---------|--------|---------|
| Numbered circular markers | ✅ Done | Shows "D{day}" (7px) + activity index (11px) |
| Active day markers | ✅ Done | 34px, terracotta→gold gradient, 3px white border, strong shadow |
| Inactive day markers | ✅ Done | 26px, sandstone→gold gradient, 2px border, 50% opacity |
| Marker hover effect | ✅ Done | Inner element scales to 1.3x, enhanced box-shadow |
| Marker click switches day | ✅ Done | `setActiveDay(dayPlan.day)` |
| Markers update on day/drag change | ✅ Done | Full rebuild in `useEffect` with `[activeDay, days, selectedDestination, mapInitialized]` |
| Old markers cleanup | ✅ Done | `routeMarkers.current.forEach(m => m.remove())` before rebuild |
| Two-layer marker design | ✅ Done | Outer div (Mapbox positioning) + inner div (safe to scale/transform) |

### Route Lines

| Feature | Status | Details |
|---------|--------|---------|
| GeoJSON LineString per day | ✅ Done | Connects activity coordinates in order |
| Active day route | ✅ Done | Solid line, 4px width, 90% opacity |
| Inactive day routes | ✅ Done | Dashed line (2,2), 2px width, 40% opacity |
| Route colors | ✅ Done | Cycle: `#C9A96E`, `#D4B57E`, `#BF9D5E`, `#C4734F`, `#3b82f6` |
| Line-join & line-cap | ✅ Done | Both `round` |
| Routes update on drag | ✅ Done | Rebuilt every time `days` state changes |
| Old routes cleanup | ✅ Done | Removes old layers/sources before rebuilding |

### Map Auto-Focus

| Feature | Status | Details |
|---------|--------|---------|
| Fit bounds on day change | ✅ Done | `fitBounds` with 80px padding all sides |
| Max zoom limit | ✅ Done | 14 |
| Animation duration | ✅ Done | 1000ms |
| Pitch/bearing during focus | ✅ Done | pitch: 50, bearing: -15 |
| Single-activity days | ✅ Done | `flyTo` center at zoom 14 instead of `fitBounds` |

### Day Overlay & Quick Nav

| Feature | Status | Details |
|---------|--------|---------|
| Day/theme overlay (top-left) | ✅ Done | Glass panel, `"Day 2 · Hidden Gems Day"`, `text-xs`, slides in (delay 0.5s) |
| Day quick nav (bottom-center) | ✅ Done | Circular buttons, 32px |
| Active day button | ✅ Done | Terracotta→gold gradient, `shadow-lg` |
| Inactive day buttons | ✅ Done | `glass-panel text-charcoal-light/60` |

---

## Phase Transitions & Navigation

| Feature | Status | Details |
|---------|--------|---------|
| Transition overlay spinner | ✅ Done | Full-screen `bg-ivory/80 backdrop-blur-sm z-50`, 32px spinning ring |
| Phase 1→2 transition | ✅ Done | Panel fades+scales to 0.92 (600ms), overlay 800ms, Phase 2 fades in |
| Phase 2→3 transition | ✅ Done | Modal selects destination, 600ms delay, overlay 800ms, loading screen |
| Phase 3→2 (back) | ✅ Done | `goToPreviousStep()` — overlay 600ms, Phase 2 re-renders |
| Phase 2→1 (back) | ✅ Done | Same pattern, returns to preferences panel |
| No page reloads | ✅ Done | All phases in one React component tree via `AnimatePresence mode="wait"` |
| Framer Motion AnimatePresence | ✅ Done | `mode="wait"` ensures exit animation completes before enter |
| Zustand flow control | ✅ Done | `currentStep` (1/2/3), `isTransitioning`, `goToNextStep()`, `goToPreviousStep()` |
| Reset function | ✅ Done | `reset()` returns all state to initial values |

---

## Design System

### Color Palette (`globals.css` + `tailwind.config.js`)

| Token | Hex | CSS Variable | Tailwind Class | Status |
|-------|-----|-------------|----------------|--------|
| Ivory | `#F6F3EE` | `--ivory` | `bg-ivory` | ✅ Done |
| Sandstone | `#D8C7B3` | `--sandstone` | `bg-sandstone` | ✅ Done |
| Warm Beige | `#E8DFD2` | `--warm-beige` | `bg-beige` | ✅ Done |
| Terracotta | `#C4734F` | `--terracotta` | `text-terracotta` | ✅ Done |
| Soft Gold | `#C9A96E` | `--soft-gold` | `text-gold` | ✅ Done |
| Deep Charcoal | `#2C2C2C` | `--deep-charcoal` | `text-charcoal` | ✅ Done |
| Charcoal Light | `#4A4A4A` | `--charcoal-light` | `text-charcoal-light` | ✅ Done |
| Warm White | `#FDFCFA` | `--warm-white` | `bg-warm-white` | ✅ Done |

### Typography

| Element | Font | Weight | Class | Status |
|---------|------|--------|-------|--------|
| Page titles | Playfair Display | 600–700 | `font-serif text-5xl font-semibold` | ✅ Done |
| Section headers | Playfair Display | 500–600 | `font-serif text-lg font-semibold` | ✅ Done |
| Body text | Inter | 300–500 | `text-sm font-light` | ✅ Done |
| Labels | Inter | 500 | `text-xs font-medium` | ✅ Done |
| Micro text | Inter | 400 | `text-[10px]` | ✅ Done |

### Glass Panel

| Property | Value | Status |
|----------|-------|--------|
| Background | `rgba(253, 252, 250, 0.85)` | ✅ Done |
| Backdrop blur | `blur(20px)` / `blur(12px)` on mobile | ✅ Done |
| Border | `1px solid rgba(216, 199, 179, 0.3)` | ✅ Done |
| Box shadow | `0 8px 32px rgba(44, 44, 44, 0.08)` | ✅ Done |

### Gradient Buttons

| Property | Value | Status |
|----------|-------|--------|
| Background | `linear-gradient(135deg, #C4734F 0%, #C9A96E 100%)` | ✅ Done |
| Box shadow | `0 4px 20px rgba(196, 115, 79, 0.3)` | ✅ Done |
| Text color | `#FDFCFA` (warm-white) | ✅ Done |
| Hover | `scale(1.02), y: -1` | ✅ Done |
| Tap | `scale(0.98)` | ✅ Done |

### Animations

| Animation | Duration | Easing | Usage | Status |
|-----------|----------|--------|-------|--------|
| `gold-pulse` | 2.5s infinite | ease-in-out | Map pins (box-shadow) | ✅ Done |
| `pin-pulse` | 3s infinite | ease-in-out | Marker brightness/opacity | ✅ Done |
| `cloud-drift-slow` | 22s infinite | ease-in-out | Cloud layer 1 translate | ✅ Done |
| `cloud-drift-mid` | 16s infinite | ease-in-out | Cloud layer 2 translate | ✅ Done |
| `cloud-drift-fast` | 11s infinite | ease-in-out | Cloud layer 3 translate | ✅ Done |
| Phase transitions | 800ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Between phases | ✅ Done |
| Cloud descent | 3s opacity + 4s transform | cubic-bezier | Phase 1 intro | ✅ Done |
| Card entrance | 0.3–0.9s staggered | ease-out | Framer Motion variants | ✅ Done |
| Budget bar fill | 1s (0.3s delay) | default | Budget usage animation | ✅ Done |

### Custom Scrollbar

| Property | Value | Status |
|----------|-------|--------|
| Width | 5px | ✅ Done |
| Thumb | sandstone, 3px radius | ✅ Done |
| Hover | terracotta | ✅ Done |
| Hidden scrollbar for day tabs | `.scrollbar-hide` | ✅ Done |

### Budget Slider

| Property | Value | Status |
|----------|-------|--------|
| Track | sandstone→gold gradient, 4px height | ✅ Done |
| Thumb | 24px gold circle, 3px warm-white border | ✅ Done |
| Thumb shadow | `0 2px 8px rgba(201, 169, 110, 0.4)` | ✅ Done |
| Thumb hover | `scale(1.15)`, enhanced shadow | ✅ Done |
| Firefox support | `::-moz-range-thumb` | ✅ Done |

---

## Data & Backend

### Destination Data (`lib/data.ts`)

| Feature | Status | Details |
|---------|--------|---------|
| 4 budget tiers | ✅ Done | Weekend Escape, Short Adventure, Extended Explorer, Premium Experience |
| Real Indian destinations | ✅ Done | Multiple destinations with real GPS coordinates |
| POIs per destination | ✅ Done | 6-12 POIs each with real lat/lng, type, cost, duration, rating, tips |
| POI types covered | ✅ Done | transport, accommodation, food, sight, activity |
| Budget fit classification | ✅ Done | perfect / stretch / luxury |
| Trip type compatibility | ✅ Done | `bestFor` array per destination |
| Category tags | ✅ Done | nature / culture / adventure / relaxation |
| Popularity scores | ✅ Done | 0–100 scale, affects pin sizing |
| Day-fit calculation | ✅ Done | `getDayFitColor()` — comfortable/moderate/tight |
| Filter by budget | ✅ Done | `filterByBudget()` — estimatedCost ≤ budget |
| Filter by trip type | ✅ Done | `filterByTripType()` — matches bestFor array |
| Sort by popularity | ✅ Done | `sortByPopularity()` — descending score |

### API Routes

| Route | Method | Status | Details |
|-------|--------|--------|---------|
| `/api/itinerary/generate` | POST | ✅ Done | OpenAI GPT-4o-mini + local engine fallback |
| `/api/itinerary/optimize` | POST | ✅ Done | Re-optimization suggestions after drag-and-drop |

### State Management (`lib/store.ts`)

| Slice | Properties | Status |
|-------|-----------|--------|
| Preferences | `budgetValue`, `tripDays`, `tripType`, `selectedCategories` | ✅ Done |
| Map | `selectedDestination` | ✅ Done |
| Itinerary | `itinerary`, `days`, `activeDay` | ✅ Done |
| Flow control | `currentStep`, `isTransitioning`, `goToNextStep()`, `goToPreviousStep()`, `reset()` | ✅ Done |
| Helpers | `getUserPreferences()` | ✅ Done |

### Type System (`lib/types.ts`)

| Type | Status | Fields |
|------|--------|--------|
| `Coordinates` | ✅ Done | `lat`, `lng` |
| `BudgetTier` | ✅ Done | `id`, `label`, `range`, `description`, `icon`, `exampleDestinations`, `avgDuration` |
| `TripType` | ✅ Done | `'solo' \| 'couple' \| 'family' \| 'friends'` |
| `TripCategory` | ✅ Done | `'nature' \| 'culture' \| 'adventure' \| 'relaxation'` |
| `BudgetFit` | ✅ Done | `'perfect' \| 'stretch' \| 'luxury'` |
| `DayFit` | ✅ Done | `'comfortable' \| 'moderate' \| 'tight'` |
| `Destination` | ✅ Done | Full destination with POIs, tripDetails, location |
| `POI` | ✅ Done | `id`, `name`, `location`, `type`, `description`, `estimatedCost`, `estimatedDuration`, `rating`, `tips` |
| `Activity` | ✅ Done | `nodeId`, `type`, `time`, `title`, `description`, `duration`, `cost`, `icon`, `confidence`, `basedOnExperiences`, `tips`, `location` |
| `DayPlan` | ✅ Done | `day`, `theme`, `nodes: Activity[]` |
| `BudgetBreakdown` | ✅ Done | `accommodation`, `food`, `activities`, `transport`, `buffer` |
| `Itinerary` | ✅ Done | `itineraryId`, `destination`, `totalCost`, `days[]`, `budgetBreakdown` |
| `UserPreferences` | ✅ Done | `budget`, `days`, `tripType`, `categories` |

---

## Export & Sharing

### PDF Export (`lib/export.ts`)

| Feature | Status | Details |
|---------|--------|---------|
| Browser-native print | ✅ Done | Opens new window → `window.print()` |
| Popup blocker fallback | ✅ Done | Shows alert if popup blocked |
| Styled HTML document | ✅ Done | Full CSS with Playfair Display + Inter fonts |
| Header section | ✅ Done | "VELOSTA" brand + destination name + state/days/category |
| Summary cards | ✅ Done | Duration, Total Cost, Budget, Savings — 4 cards in flex row |
| Budget breakdown bar | ✅ Done | 5 categories with icons and amounts |
| Day-by-day timeline | ✅ Done | Day headers with cost, activity cards with time/icon/title/description/meta |
| Activity tips in PDF | ✅ Done | 💡 tips shown for activities that have them |
| Timeline connector lines | ✅ Done | Vertical sandstone lines between activities |
| Footer | ✅ Done | Generated date + "Velosta — Where Journeys Begin in Space" |
| Print media query | ✅ Done | Adjusted padding, page-break-inside: avoid |
| Font loading wait | ✅ Done | 500ms delay after `onload` before triggering print |

### Share to Clipboard

| Feature | Status | Details |
|---------|--------|---------|
| Structured text format | ✅ Done | Emoji headers, day sections, activity times, costs |
| Clipboard API | ✅ Done | `navigator.clipboard.writeText()` |
| Fallback copy method | ✅ Done | Creates textarea element, `document.execCommand('copy')` |
| Total cost included | ✅ Done | Calculated from all day nodes |
| Brand footer | ✅ Done | `"✨ Plan your trip at velosta.in"` |

---

## Mobile Responsive

### Breakpoints

| Breakpoint | Width | Status |
|-----------|-------|--------|
| Mobile | < 768px | ✅ Done |
| Desktop | ≥ 768px | ✅ Done |

### Phase 1 (Mobile)

| Adaptation | Status | Details |
|-----------|--------|---------|
| Glass panel margin | ✅ Done | `mx-4` (small horizontal margin) |
| Title sizing | ✅ Done | `text-3xl` instead of `text-4xl` |
| Budget value sizing | ✅ Done | `text-4xl` instead of `text-5xl` |
| Day buttons flex wrap | ✅ Done | Wrap naturally |
| Padding reduction | ✅ Done | `p-8` instead of `p-10` |

### Phase 2 (Mobile)

| Adaptation | Status | Details |
|-----------|--------|---------|
| "Back" label hidden | ✅ Done | `hidden sm:inline` |
| Info chips float over map | ✅ Done | Positioned absolutely |
| Modal padding | ✅ Done | `p-4` margin around card |
| Filter pills wrap | ✅ Done | `flex-wrap` |

### Phase 3 (Mobile)

| Adaptation | Status | Details |
|-----------|--------|---------|
| Stacked vertical layout | ✅ Done | `flex-col md:flex-row` |
| Timeline panel | ✅ Done | Full width, `max-h-[50vh]`, scrollable |
| Map panel | ✅ Done | Full width, `min-height: 300px` |
| "Map" back label hidden | ✅ Done | `hidden sm:inline` |
| Day tabs horizontal scroll | ✅ Done | `overflow-x-auto scrollbar-hide` |
| Glass panel blur reduction | ✅ Done | `backdrop-filter: blur(12px)` on mobile (performance) |

---

## Future Roadmap

### Phase 2: Data & AI Enhancement 🔮

| Feature | Status | Priority |
|---------|--------|----------|
| PostgreSQL + PostGIS database | 🔮 Planned | High |
| Destination data models in DB | 🔮 Planned | High |
| Admin panel for content management | 🔮 Planned | Medium |
| Traveler experience submission flow | 🔮 Planned | High |
| RAG-powered AI with real experience corpus | 🔮 Planned | High |
| Seasonal and weather-aware recommendations | 🔮 Planned | Medium |

### Phase 3: Booking & Commerce 🔮

| Feature | Status | Priority |
|---------|--------|----------|
| Payment gateway (Razorpay / Stripe) | 🔮 Planned | High |
| Hotel booking API integration | 🔮 Planned | High |
| Transport booking (IRCTC / RedBus) | 🔮 Planned | Medium |
| Confirmation emails and receipts | 🔮 Planned | Medium |

### Phase 4: User Accounts & Social 🔮

| Feature | Status | Priority |
|---------|--------|----------|
| NextAuth.js authentication | 🔮 Planned | High |
| Saved itineraries and favorites | 🔮 Planned | High |
| Public shareable itinerary links | 🔮 Planned | Medium |
| Collaborative group trip planning | 🔮 Planned | Medium |
| Community experience voting | 🔮 Planned | Low |

### Phase 5: Advanced Features 🔮

| Feature | Status | Priority |
|---------|--------|----------|
| Multi-destination chained trips | 🔮 Planned | Medium |
| Template itinerary library | 🔮 Planned | Medium |
| Analytics dashboard | 🔮 Planned | Low |
| Voice input and smart filters | 🔮 Planned | Low |
| Offline PWA support | 🔮 Planned | Low |
| Alternative suggestions panel | 🔮 Planned | Medium |
| Distance filter slider | 🔮 Planned | Low |
| Duration filter toggle | 🔮 Planned | Low |
| Destination search bar | 🔮 Planned | Medium |
| Confetti effect on budget selection | 🔮 Planned | Low |
| Custom activities (user-added) | 🔮 Planned | Medium |
| Figma/Sketch design files | 🔮 Planned | Low |
| Unit test coverage (>80%) | 🔮 Planned | Medium |
| E2E test suite | 🔮 Planned | Medium |
| Accessibility audit (WCAG 2.1 AA) | 🔮 Planned | Medium |
| Keyboard navigation for all interactions | 🔮 Planned | Medium |
| Screen reader ARIA labels | 🔮 Planned | Medium |
| Analytics event tracking | 🔮 Planned | Low |

---

## Tech Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.2.0 |
| Language | TypeScript (strict) | ^5.3.0 |
| Styling | Tailwind CSS + custom CSS tokens | ^3.4.0 |
| Animations | Framer Motion | ^11.0.0 |
| Maps | Mapbox GL JS | ^3.1.0 |
| Drag-and-Drop | @dnd-kit (core + sortable + utilities) | ^6.1.0 / ^8.0.0 / ^3.2.2 |
| State Management | Zustand | ^4.5.0 |
| Icons | Lucide React | ^0.344.0 |
| AI | OpenAI GPT-4o-mini (optional) | API |
| Export | Browser-native `window.print()` + Clipboard API | Native |

---

*Last updated: 25 February 2026*
