'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabase } from '@/lib/supabase/server'
import { PRODUCTS, SHIPPING_METHODS } from '@/lib/constants'

export async function createOrder(formData: FormData) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '请先登录' }
  }

  const productId = formData.get('product_id') as string
  const product = PRODUCTS.find(p => p.id === productId)
  if (!product) {
    return { error: '无效的产品' }
  }

  const quantity = parseInt(formData.get('quantity') as string) || 1
  if (quantity < 1 || quantity > 100) {
    return { error: '无效的数量' }
  }

  const shippingId = formData.get('shipping_method') as string || 'standard'
  const shipping = SHIPPING_METHODS.find(s => s.id === shippingId)
  if (!shipping) {
    return { error: '无效的快递方式' }
  }

  // Calculate total server-side — do NOT trust client-supplied amount
  const total_amount = product.price * quantity + shipping.price

  const order = {
    user_id: user.id,
    product: product.name,
    quantity,
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    address: formData.get('address') as string,
    shipping_method: shippingId,
    payment_method: formData.get('payment_method') as string || 'manual',
    notes: formData.get('notes') as string || '',
    status: 'pending' as const,
    total_amount,
  }

  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/orders')
  return { orderId: data.id }
}
