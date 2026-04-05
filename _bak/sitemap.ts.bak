import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://walloflove.eazyweb.nc'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Fetch all public walls
  try {
    const supabase = await createClient()
    const { data: walls } = await supabase
      .from('walls')
      .select('slug, updated_at')

    if (walls) {
      const wallPages: MetadataRoute.Sitemap = walls.map((wall) => ({
        url: `${baseUrl}/wall/${wall.slug}`,
        lastModified: new Date(wall.updated_at),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }))
      return [...staticPages, ...wallPages]
    }
  } catch {
    // If DB unavailable, return static pages only
  }

  return staticPages
}
