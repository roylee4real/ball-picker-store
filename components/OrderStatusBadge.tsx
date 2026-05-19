const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: '待付款', color: 'bg-yellow-500/20 text-yellow-400' },
  paid: { label: '已付款', color: 'bg-blue-500/20 text-blue-400' },
  confirmed: { label: '已确认', color: 'bg-green-500/20 text-green-400' },
  completed: { label: '已完成', color: 'bg-purple-500/20 text-purple-400' },
  cancelled: { label: '已取消', color: 'bg-red-500/20 text-red-400' },
}

export default function OrderStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || { label: status, color: 'bg-neutral-500/20 text-neutral-400' }

  return (
    <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${config.color}`}>
      {config.label}
    </span>
  )
}
