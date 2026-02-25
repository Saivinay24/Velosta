'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { useTravelStore } from '@/lib/store'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
mapboxgl.accessToken = MAPBOX_TOKEN || ''

const DEFAULT_CITY = { lat: 17.385, lng: 78.4867, name: 'Hyderabad' }

/**
 * PersistentMap — The ONE map that lives from page load to close.
 * Created once, never destroyed. All step components use this map via store.mapRef.
 */
export default function PersistentMap() {
    const mapContainer = useRef<HTMLDivElement>(null)
    const mapCreated = useRef(false)
    const userCity = useRef(DEFAULT_CITY)

    const { setMapRef, setMapLoaded, currentStep, selectedDestination } = useTravelStore()

    // ── Create map once ──
    useEffect(() => {
        if (mapCreated.current || !mapContainer.current || !MAPBOX_TOKEN) return

        const startMap = () => {
            const container = mapContainer.current
            if (!container || mapCreated.current) return
            if (container.offsetWidth === 0 || container.offsetHeight === 0) {
                setTimeout(startMap, 100)
                return
            }

            mapCreated.current = true

            const m = new mapboxgl.Map({
                container,
                style: 'mapbox://styles/mapbox/light-v11',
                center: [userCity.current.lng, userCity.current.lat],
                zoom: 14,
                pitch: 45,
                bearing: -10,
                interactive: false, // Will enable on step 2
                attributionControl: false,
                fadeDuration: 0,
                trackResize: true,
            })

            m.on('load', () => {
                // 3D buildings layer
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
                        id: '3d-buildings',
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
                } catch { }

                // Warm fog
                try {
                    m.setFog({
                        color: '#F6F3EE',
                        'high-color': '#E8DFD2',
                        'horizon-blend': 0.06,
                        'space-color': '#F6F3EE',
                        'star-intensity': 0,
                    } as any)
                } catch { }

                // Store map ref
                setMapRef(m)
                setMapLoaded(true)

                // Cinematic opening — drift over city
                m.flyTo({
                    center: [userCity.current.lng, userCity.current.lat],
                    zoom: 15.5,
                    pitch: 55,
                    bearing: -25,
                    duration: 6000,
                    curve: 1.1,
                    easing: (t: number) => 1 - Math.pow(1 - t, 3),
                })
            })

            m.on('error', (e: any) => {
                console.error('PersistentMap error:', e)
            })

            m.addControl(
                new mapboxgl.NavigationControl({ showCompass: true, visualizePitch: true }),
                'bottom-right'
            )
        }

        // Try geolocation first
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    userCity.current = { lat: pos.coords.latitude, lng: pos.coords.longitude, name: 'Your City' }
                    startMap()
                },
                () => startMap(),
                { timeout: 3000 }
            )
        } else {
            startMap()
        }

        return () => {
            // Only clean up if the entire app is unmounting (page unload)
            // Normally this component never unmounts
        }
    }, [])

    // ── Camera transitions when currentStep changes ──
    useEffect(() => {
        const map = useTravelStore.getState().mapRef
        if (!map || !useTravelStore.getState().mapLoaded) return

        if (currentStep === 1) {
            // Bird's-eye city view for welcome/budget
            map.flyTo({
                center: [userCity.current.lng, userCity.current.lat],
                zoom: 15,
                pitch: 50,
                bearing: -20,
                duration: 1500,
                curve: 1.3,
            })
            // Disable interaction during budget selection
            map.boxZoom.disable()
            map.scrollZoom.disable()
            map.dragPan.disable()
            map.dragRotate.disable()
            map.keyboard.disable()
            map.doubleClickZoom.disable()
            map.touchZoomRotate.disable()
        } else if (currentStep === 2) {
            // Zoom out to India to show all destination pins
            map.flyTo({
                center: [78.9629, 22.5937],
                zoom: 4.2,
                pitch: 0,
                bearing: 0,
                duration: 2000,
                curve: 1.5,
            })
            // Enable full interaction for map exploration
            map.boxZoom.enable()
            map.scrollZoom.enable()
            map.dragPan.enable()
            map.dragRotate.enable()
            map.keyboard.enable()
            map.doubleClickZoom.enable()
            map.touchZoomRotate.enable()
        } else if (currentStep === 3 && selectedDestination) {
            // Fly into the selected destination city
            map.flyTo({
                center: [selectedDestination.location.lng, selectedDestination.location.lat],
                zoom: 14,
                pitch: 55,
                bearing: -15,
                duration: 2000,
                curve: 1.2,
            })
            // Enable interaction for itinerary map
            map.boxZoom.enable()
            map.scrollZoom.enable()
            map.dragPan.enable()
            map.dragRotate.enable()
            map.keyboard.enable()
            map.doubleClickZoom.enable()
            map.touchZoomRotate.enable()
        }
    }, [currentStep, selectedDestination])

    return (
        <div
            ref={mapContainer}
            style={{
                position: 'fixed',
                top: 0, left: 0, width: '100%', height: '100%',
                zIndex: 0,
                background: 'linear-gradient(135deg, #F6F3EE 0%, #E8DFD2 40%, #D8C7B3 100%)',
            }}
        />
    )
}
