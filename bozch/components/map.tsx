"use client"

export default function MapComponent({ address }: { address: string }) {
    // Extract roughly Limbe, Blantyre coordinates for the iframe
    // In a real app, we might use a geocoder, but for now we'll use these fixed ones
    const lat = -15.8167
    const lon = 35.0500

    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01}%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`

    return (
        <div className="w-full h-full min-h-[400px]">
            <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={mapUrl}
                style={{ border: 0 }}
                title="OpenStreetMap"
            />
        </div>
    )
}
