import { createAdminClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CollectForm from '@/components/collect/collect-form'

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
    .eq('is_active', true)
    .single()

  if (!wall) return { title: 'Share your testimonial' }

  return {
    title: `Share your experience — ${wall.name}`,
    description: wall.description ?? `Submit a testimonial for ${wall.name}`,
  }
}

export default async function CollectPage({ params }: PageProps) {
  const { slug } = await params
  const admin = createAdminClient()

  const { data: wall } = await admin
    .from('wol_walls')
    .select('id, name, description, settings, is_active')
    .eq('slug', slug)
    .single()

  if (!wall || !wall.is_active) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = wall.settings as Record<string, any> | null
  const accentColor: string = settings?.primary_color ?? '#8b5cf6'

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-start justify-center py-16 px-4">
      {/* Radial gradient background glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${accentColor}, transparent)`,
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-lg">
        {/* Header card */}
        <div className="text-center mb-10">
          {/* Logo placeholder / initial circle */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg"
            style={{ background: accentColor }}
            aria-hidden
          >
            {wall.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight">
            {wall.name}
          </h1>

          {wall.description && (
            <p className="mt-3 text-zinc-400 text-base leading-relaxed max-w-sm mx-auto">
              {wall.description}
            </p>
          )}
        </div>

        {/* Form card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <h2 className="text-lg font-semibold text-white mb-1">Share your experience</h2>
          <p className="text-sm text-zinc-500 mb-8">
            Your feedback helps others and means a lot to us.
          </p>

          <CollectForm wallId={wall.id} accentColor={accentColor} />
        </div>

        {/* Branding footer */}
        <p className="text-center text-xs text-zinc-700 mt-8">
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
      </div>
    </main>
  )
}
