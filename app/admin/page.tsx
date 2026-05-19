import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase/server'
import AdminStats from '@/components/AdminStats'
import AdminOrderTable from '@/components/AdminOrderTable'

export default async function AdminPage() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/admin')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">无权限访问</h1>
          <p className="text-neutral-400">您不是管理员</p>
        </div>
      </div>
    )
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  const stats = {
    total: orders?.length || 0,
    pending: orders?.filter(o => o.status === 'pending').length || 0,
    paid: orders?.filter(o => o.status === 'paid').length || 0,
    confirmed: orders?.filter(o => o.status === 'confirmed').length || 0,
    completed: orders?.filter(o => o.status === 'completed').length || 0,
    cancelled: orders?.filter(o => o.status === 'cancelled').length || 0,
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">后台管理</h1>
        <AdminStats stats={stats} />
        <AdminOrderTable orders={orders || []} />
      </div>
    </div>
  )
}
