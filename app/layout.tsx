import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Velosta — Where Journeys Begin in Space',
    description: 'A premium travel planning experience. Navigate through space, explore the globe, and build your perfect itinerary.',
    keywords: 'travel, itinerary, premium travel, trip planning, explore destinations',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css"
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
        </html>
    )
}
