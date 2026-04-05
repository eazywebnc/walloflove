import { createAdminClient } from '@/lib/supabase/server'

/**
 * Ensures the authenticated user has wol_users + wol_settings records.
 * Called on first dashboard access to support cross-SaaS login
 * (user may have signed up on another eazyweb.nc SaaS).
 */
export async function ensureUserProfile(userId: string, email: string) {
  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('wol_users')
    .select('auth_id')
    .eq('auth_id', userId)
    .single()

  if (existing) return // already has profile

  await supabase.from('wol_users').upsert(
    {
      auth_id: userId,
      email,
      plan: 'free',
      walls_limit: 1,
      testimonials_limit: 50,
    },
    { onConflict: 'auth_id' }
  )

  await supabase.from('wol_settings').upsert(
    {
      auth_id: userId,
      email_notifications: true,
      auto_approve: false,
      thank_you_message: 'Thank you for your testimonial! We appreciate your feedback.',
      collect_page_title: 'Share your experience',
      collect_page_description: "We'd love to hear what you think about our product or service.",
    },
    { onConflict: 'auth_id' }
  )
}
