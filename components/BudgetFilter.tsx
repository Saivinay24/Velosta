'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTravelStore } from '@/lib/store'
import { budgetTiers } from '@/lib/data'
import type { TripType, TripCategory } from '@/lib/types'
import { Users, Heart, Home as HomeIcon, User, Mountain, Landmark, Compass, Palmtree } from 'lucide-react'

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

export default function BudgetFilter() {
	const {
		budgetValue, setBudgetValue,
		tripDays, setTripDays,
		tripType, setTripType,
		selectedCategories, toggleCategory,
		goToNextStep,
		mapLoaded,
		currentStep,
	} = useTravelStore()

	// Phase flow: clouds -> intro -> budget -> preferences
	const [phase, setPhase] = useState<'clouds' | 'intro' | 'budget' | 'preferences'>('clouds')
	const [isExiting, setIsExiting] = useState(false)
	const mountedRef = useRef(true)
	const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
	const sequenceStarted = useRef(false)

	const safeTimeout = (fn: () => void, ms: number) => {
		const id = setTimeout(() => { if (mountedRef.current) fn() }, ms)
		timersRef.current.push(id)
		return id
	}

	// ── Run cinematic sequence once map loads ──
	useEffect(() => {
		mountedRef.current = true

		if (sequenceStarted.current) return
		if (currentStep !== 1) return

		if (mapLoaded) {
			sequenceStarted.current = true
			// Show intro text after clouds start dissolving
			safeTimeout(() => setPhase('intro'), 1200)
			// Show budget panel
			safeTimeout(() => setPhase('budget'), 4800)
		} else {
			// No map — run text-only sequence
			const checkToken = !process.env.NEXT_PUBLIC_MAPBOX_TOKEN
			if (checkToken) {
				sequenceStarted.current = true
				safeTimeout(() => setPhase('intro'), 800)
				safeTimeout(() => setPhase('budget'), 3500)
			}
		}

		return () => {
			mountedRef.current = false
			timersRef.current.forEach(clearTimeout)
		}
	}, [mapLoaded, currentStep])

	const handleExplore = () => {
		setIsExiting(true)
		// Camera transition is handled by PersistentMap via store.currentStep
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

	return (
		<div
			style={{
				position: 'absolute', inset: 0,
				opacity: isExiting ? 0 : 1,
				transform: isExiting ? 'scale(0.92)' : 'scale(1)',
				transition: 'opacity 0.6s ease, transform 0.6s ease',
			}}
		>
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
														className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${tripDays === d
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
														className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 ${tripType === t.id
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
														className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedCategories.includes(c.id)
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
		</div>
	)
}
