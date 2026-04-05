import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/auth/signup
// Creates a Supabase Auth user, then bootstraps wol_users + default wol_settings.
export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string; fullName?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { email, password, fullName } = body

  if (!email?.trim()) return NextResponse.json({ error: 'email is required' }, { status: 400 })
  if (!password) return NextResponse.json({ error: 'password is required' }, { status: 400 })

  const admin = createAdminClient()

  // 1. Create the Supabase Auth user
  const { data: authData, error: signUpError } = await admin.auth.admin.createUser({
    email: email.trim(),
    password,
    email_confirm: true, // skip email confirmation for programmatic signup
    user_metadata: {
      full_name: fullName?.trim() ?? null,
    },
  })

  if (signUpError || !authData.user) {
    return NextResponse.json(
      { error: signUpError?.message ?? 'Failed to create user' },
      { status: 400 }
    )
  }

  const userId = authData.user.id

  // 2. Create wol_users record
  const { error: wolUserError } = await admin.from('wol_users').insert({
    auth_id: userId,
    email: email.trim(),
    full_name: fullName?.trim() ?? null,
    plan: 'free',
    walls_limit: 1,
    testimonials_limit: 50,
  })

  if (wolUserError) {
    // Rollback: delete the Auth user to avoid orphans
    await admin.auth.admin.deleteUser(userId)
    return NextResponse.json(
      { error: `Failed to create user profile: ${wolUserError.message}` },
      { status: 500 }
    )
  }

  // 3. Create default wol_settings for the user
  const { error: settingsError } = await admin.from('wol_settings').insert({
    auth_id: userId,
    email_notifications: true,
    auto_approve: false,
    thank_you_message: 'Thank you for your testimonial! We appreciate your feedback.',
    collect_page_title: 'Share your experience',
    collect_page_description: "We'd love to hear what you think about our product or service.",
  })

  if (settingsError) {
    console.error('[Signup] Failed to create default settings:', settingsError.message)
    // Non-fatal — user can configure settings later
  }

  return NextResponse.json(
    {
      message: 'Account created successfully',
      userId,
    },
    { status: 201 }
  )
}
