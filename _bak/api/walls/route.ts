import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// GET /api/walls — list walls for authenticated user
export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: walls, error } = await supabase
    .from('wol_walls')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ walls })
}

// POST /api/walls — create a new wall
export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { name?: string; description?: string; slug?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { name, description, slug } = body

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'Wall name is required' }, { status: 400 })
  }

  // Check user plan limits
  const { data: wolUser, error: userError } = await supabase
    .from('wol_users')
    .select('walls_limit')
    .eq('auth_id', user.id)
    .single()

  if (userError || !wolUser) {
    return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
  }

  const { count, error: countError } = await supabase
    .from('wol_walls')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 })
  }

  const currentCount = count ?? 0
  const limit = wolUser.walls_limit

  if (limit !== null && currentCount >= limit) {
    return NextResponse.json(
      { error: `You have reached your plan limit of ${limit} wall(s). Upgrade to create more.` },
      { status: 403 }
    )
  }

  // Build the slug — auto-generate if not provided, ensure uniqueness
  let finalSlug = slug ? slug.toLowerCase().trim() : generateSlug(name)

  // Check for slug collision and append a suffix if needed
  const { data: existing } = await supabase
    .from('wol_walls')
    .select('slug')
    .eq('slug', finalSlug)
    .maybeSingle()

  if (existing) {
    finalSlug = `${finalSlug}-${Date.now()}`
  }

  const { data: wall, error: insertError } = await supabase
    .from('wol_walls')
    .insert({
      user_id: user.id,
      name: name.trim(),
      description: description?.trim() ?? null,
      slug: finalSlug,
      is_active: true,
    })
    .select()
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ wall }, { status: 201 })
}
