'use client'

import { useState } from 'react'
import OrderStatusBadge from './OrderStatusBadge'

interface Order {
  id: string
  product: string
  quantity: number
  name: string
  phone: string
  address: string
  shipping_method: string
  payment_method: string
  status: string
  total_amount: number
  notes: string
  created_at: string
}

interface Props {
  orders: Order[]
}

const nextStatus: Record<string, string> = {
  pending: 'paid',
  paid: 'confirmed',
  confirmed: 'completed',
}

export default function AdminOrderTable({ orders: initialOrders }: Props) {
  const [orders, setOrders] = useState(initialOrders)
  const [updating, setUpdating] = useState<string | null>(null)

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdating(orderId)
    const res = await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status: newStatus }),
    })
    if (res.ok) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    } else {
      const data = await res.json().catch(() => ({}))
      alert(data.error || '更新失败')
    }
    setUpdating(null)
  }

  const statusLabel: Record<string, string> = {
    paid: '已付款',
    confirmed: '已确认',
    completed: '已完成',
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-500 border-b border-neutral-800">
            <th className="py-3 pr-4 font-medium">订单号</th>
            <th className="py-3 pr-4 font-medium">客户</th>
            <th className="py-3 pr-4 font-medium">产品</th>
            <th className="py-3 pr-4 font-medium">数量</th>
            <th className="py-3 pr-4 font-medium">金额</th>
            <th className="py-3 pr-4 font-medium">地址</th>
            <th className="py-3 pr-4 font-medium">付款</th>
            <th className="py-3 pr-4 font-medium">状态</th>
            <th className="py-3 pr-4 font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-b border-neutral-800/50">
              <td className="py-3 pr-4 font-mono text-xs">{o.id.slice(0, 8)}</td>
              <td className="py-3 pr-4">
                <div>{o.name}</div>
                <div className="text-xs text-neutral-500">{o.phone}</div>
              </td>
              <td className="py-3 pr-4">{o.product}</td>
              <td className="py-3 pr-4">{o.quantity}</td>
              <td className="py-3 pr-4">¥{o.total_amount}</td>
              <td className="py-3 pr-4 max-w-[120px] truncate" title={o.address}>{o.address}</td>
              <td className="py-3 pr-4 text-xs">{o.payment_method}</td>
              <td className="py-3 pr-4"><OrderStatusBadge status={o.status} /></td>
              <td className="py-3 pr-4">
                {nextStatus[o.status] && (
                  <button
                    onClick={() => handleStatusUpdate(o.id, nextStatus[o.status])}
                    disabled={updating === o.id}
                    className="text-xs px-3 py-1 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    标记为 {statusLabel[nextStatus[o.status]]}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
