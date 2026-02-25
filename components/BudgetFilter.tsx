'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTravelStore } from '@/lib/store'
import { budgetTiers } from '@/lib/data'
import type { TripType, TripCategory } from '@/lib/types'
import { Users, Heart, Home as HomeIcon, User, Mountain, Landmark, Compass, Palmtree } from 'lucide-react'
import mapboxgl from 'mapbox-gl'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
mapboxgl.accessToken = MAPBOX_TOKEN || ''

const tripTypes: { id: TripType; label: string; icon: React.ReactNode; desc: string }[] = [
	{ id: 'solo', label: 'Solo', icon: <User className="w-5 h-5" />, desc: 'Just me' },
	{ id: 'couple', label: 'Couple', icon: <Heart className="w-5 h-5" />, desc: 'Romantic' },
	{ id: 'friends', label: 'Friends', icon: <Users className="w-5 h-5" />, desc: 'Group fun' },
	{ id: 'family', label: 'Family', icon: <HomeIcon className="w-5 h-5" />, desc: 'All ages' },
]

const categories: { id: TripCategory; label: string; icon: React.ReactNode }[] = [
	{ id: 'nature', label: 'Nature', icon: <Mountain className="w-4 h-4" /> },
	{ id: 'culture', label: 'Culture', icon: <Landmark className="w-4 h-4" /> },
	{ id: 'adventure', label: 'Adventure', icon: <Compass className="w-4 h-4" /> },
	{ id: 'relaxation', label: 'Relaxation', icon: <Palmtree className="w-4 h-4" /> },
]

const DEFAULT_CITY = { lat: 17.385, lng: 78.4867, name: 'Hyderabad' }

export default function BudgetFilter() {
	const {
		budgetValue, setBudgetValue,
		tripDays, setTripDays,
		tripType, setTripType,
		selectedCategories, toggleCategory,
		goToNextStep,
	} = useTravelStore()

	// Phase flow: clouds -> intro -> budget -> preferences
	const [phase, setPhase] = useState<'clouds' | 'intro' | 'budget' | 'preferences'>('clouds')
	const [isExiting, setIsExiting] = useState(false)
	// Cloud opacity driven purely by state + CSS transition (no CSS animation classes)
	const [cloudOpacity, setCloudOpacity] = useState(1)

	const mapContainerRef = useRef<HTMLDivElement>(null)
	const mapRef = useRef<mapboxgl.Map | null>(null)
	const userCity = useRef(DEFAULT_CITY)
	const mountedRef = useRef(true)
	const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

	const safeTimeout = (fn: () => void, ms: number) => {
		const id = setTimeout(() => { if (mountedRef.current) fn() }, ms)
		timersRef.current.push(id)
		return id
	}

	// ── Initialize map + run cinematic sequence ──
	useEffect(() => {
		mountedRef.current = true

		// No Mapbox token — run text-only sequence
		if (!MAPBOX_TOKEN) {
			safeTimeout(() => setCloudOpacity(0), 500)
			safeTimeout(() => setPhase('intro'), 800)
			safeTimeout(() => setPhase('budget'), 3500)
			return () => {
				mountedRef.current = false
				timersRef.current.forEach(clearTimeout)
			}
		}

		const startMap = () => {
			const container = mapContainerRef.current
			if (!container || mapRef.current || !mountedRef.current) return

			// Wait for container dimensions
			if (container.offsetWidth === 0 || container.offsetHeight === 0) {
				safeTimeout(startMap, 100)
				return
			}

			const m = new mapboxgl.Map({
				container,
				style: 'mapbox://styles/mapbox/light-v11',
				center: [userCity.current.lng, userCity.current.lat],
				zoom: 14,
				pitch: 45,
				bearing: -10,
				interactive: false,
				attributionControl: false,
				fadeDuration: 0,
			})
			mapRef.current = m

			m.on('load', () => {
				if (!mapRef.current || !mountedRef.current) return

				// 3D buildings
				const layers = m.getStyle().layers
				let labelLayerId: string | undefined
				if (layers) {
					for (const layer of layers) {
						if (layer.type === 'symbol' && layer.layout && (layer.layout as any)['text-field']) {
							labelLayerId = layer.id
							break
						}
					}
				}
				try {
					m.addLayer({
						id: '3d-buildings-bg',
						source: 'composite',
						'source-layer': 'building',
						filter: ['==', 'extrude', 'true'],
						type: 'fill-extrusion',
						minzoom: 12,
						paint: {
							'fill-extrusion-color': '#E8DFD2',
							'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 12, 0, 14, ['get', 'height']],
							'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 12, 0, 14, ['get', 'min_height']],
							'fill-extrusion-opacity': 0.6,
						},
					}, labelLayerId)
				} catch {}

				// Warm fog
				try {
					m.setFog({
						color: '#F6F3EE',
						'high-color': '#E8DFD2',
						'horizon-blend': 0.06,
						'space-color': '#F6F3EE',
						'star-intensity': 0,
					} as any)
				} catch {}

				// ═══ CINEMATIC SEQUENCE ═══
				// Camera drifts while clouds dissolve

				m.flyTo({
					center: [userCity.current.lng, userCity.current.lat],
					zoom: 15.5,
					pitch: 55,
					bearing: -25,
					duration: 6000,
					curve: 1.1,
					easing: (t: number) => 1 - Math.pow(1 - t, 3),
				})

				// Start dissolving clouds
				safeTimeout(() => setCloudOpacity(0), 600)
				// Show intro text
				safeTimeout(() => setPhase('intro'), 1200)
				// Show budget panel
				safeTimeout(() => setPhase('budget'), 4800)
			})

			m.on('error', (e: any) => {
				console.error('BudgetFilter map error:', e)
			})
		}

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					if (!mountedRef.current) return
					userCity.current = { lat: pos.coords.latitude, lng: pos.coords.longitude, name: 'Your City' }
					startMap()
				},
				() => { if (mountedRef.current) startMap() },
				{ timeout: 3000 }
			)
		} else {
			startMap()
		}

		return () => {
			mountedRef.current = false
			timersRef.current.forEach(clearTimeout)
			if (mapRef.current) {
				mapRef.current.remove()
				mapRef.current = null
			}
		}
	}, [])

	const handleExplore = () => {
		setIsExiting(true)
		if (mapRef.current) {
			mapRef.current.flyTo({ zoom: 4, pitch: 0, bearing: 0, duration: 1200, curve: 1.5 })
		}
		setTimeout(() => goToNextStep(), 600)
	}

	const formatBudget = (val: number) => {
		return '\u20B9' + val.toLocaleString('en-IN')
	}

	const getCurrentTier = () => {
		const tier = budgetTiers.find(
			(t) => budgetValue >= t.range.min && (t.range.max === null || budgetValue <= t.range.max)
		)
		return tier?.label || 'Explorer'
	}

	// Determine if clouds are fully gone (opacity transition done)
	const cloudsGone = cloudOpacity === 0

	return (
		<motion.div
			initial={{ opacity: 1 }}
			animate={isExiting ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
			transition={{ duration: isExiting ? 0.6 : 0.3 }}
			style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
		>
			{/* ═══ LAYER 0: City Map Background ═══
			    position: absolute, inset: 0 — fills the parent.
			    The map renders here. On load it shows a 3D bird's-eye of the user's city. */}
			<div
				ref={mapContainerRef}
				style={{
					position: 'absolute',
					top: 0, left: 0, width: '100%', height: '100%',
					zIndex: 0,
					background: 'linear-gradient(135deg, #F6F3EE 0%, #E8DFD2 40%, #D8C7B3 100%)',
				}}
			/>

			{/* ═══ LAYER 1: Soft tint overlay (visible once clouds are gone) ═══ */}
			<div
				style={{
					position: 'absolute',
					top: 0, left: 0, width: '100%', height: '100%',
					zIndex: 1,
					pointerEvents: 'none',
					backdropFilter: cloudsGone ? 'blur(1.5px)' : 'none',
					WebkitBackdropFilter: cloudsGone ? 'blur(1.5px)' : 'none',
					background: 'linear-gradient(to bottom, rgba(246,243,238,0.12) 0%, transparent 40%, rgba(246,243,238,0.12) 100%)',
					transition: 'backdrop-filter 2s ease, -webkit-backdrop-filter 2s ease',
				}}
			/>

			{/* ═══ LAYER 2: CLOUD OVERLAY ═══
			    The KEY design: opacity is controlled ONLY by inline style + CSS transition.
			    No CSS animation class is used for opacity (which would override inline styles).
			    The cloud drift classes only affect transform (translate for drifting effect).
			    The descend effect (translateY + scale) is also inline for the same reason. */}
			<div
				style={{
					position: 'absolute',
					top: '-10%', left: '-10%',
					width: '120%', height: '120%',
					zIndex: 2,
					pointerEvents: 'none',
					opacity: cloudOpacity,
					transform: cloudsGone ? 'translateY(40px) scale(1.03)' : 'translateY(0) scale(1)',
					transition: 'opacity 3s cubic-bezier(0.4, 0, 0.2, 1), transform 4s cubic-bezier(0.4, 0, 0.2, 1)',
				}}
			>
				{/* Solid warm-white base */}
				<div
					style={{
						position: 'absolute', inset: 0,
						background: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 30%, #f3ede4 60%, #ebe3d6 100%)',
					}}
				/>

				{/* Cloud mass 1 — large slow drifting */}
				<div
					className="cloud-drift-slow"
					style={{
						position: 'absolute', inset: '-5%',
						backgroundImage: [
							'radial-gradient(ellipse 100% 75% at 10% 15%, rgba(255,255,255,1) 0%, rgba(248,244,238,0.7) 45%, transparent 75%)',
							'radial-gradient(ellipse 85% 60% at 80% 10%, rgba(255,255,255,1) 0%, rgba(248,244,238,0.6) 40%, transparent 72%)',
							'radial-gradient(ellipse 110% 85% at 45% 25%, rgba(255,255,255,1) 0%, rgba(244,238,228,0.5) 50%, transparent 80%)',
							'radial-gradient(ellipse 75% 50% at 90% 55%, rgba(255,255,255,0.97) 0%, rgba(240,234,222,0.4) 42%, transparent 70%)',
							'radial-gradient(ellipse 95% 65% at 20% 75%, rgba(255,255,255,0.97) 0%, rgba(240,234,222,0.45) 48%, transparent 75%)',
						].join(', '),
					}}
				/>

				{/* Cloud mass 2 — mid wisps, opposite drift */}
				<div
					className="cloud-drift-mid"
					style={{
						position: 'absolute', inset: '-3%',
						backgroundImage: [
							'radial-gradient(ellipse 60% 42% at 28% 38%, rgba(255,255,255,0.96) 0%, transparent 50%)',
							'radial-gradient(ellipse 75% 55% at 68% 52%, rgba(255,255,255,0.92) 0%, transparent 48%)',
							'radial-gradient(ellipse 50% 35% at 52% 18%, rgba(255,255,255,0.94) 0%, transparent 45%)',
							'radial-gradient(ellipse 65% 48% at 12% 62%, rgba(255,255,255,0.90) 0%, transparent 44%)',
							'radial-gradient(ellipse 55% 40% at 82% 78%, rgba(255,255,255,0.88) 0%, transparent 48%)',
						].join(', '),
					}}
				/>

				{/* Cloud mass 3 — thin warm wisps */}
				<div
					className="cloud-drift-fast"
					style={{
						position: 'absolute', inset: 0,
						backgroundImage: [
							'radial-gradient(ellipse 120% 90% at 50% 5%, rgba(240,234,222,0.7) 0%, transparent 48%)',
							'radial-gradient(ellipse 95% 65% at 5% 48%, rgba(238,230,216,0.5) 0%, transparent 40%)',
							'radial-gradient(ellipse 85% 55% at 95% 58%, rgba(238,230,216,0.48) 0%, transparent 42%)',
							'radial-gradient(ellipse 65% 45% at 50% 88%, rgba(232,224,208,0.42) 0%, transparent 38%)',
						].join(', '),
					}}
				/>

				{/* Bottom haze — "breaking through" feel */}
				<div
					style={{
						position: 'absolute', inset: 0,
						background: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 25%, transparent 55%)',
					}}
				/>
			</div>

			{/* ═══ LAYER 3: Warm glow (after clouds) ═══ */}
			<div
				style={{
					position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
					zIndex: 3, pointerEvents: 'none',
					opacity: cloudsGone ? 1 : 0,
					transition: 'opacity 1.5s ease 0.5s',
				}}
			>
				<div style={{
					position: 'absolute', top: 0, right: 0, width: 600, height: 600, borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)',
				}} />
				<div style={{
					position: 'absolute', bottom: 0, left: 0, width: 400, height: 400, borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(196,115,79,0.08) 0%, transparent 70%)',
				}} />
			</div>

			{/* ═══ CONTENT LAYERS (z-index: 10) ═══ */}

			{/* Intro Text */}
			<AnimatePresence>
				{phase === 'intro' && (
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -40, scale: 0.92 }}
						transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
						style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
					>
						<div className="text-center">
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3, duration: 0.8 }}
								className="text-sm tracking-[0.4em] uppercase text-sandstone font-medium mb-4"
								style={{ textShadow: '0 1px 20px rgba(255,255,255,1), 0 0 50px rgba(255,255,255,0.9)' }}
							>
								Velosta
							</motion.p>
							<motion.h1
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6, duration: 0.9 }}
								className="text-5xl md:text-6xl font-serif font-semibold text-charcoal"
								style={{ textShadow: '0 2px 30px rgba(255,255,255,1), 0 0 80px rgba(255,255,255,0.8)' }}
							>
								Where Journeys Begin
							</motion.h1>
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: 56 }}
								transition={{ delay: 1.2, duration: 0.7 }}
								className="h-[2px] bg-gold mx-auto mt-6"
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Budget / Preferences Panel */}
			<AnimatePresence mode="wait">
				{(phase === 'budget' || phase === 'preferences') && (
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.9, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
						style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
					>
						<div className="glass-panel rounded-3xl p-8 md:p-10 max-w-xl w-full mx-4">
							{/* Branding */}
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2, duration: 0.6 }}
								className="text-center mb-8"
							>
								<p className="text-xs tracking-[0.3em] uppercase text-sandstone font-medium mb-2">
									Velosta
								</p>
								<h1 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal leading-tight">
									Start Your Journey
								</h1>
								<div className="w-10 h-[2px] bg-gold mx-auto mt-3" />
							</motion.div>

							<AnimatePresence mode="wait">
								{phase === 'budget' && (
									<motion.div
										key="budget"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.4 }}
									>
										<div className="mb-8">
											<label className="block text-sm text-charcoal-light mb-4 text-center font-light">
												What is your travel budget?
											</label>
											<div className="text-center mb-6">
												<motion.p
													key={budgetValue}
													initial={{ opacity: 0, y: -5 }}
													animate={{ opacity: 1, y: 0 }}
													className="text-4xl md:text-5xl font-serif font-bold text-charcoal"
												>
													{formatBudget(budgetValue)}
												</motion.p>
												<motion.p
													key={getCurrentTier()}
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													className="text-xs text-gold font-medium mt-1 tracking-wide"
												>
													{getCurrentTier()}
												</motion.p>
											</div>
											<div className="px-2">
												<input
													type="range"
													min={3000}
													max={200000}
													step={1000}
													value={budgetValue}
													onChange={(e) => setBudgetValue(Number(e.target.value))}
													className="w-full"
												/>
												<div className="flex justify-between mt-2 text-xs text-charcoal-light/50">
													<span>{'\u20B9'}3,000</span>
													<span>{'\u20B9'}2,00,000</span>
												</div>
											</div>
										</div>

										<div className="mb-8">
											<label className="block text-sm text-charcoal-light mb-3 text-center font-light">
												How many days?
											</label>
											<div className="flex items-center justify-center gap-2">
												{[2, 3, 4, 5, 7, 10, 14].map((d) => (
													<button
														key={d}
														onClick={() => setTripDays(d)}
														className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
															tripDays === d
																? 'bg-charcoal text-warm-white shadow-md'
																: 'bg-beige/60 text-charcoal-light hover:bg-sandstone/30'
														}`}
													>
														{d}
													</button>
												))}
											</div>
										</div>

										<motion.button
											whileHover={{ scale: 1.02, y: -1 }}
											whileTap={{ scale: 0.98 }}
											onClick={() => setPhase('preferences')}
											className="w-full py-3.5 rounded-xl text-warm-white font-medium text-base tracking-wide transition-all duration-300"
											style={{
												background: 'linear-gradient(135deg, #C4734F 0%, #C9A96E 100%)',
												boxShadow: '0 4px 20px rgba(196, 115, 79, 0.3)',
											}}
										>
											Next
										</motion.button>
									</motion.div>
								)}

								{phase === 'preferences' && (
									<motion.div
										key="preferences"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.4 }}
									>
										<div className="mb-6">
											<label className="block text-sm text-charcoal-light mb-3 text-center font-light">
												Who is traveling?
											</label>
											<div className="grid grid-cols-4 gap-2">
												{tripTypes.map((t) => (
													<button
														key={t.id}
														onClick={() => setTripType(t.id)}
														className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 ${
															tripType === t.id
																? 'bg-charcoal text-warm-white shadow-md'
																: 'bg-beige/50 text-charcoal-light hover:bg-sandstone/30'
														}`}
													>
														{t.icon}
														<span className="text-xs font-medium">{t.label}</span>
													</button>
												))}
											</div>
										</div>

										<div className="mb-8">
											<label className="block text-sm text-charcoal-light mb-3 text-center font-light">
												What excites you?{' '}
												<span className="text-charcoal-light/40">(optional)</span>
											</label>
											<div className="flex flex-wrap justify-center gap-2">
												{categories.map((c) => (
													<button
														key={c.id}
														onClick={() => toggleCategory(c.id)}
														className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
															selectedCategories.includes(c.id)
																? 'bg-gold/20 text-charcoal border border-gold/40'
																: 'bg-beige/40 text-charcoal-light/70 border border-transparent hover:border-sandstone/40'
														}`}
													>
														{c.icon}
														{c.label}
													</button>
												))}
											</div>
										</div>

										<div className="glass-panel rounded-xl p-4 mb-6 text-center">
											<p className="text-xs text-charcoal-light/50 mb-1">Your trip</p>
											<p className="text-sm font-medium text-charcoal">
												{formatBudget(budgetValue)} {'\u00B7'} {tripDays} days {'\u00B7'}{' '}
												{tripTypes.find((t) => t.id === tripType)?.label}
											</p>
										</div>

										<div className="flex gap-3">
											<button
												onClick={() => setPhase('budget')}
												className="px-5 py-3.5 rounded-xl font-medium text-sm text-charcoal border border-sandstone/40 hover:border-terracotta/50 transition-all duration-300"
											>
												Back
											</button>
											<motion.button
												whileHover={{ scale: 1.02, y: -1 }}
												whileTap={{ scale: 0.98 }}
												onClick={handleExplore}
												className="flex-1 py-3.5 rounded-xl text-warm-white font-medium text-base tracking-wide transition-all duration-300"
												style={{
													background: 'linear-gradient(135deg, #C4734F 0%, #C9A96E 100%)',
													boxShadow: '0 4px 20px rgba(196, 115, 79, 0.3)',
												}}
											>
												Explore Destinations
											</motion.button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							{/* Progress dots */}
							<div className="flex items-center justify-center gap-2 mt-6">
								<div className={`w-2 h-2 rounded-full transition-all duration-300 ${phase === 'budget' ? 'bg-terracotta' : 'bg-sandstone/40'}`} />
								<div className={`w-2 h-2 rounded-full transition-all duration-300 ${phase === 'preferences' ? 'bg-terracotta' : 'bg-sandstone/40'}`} />
								<div className="w-2 h-2 rounded-full bg-sandstone/40" />
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}
