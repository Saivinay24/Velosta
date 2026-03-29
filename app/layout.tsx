import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
    title: 'Velosta — Where Journeys Begin',
    description: 'A premium travel planning experience. Explore the globe and build your perfect itinerary with cinematic flair.',
    keywords: 'travel, itinerary, premium travel, trip planning, explore destinations, Velosta',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700;800&family=Inter:opsz,wght@14..32,300..700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    )
}
