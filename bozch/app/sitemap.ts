import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bozchafrica.org"

    const routes = [
        "",
        "/about",
        "/programs",
        "/journey",
        "/get-involved",
        "/contact",
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as any,
        priority: route === "" ? 1 : 0.8,
    }))
}
