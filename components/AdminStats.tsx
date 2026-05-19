interface Props {
  stats: { total: number; pending: number; paid: number; confirmed: number; completed: number; cancelled: number }
}

export default function AdminStats({ stats }: Props) {
  const cards = [
    { label: '总订单', value: stats.total, color: 'text-blue-400' },
    { label: '待付款', value: stats.pending, color: 'text-yellow-400' },
    { label: '已付款', value: stats.paid, color: 'text-blue-400' },
    { label: '已确认', value: stats.confirmed, color: 'text-green-400' },
    { label: '已完成', value: stats.completed, color: 'text-purple-400' },
    { label: '已取消', value: stats.cancelled, color: 'text-red-400' },
  ]

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
      {cards.map(c => (
        <div key={c.label} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
          <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
          <div className="text-xs text-neutral-500 mt-1">{c.label}</div>
        </div>
      ))}
    </div>
  )
}
