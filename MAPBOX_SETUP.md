# 🗺️ Mapbox Setup Guide for Velosta

> Velosta uses Mapbox GL JS for both the interactive globe (Phase 2) and the 3D itinerary map (Phase 3). This guide gets your map running in under 2 minutes.

---

## Step 1: Get Your Free Mapbox Token

1. Go to **https://account.mapbox.com/access-tokens/**
2. Click **"Sign Up"** — it's free, no credit card required
3. After signup, you'll see your **Default public token**
4. Copy the token (it starts with `pk.`)

---

## Step 2: Add Token to Your Project

Open `.env.local` in the project root and set your token:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_actual_token_here
```

If `.env.local` doesn't exist yet:

```bash
cp .env.local.example .env.local
```

Then paste your token.

---

## Step 3: Restart the Dev Server

```bash
# Stop the running server (Ctrl+C), then:
npm run dev
```

---

## Step 4: See It in Action ✨

1. Open **http://localhost:3000** in your browser
2. Configure your trip preferences (type, days, budget, categories)
3. Click **"Explore Destinations"**

**Phase 2 — Globe View:**
- Interactive globe centered on India
- Color-coded pins: 🟢 Perfect fit, 🟡 Stretch, 🔵 Luxury
- Hover for destination tooltips
- Click a pin to select the destination

**Phase 3 — 3D Itinerary Map:**
- Bird's-eye 3D view with building extrusions
- Activity markers placed at real POI coordinates
- Gold route lines connecting your itinerary
- Pitch and rotation for cinematic city views

---

## How Velosta Uses Mapbox

| Feature | Map Mode | Details |
|---------|----------|---------|
| **Globe exploration** | `globe` projection | Shows all destinations on a rotatable 3D globe |
| **Itinerary builder** | `mercator` with 3D | 60° pitch, building extrusions, activity markers |
| **Pin system** | Custom markers | DOM-based pins with color coding and tooltips |
| **Route lines** | GeoJSON layers | Gold curved lines connecting activities in order |
| **Map style** | `light-v11` | Clean light style matching Velosta's warm aesthetic |

---

## Free Tier Limits

Mapbox's free tier is generous:

| Resource | Free Limit | Enough For |
|----------|------------|------------|
| Map loads | 50,000/month | Development + small production |
| Geocoding | 100,000/month | Address lookups |
| Directions | 100,000/month | Route calculation |
| Static images | 50,000/month | Thumbnails |

No credit card required. Perfect for development and early production.

---

## Troubleshooting

### Map shows a blank area or error
- ✅ Verify token starts with `pk.`
- ✅ Check for extra spaces or quotes in `.env.local`
- ✅ Restart the dev server after changing `.env.local`
- ✅ Check browser console (F12) for specific Mapbox errors

### Map loads but no pins appear
- ✅ Make sure you selected a budget tier in Phase 1
- ✅ Check that destinations match your category filters
- ✅ Try resetting filters using the back button

### 3D buildings don't show in itinerary view
- ✅ 3D buildings require zoom level 14+ — the map auto-zooms when entering Phase 3
- ✅ Some areas may have limited 3D building data in Mapbox

### Token-related errors
- ✅ Ensure the token has **default public scopes** enabled
- ✅ Check that the token hasn't been revoked in your Mapbox dashboard
- ✅ Try generating a new token if issues persist

---

## Customizing the Map Style

The map style is set in `components/MapView.tsx` and `components/ItineraryBuilder.tsx`:

```typescript
style: 'mapbox://styles/mapbox/light-v11'
```

Other available styles:
- `streets-v12` — Detailed street map
- `outdoors-v12` — Terrain-focused for nature trips
- `satellite-v9` — Satellite imagery
- `dark-v11` — Dark theme variant

You can also create a custom style at [Mapbox Studio](https://studio.mapbox.com/) to match your brand.

---

**That's it! Your maps should be working now. 🎉**
