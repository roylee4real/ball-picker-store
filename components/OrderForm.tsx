'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PRODUCTS, SHIPPING_METHODS } from '@/lib/constants'
import { createOrder } from '@/lib/actions/orders'
import PaymentModal from './PaymentModal'

export default function OrderForm() {
  const searchParams = useSearchParams()
  const preselected = searchParams.get('product') || 'tennis-ball-picker'
  const product = PRODUCTS.find(p => p.id === preselected) || PRODUCTS[0]
  const router = useRouter()

  const [quantity, setQuantity] = useState(1)
  const [shipping, setShipping] = useState('standard')
  const [formError, setFormError] = useState('')
  const [orderId, setOrderId] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const shippingCost = SHIPPING_METHODS.find(s => s.id === shipping)?.price || 0
  const total = product.price * quantity + shippingCost

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError('')
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    formData.set('product_id', product.id)
    formData.set('shipping_method', shipping)

    const result = await createOrder(formData)

    if (result.error) {
      setFormError(result.error)
      setSubmitting(false)
    } else if (result.orderId) {
      setOrderId(result.orderId)
      setShowPayment(true)
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-2">下单</h1>
        <p className="text-neutral-400 mb-8">填写信息，完成购买</p>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-neutral-800 rounded-lg flex items-center justify-center text-2xl">
            🎾
          </div>
          <div>
            <div className="font-semibold">{product.name}</div>
            <div className="text-sm text-neutral-400">¥{product.price} / 件</div>
          </div>
        </div>

        {formError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-300 mb-1">姓名 *</label>
              <input name="name" required className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-white" />
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-1">手机号 *</label>
              <input name="phone" required type="tel" className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">邮箱 *</label>
            <input name="email" required type="email" className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-white" />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">收货地址 *</label>
            <textarea name="address" required rows={2} className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-white resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-300 mb-1">数量</label>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-neutral-800 rounded-lg text-white">−</button>
                <input name="quantity" value={quantity} readOnly className="w-16 text-center px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white" />
                <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-neutral-800 rounded-lg text-white">+</button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-1">快递方式</label>
              <select name="shipping" value={shipping} onChange={e => setShipping(e.target.value)} className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none">
                {SHIPPING_METHODS.map(s => (
                  <option key={s.id} value={s.id}>{s.name} {s.price > 0 ? `+¥${s.price}` : '免费'}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">备注</label>
            <textarea name="notes" rows={2} className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-white resize-none" placeholder="选填" />
          </div>

          <div className="border-t border-neutral-800 pt-4 flex justify-between items-center">
            <span className="text-neutral-400">合计</span>
            <span className="text-2xl font-bold">¥{total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors text-lg disabled:opacity-50"
          >
            {submitting ? '提交中...' : '提交订单'}
          </button>
        </form>

        {showPayment && orderId && (
          <PaymentModal
            orderId={orderId}
            total={total}
            onClose={() => {
              setShowPayment(false)
              router.push('/orders')
            }}
          />
        )}
      </div>
    </div>
  )
}
