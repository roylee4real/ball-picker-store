import { createServerSupabase } from '@/lib/supabase/server'
import OrderStatusBadge from '@/components/OrderStatusBadge'

export default function OrdersPage() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">我的订单</h1>
        <OrdersContent />
      </div>
    </div>
  )
}

async function OrdersContent() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-400 mb-4">请先登录查看订单</p>
        <a href="/login?redirect=/orders" className="text-blue-400 hover:underline">去登录 →</a>
      </div>
    )
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-400 mb-4">暂无订单</p>
        <a href="/order" className="text-blue-400 hover:underline">去下单 →</a>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-sm text-neutral-400">订单号 </span>
              <span className="text-sm font-mono">{order.id.slice(0, 8)}</span>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div><span className="text-neutral-500">产品</span><br />{order.product}</div>
            <div><span className="text-neutral-500">数量</span><br />{order.quantity} 件</div>
            <div><span className="text-neutral-500">金额</span><br />¥{order.total_amount}</div>
            <div><span className="text-neutral-500">时间</span><br />{new Date(order.created_at).toLocaleDateString('zh-CN')}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
