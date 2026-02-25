'use client'

import { useState, useEffect, useRef } from 'react'
import { useTravelStore } from '@/lib/store'

/**
 * CloudOverlay — Sits above the persistent map, below all UI.
 * Dissolves once during the intro sequence, then stays gone.
 * Uses inline opacity + CSS transition (not animation) to avoid override conflicts.
 */
export default function CloudOverlay() {
    const [cloudOpacity, setCloudOpacity] = useState(1)
    const [warmGlowVisible, setWarmGlowVisible] = useState(false)
    const mountedRef = useRef(true)
    const dissolvedRef = useRef(false)

    const { mapLoaded, currentStep } = useTravelStore()

    // Dissolve clouds once map is loaded (during intro)
    useEffect(() => {
        mountedRef.current = true

        if (dissolvedRef.current) return // Only dissolve once

        if (mapLoaded && currentStep === 1) {
            // Map loaded — start dissolving clouds
            const t1 = setTimeout(() => {
                if (mountedRef.current) setCloudOpacity(0)
            }, 600)
            const t2 = setTimeout(() => {
                if (mountedRef.current) setWarmGlowVisible(true)
            }, 2000)
            dissolvedRef.current = true
            return () => { clearTimeout(t1); clearTimeout(t2) }
        }

        if (!mapLoaded && currentStep === 1) {
            // No map token scenario — dissolve after a delay
            const t1 = setTimeout(() => {
                if (mountedRef.current) setCloudOpacity(0)
            }, 500)
            const t2 = setTimeout(() => {
                if (mountedRef.current) setWarmGlowVisible(true)
            }, 1500)
            // Don't mark as dissolved — wait for potential map load
            return () => { clearTimeout(t1); clearTimeout(t2) }
        }

        return () => { mountedRef.current = false }
    }, [mapLoaded, currentStep])

    // If we're past step 1 and clouds haven't dissolved yet, force dissolve
    useEffect(() => {
        if (currentStep > 1 && !dissolvedRef.current) {
            setCloudOpacity(0)
            setWarmGlowVisible(true)
            dissolvedRef.current = true
        }
    }, [currentStep])

    const cloudsGone = cloudOpacity === 0

    return (
        <>
            {/* Soft tint overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100%', height: '100%',
                    zIndex: 1,
                    pointerEvents: 'none',
                    backdropFilter: cloudsGone ? 'blur(1.5px)' : 'none',
                    WebkitBackdropFilter: cloudsGone ? 'blur(1.5px)' : 'none',
                    background: 'linear-gradient(to bottom, rgba(246,243,238,0.12) 0%, transparent 40%, rgba(246,243,238,0.12) 100%)',
                    transition: 'backdrop-filter 2s ease, -webkit-backdrop-filter 2s ease',
                    // Hide the tint on step 2/3 so the map is fully clear
                    opacity: currentStep === 1 ? 1 : 0,
                }}
            />

            {/* Cloud layer */}
            <div
                style={{
                    position: 'fixed',
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

                {/* Bottom haze */}
                <div
                    style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 25%, transparent 55%)',
                    }}
                />
            </div>

            {/* Warm glow (after clouds) */}
            <div
                style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    zIndex: 3, pointerEvents: 'none',
                    opacity: warmGlowVisible && currentStep === 1 ? 1 : 0,
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
        </>
    )
}
