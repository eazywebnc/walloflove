import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/testimonials?wallId=xxx
// Authenticated users see all statuses for their own wall.
// Public (no auth) only sees approved testimonials.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const wallId = searchParams.get('wallId')

  if (!wallId) {
    return NextResponse.json({ error: 'wallId query param is required' }, { status: 400 })
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let query = supabase
    .from('wol_testimonials')
    .select('*')
    .eq('wall_id', wallId)
    .order('created_at', { ascending: false })

  if (user) {
    // Authenticated: verify ownership, then return all statuses
    const { data: wall } = await supabase
      .from('wol_walls')
      .select('user_id')
      .eq('id', wallId)
      .single()

    if (wall && wall.user_id === user.id) {
      // Owner: all testimonials
    } else {
      // Authenticated but not owner: only approved
      query = query.eq('status', 'approved')
    }
  } else {
    // Public: only approved
    query = query.eq('status', 'approved')
  }

  const { data: testimonials, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ testimonials })
}

// POST /api/testimonials — public form submission
export async function POST(req: NextRequest) {
  let body: {
    wallId?: string
    authorName?: string
    authorEmail?: string
    content?: string
    rating?: number
    authorTitle?: string
    authorCompany?: string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { wallId, authorName, authorEmail, content, rating, authorTitle, authorCompany } = body

  if (!wallId) return NextResponse.json({ error: 'wallId is required' }, { status: 400 })
  if (!authorName?.trim()) return NextResponse.json({ error: 'authorName is required' }, { status: 400 })
  if (!content?.trim()) return NextResponse.json({ error: 'content is required' }, { status: 400 })

  if (rating !== undefined && (rating < 1 || rating > 5 || !Number.isInteger(rating))) {
    return NextResponse.json({ error: 'rating must be an integer between 1 and 5' }, { status: 400 })
  }

  // Use admin client so no auth is required on the public form
  const admin = createAdminClient()

  // Verify the wall exists and is active
  const { data: wall, error: wallError } = await admin
    .from('wol_walls')
    .select('id, is_active, user_id')
    .eq('id', wallId)
    .single()

  if (wallError || !wall) {
    return NextResponse.json({ error: 'Wall not found' }, { status: 404 })
  }

  if (!wall.is_active) {
    return NextResponse.json({ error: 'This wall is not accepting testimonials' }, { status: 403 })
  }

  // Check testimonials_limit for the wall owner
  const { data: wolUser } = await admin
    .from('wol_users')
    .select('testimonials_limit')
    .eq('auth_id', wall.user_id)
    .single()

  if (wolUser?.testimonials_limit !== null && wolUser?.testimonials_limit !== undefined) {
    const { count } = await admin
      .from('wol_testimonials')
      .select('*', { count: 'exact', head: true })
      .eq('wall_id', wallId)

    if ((count ?? 0) >= wolUser.testimonials_limit) {
      return NextResponse.json(
        { error: 'This wall has reached its testimonial limit' },
        { status: 403 }
      )
    }
  }

  const { data: testimonial, error: insertError } = await admin
    .from('wol_testimonials')
    .insert({
      wall_id: wallId,
      author_name: authorName.trim(),
      author_email: authorEmail?.trim() ?? null,
      content: content.trim(),
      rating: rating ?? null,
      author_title: authorTitle?.trim() ?? null,
      author_company: authorCompany?.trim() ?? null,
      status: 'pending',
      type: 'text',
    })
    .select()
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ testimonial }, { status: 201 })
}

// PATCH /api/testimonials — update status (auth required + ownership)
export async function PATCH(req: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { id?: string; status?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { id, status } = body

  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
  if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
    return NextResponse.json(
      { error: 'status must be one of: pending, approved, rejected' },
      { status: 400 }
    )
  }

  // Verify the testimonial belongs to a wall owned by the user
  const { data: testimonial, error: fetchError } = await supabase
    .from('wol_testimonials')
    .select('id, wall_id, wol_walls!inner(user_id)')
    .eq('id', id)
    .single()

  if (fetchError || !testimonial) {
    return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wallUserId = (testimonial as any).wol_walls?.user_id
  if (wallUserId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data: updated, error: updateError } = await supabase
    .from('wol_testimonials')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ testimonial: updated })
}
