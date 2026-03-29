'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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

// Spring animation config shared across component
const spring = { type: 'spring', stiffness: 300, damping: 30 }
const smoothTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] }

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

	// ── Keyboard navigation ──
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (currentStep !== 1) return
			if (e.key === 'Enter') {
				if (phase === 'budget') setPhase('preferences')
				else if (phase === 'preferences') handleExplore()
			}
			if (e.key === 'Escape' && phase === 'preferences') {
				setPhase('budget')
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [phase, currentStep])

	// ── Run cinematic sequence once map loads ──
	useEffect(() => {
		mountedRef.current = true

		if (sequenceStarted.current) return
		if (currentStep !== 1) return

		if (mapLoaded) {
			sequenceStarted.current = true
			safeTimeout(() => setPhase('intro'), 1200)
			safeTimeout(() => setPhase('budget'), 4800)
		} else {
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

	const handleExplore = useCallback(() => {
		setIsExiting(true)
		setTimeout(() => goToNextStep(), 600)
	}, [goToNextStep])

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
			className="will-change-transform"
			style={{
				position: 'absolute', inset: 0,
				opacity: isExiting ? 0 : 1,
				transform: isExiting ? 'scale(0.95)' : 'scale(1)',
				transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
			}}
		>
			{/* ═══ Intro Text ═══ */}
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
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3, duration: 0.8 }}
								className="text-sm tracking-[0.4em] uppercase font-sans font-semibold mb-4"
								style={{
									color: 'var(--sandstone)',
									textShadow: '0 1px 20px rgba(255,255,255,1), 0 0 50px rgba(255,255,255,0.9)',
								}}
							>
								Velosta
							</motion.p>
							<motion.h1
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6, duration: 0.9 }}
								className="text-5xl md:text-6xl font-serif text-charcoal"
								style={{
									textShadow: '0 2px 30px rgba(255,255,255,1), 0 0 80px rgba(255,255,255,0.8)',
									letterSpacing: '-0.02em',
								}}
							>
								Where Journeys Begin
							</motion.h1>
							<motion.div
								initial={{ width: 0, opacity: 0 }}
								animate={{ width: 56, opacity: 1 }}
								transition={{ delay: 1.2, duration: 0.7 }}
								className="h-[2px] bg-gold mx-auto mt-6"
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* ═══ Budget / Preferences Panel ═══ */}
			<AnimatePresence mode="wait">
				{(phase === 'budget' || phase === 'preferences') && (
					<motion.div
						initial={{ opacity: 0, y: 40, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
						style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
					>
						<div className="glass-panel rounded-apple-2xl p-8 md:p-10 max-w-xl w-full mx-4" style={{ borderRadius: '36px' }}>
							{/* Branding */}
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2, duration: 0.6 }}
								className="text-center mb-8"
							>
								<p className="text-xs tracking-[0.3em] uppercase font-sans font-semibold mb-2" style={{ color: 'var(--sandstone)' }}>
									Velosta
								</p>
								<h1 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight" style={{ letterSpacing: '-0.02em' }}>
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
										transition={smoothTransition}
									>
										<div className="mb-8">
											<label className="block text-sm text-charcoal-light mb-4 text-center font-sans font-light">
												What is your travel budget?
											</label>
											<div className="text-center mb-6">
												<motion.p
													key={budgetValue}
													initial={{ opacity: 0, y: -8 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ type: 'spring', stiffness: 400, damping: 25 }}
													className="text-4xl md:text-5xl font-serif text-charcoal tabular-nums"
													style={{ letterSpacing: '-0.02em' }}
												>
													{formatBudget(budgetValue)}
												</motion.p>
												<motion.p
													key={getCurrentTier()}
													initial={{ opacity: 0, scale: 0.9 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{ type: 'spring', stiffness: 300, damping: 20 }}
													className="text-xs font-sans font-semibold mt-1.5 tracking-wide"
													style={{ color: 'var(--soft-gold)' }}
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
												<div className="flex justify-between mt-2 text-xs font-sans" style={{ color: 'rgba(74,74,74,0.4)' }}>
													<span>{'\u20B9'}3,000</span>
													<span>{'\u20B9'}2,00,000</span>
												</div>
											</div>
										</div>

										<div className="mb-8">
											<label className="block text-sm text-charcoal-light mb-3 text-center font-sans font-light">
												How many days?
											</label>
											<div className="flex items-center justify-center gap-2 stagger-children">
												{[2, 3, 4, 5, 7, 10, 14].map((d) => (
													<motion.button
														key={d}
														whileHover={{ scale: 1.08, y: -1 }}
														whileTap={{ scale: 0.92 }}
														onClick={() => setTripDays(d)}
														className={`px-3.5 py-2 font-sans text-sm font-semibold transition-all duration-300 ${tripDays === d
															? 'bg-charcoal text-warm-white shadow-md'
															: 'bg-beige/60 text-charcoal-light hover:bg-sandstone/30'
															}`}
														style={{ borderRadius: '12px' }}
													>
														{d}
													</motion.button>
												))}
											</div>
										</div>

										<motion.button
											whileHover={{ scale: 1.02, y: -2 }}
											whileTap={{ scale: 0.97 }}
											onClick={() => setPhase('preferences')}
											className="btn-primary w-full py-4 text-base tracking-wide"
											style={{ borderRadius: '16px' }}
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
										transition={smoothTransition}
									>
										<div className="mb-6">
											<label className="block text-sm text-charcoal-light mb-3 text-center font-sans font-light">
												Who is traveling?
											</label>
											<div className="grid grid-cols-4 gap-2 stagger-children">
												{tripTypes.map((t) => (
													<motion.button
														key={t.id}
														whileHover={{ scale: 1.05, y: -2 }}
														whileTap={{ scale: 0.93 }}
														onClick={() => setTripType(t.id)}
														className={`flex flex-col items-center gap-1.5 p-3.5 transition-all duration-300 ${tripType === t.id
															? 'bg-charcoal text-warm-white shadow-md'
															: 'bg-beige/50 text-charcoal-light hover:bg-sandstone/30'
															}`}
														style={{ borderRadius: '16px' }}
													>
														{t.icon}
														<span className="text-xs font-sans font-semibold">{t.label}</span>
													</motion.button>
												))}
											</div>
										</div>

										<div className="mb-8">
											<label className="block text-sm text-charcoal-light mb-3 text-center font-sans font-light">
												What excites you?{' '}
												<span style={{ color: 'rgba(74,74,74,0.35)' }}>(optional)</span>
											</label>
											<div className="flex flex-wrap justify-center gap-2 stagger-children">
												{categories.map((c) => (
													<motion.button
														key={c.id}
														whileHover={{ scale: 1.06 }}
														whileTap={{ scale: 0.93 }}
														onClick={() => toggleCategory(c.id)}
														className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-sans font-medium transition-all duration-300 ${selectedCategories.includes(c.id)
															? 'bg-gold/20 text-charcoal border border-gold/40'
															: 'bg-beige/40 text-charcoal-light/70 border border-transparent hover:border-sandstone/40'
															}`}
														style={{ borderRadius: '9999px' }}
													>
														{c.icon}
														{c.label}
													</motion.button>
												))}
											</div>
										</div>

										<div className="glass-panel p-4 mb-6 text-center" style={{ borderRadius: '16px' }}>
											<p className="text-xs font-sans" style={{ color: 'rgba(74,74,74,0.45)' }}>Your trip</p>
											<p className="text-sm font-sans font-semibold text-charcoal mt-0.5">
												{formatBudget(budgetValue)} {'\u00B7'} {tripDays} days {'\u00B7'}{' '}
												{tripTypes.find((t) => t.id === tripType)?.label}
											</p>
										</div>

										<div className="flex gap-3">
											<motion.button
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.97 }}
												onClick={() => setPhase('budget')}
												className="btn-secondary px-5 py-3.5 text-sm"
												style={{ borderRadius: '16px' }}
											>
												Back
											</motion.button>
											<motion.button
												whileHover={{ scale: 1.02, y: -2 }}
												whileTap={{ scale: 0.97 }}
												onClick={handleExplore}
												className="btn-primary flex-1 py-3.5 text-base tracking-wide"
												style={{ borderRadius: '16px' }}
											>
												Explore Destinations
											</motion.button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							{/* Progress dots */}
							<div className="flex items-center justify-center gap-2.5 mt-7">
								{['budget', 'preferences', 'explore'].map((step, i) => (
									<motion.div
										key={step}
										animate={{
											width: (i === 0 && phase === 'budget') || (i === 1 && phase === 'preferences')
												? 20 : 8,
											backgroundColor:
												(i === 0 && phase === 'budget') || (i === 1 && phase === 'preferences')
													? 'var(--terracotta)'
													: 'rgba(216, 199, 179, 0.35)',
										}}
										transition={spring}
										className="h-2 rounded-full"
									/>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
