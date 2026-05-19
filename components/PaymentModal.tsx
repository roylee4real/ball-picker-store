'use client'

import { useState } from 'react'

interface Props {
  orderId: string
  total: number
  onClose: () => void
}

export default function PaymentModal({ orderId, total, onClose }: Props) {
  const [method, setMethod] = useState<'paypal' | 'manual' | null>(null)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">选择付款方式</h2>
        <p className="text-neutral-400 text-sm mb-6">订单 #{orderId.slice(0, 8)} — ¥{total.toFixed(2)}</p>

        {!method ? (
          <div className="space-y-3">
            <button
              onClick={() => setMethod('paypal')}
              className="w-full p-4 bg-blue-600/10 border border-blue-600/30 rounded-xl text-left hover:border-blue-500 transition-colors"
            >
              <div className="font-semibold">🅿️ PayPal</div>
              <div className="text-sm text-neutral-400">在线支付 · 即时到账</div>
            </button>
            <button
              onClick={() => setMethod('manual')}
              className="w-full p-4 bg-green-600/10 border border-green-600/30 rounded-xl text-left hover:border-green-500 transition-colors"
            >
              <div className="font-semibold">📱 支付宝 / 微信</div>
              <div className="text-sm text-neutral-400">扫码转账 · 管理员手动确认</div>
            </button>
          </div>
        ) : method === 'paypal' ? (
          <div className="space-y-4">
            <p className="text-sm text-neutral-300">点击下方按钮跳转至 PayPal 付款：</p>
            <a
              href={`https://paypal.me/yourpaypal?amount=${total}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-[#0070ba] text-white rounded-lg font-medium text-center hover:bg-[#003087] transition-colors"
            >
              前往 PayPal 付款
            </a>
            <p className="text-xs text-neutral-500">付款完成后请告知管理员确认，或在订单页查看状态更新。</p>
            <button onClick={onClose} className="text-sm text-neutral-400 hover:text-white">完成，查看订单</button>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-sm text-neutral-300">请扫描下方收款码转账 ¥{total.toFixed(2)}</p>
            <div className="w-48 h-48 bg-neutral-800 rounded-xl mx-auto flex items-center justify-center text-neutral-600 text-sm">
              [收款二维码]
            </div>
            <p className="text-xs text-neutral-500">转账后请联系管理员确认。订单状态将在确认后更新。</p>
            <button onClick={onClose} className="text-sm text-neutral-400 hover:text-white">完成，查看订单</button>
          </div>
        )}
      </div>
    </div>
  )
}
