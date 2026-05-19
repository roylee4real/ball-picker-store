const statusMap: Record<string, { label: string; color: string }> = {
  pending:   { label: '待付款', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  paid:      { label: '已付款·待确认', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  confirmed: { label: '已确认·发货', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  completed: { label: '已完成', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  cancelled: { label: '已取消', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
}

export default function OrderStatusBadge({ status }: { status: string }) {
  const s = statusMap[status] || { label: status, color: 'bg-neutral-800 text-neutral-400 border-neutral-700' }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${s.color}`}>
      {s.label}
    </span>
  )
}
