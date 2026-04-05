import { createAdminClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Testimonial } from '@/lib/types'
import MasonryWall from '@/components/wall/masonry-wall'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const admin = createAdminClient()

  const { data: wall } = await admin
    .from('wol_walls')
    .select('name, description')
    .eq('slug', slug)
    .single()

  if (!wall) return { title: 'Wall of Love' }

  return {
    title: `${wall.name} — Wall of Love`,
    description: wall.description ?? `Testimonials for ${wall.name}`,
  }
}

export default async function WallPage({ params }: PageProps) {
  const { slug } = await params
  const admin = createAdminClient()

  // Fetch the wall (no auth — public page)
  const { data: wall } = await admin
    .from('wol_walls')
    .select('id, name, description, settings, is_active')
    .eq('slug', slug)
    .single()

  if (!wall) notFound()

  // Fetch approved testimonials only
  const { data: testimonials } = await admin
    .from('wol_testimonials')
    .select('*')
    .eq('wall_id', wall.id)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = wall.settings as Record<string, any> | null
  const accentColor: string = settings?.primary_color ?? '#8b5cf6'
  const layoutColumns: 2 | 3 = settings?.columns === 2 ? 2 : 3

  const approvedTestimonials = (testimonials ?? []) as Testimonial[]

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-16">
      {/* Subtle glow header */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-60 opacity-15"
        style={{
          background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${accentColor}, transparent)`,
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Page header */}
        <header className="text-center mb-14">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white mx-auto mb-5 shadow-lg"
            style={{ background: accentColor }}
            aria-hidden
          >
            {wall.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-4xl font-bold text-white tracking-tight mb-3">{wall.name}</h1>

          {wall.description && (
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">{wall.description}</p>
          )}

          <div className="flex items-center justify-center gap-2 mt-5">
            <span className="text-zinc-500 text-sm">
              {approvedTestimonials.length} testimonial
              {approvedTestimonials.length !== 1 ? 's' : ''}
            </span>
            {wall.is_active && (
              <>
                <span className="text-zinc-700">·</span>
                <a
                  href={`/collect/${slug}`}
                  className="text-sm font-medium transition-colors"
                  style={{ color: accentColor }}
                >
                  Submit yours →
                </a>
              </>
            )}
          </div>
        </header>

        {/* Masonry grid */}
        <MasonryWall
          testimonials={approvedTestimonials}
          accentColor={accentColor}
          columns={layoutColumns}
        />

        {/* Footer branding */}
        <footer className="text-center mt-16">
          <p className="text-xs text-zinc-700">
            Powered by{' '}
            <a
              href="https://walloflove.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-500 transition-colors"
            >
              WallOfLove
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}
