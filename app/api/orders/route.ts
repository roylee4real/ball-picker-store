import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createAdminSupabase } from '@/lib/supabase/admin'

export async function PATCH(request: NextRequest) {
  // Verify the user is authenticated using request cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll() {},
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  // Use admin client to bypass RLS for profile check
  const adminDb = createAdminSupabase()
  const { data: profile } = await adminDb
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    return NextResponse.json({ error: '无权限' }, { status: 403 })
  }

  const { orderId, status } = await request.json()

  const { error } = await adminDb
    .from('orders')
    .update({ status })
    .eq('id', orderId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
