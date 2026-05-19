'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabase } from '@/lib/supabase/server'

export async function createOrder(formData: FormData) {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: '请先登录' }
  }

  const order = {
    user_id: user.id,
    product: formData.get('product') as string,
    quantity: parseInt(formData.get('quantity') as string) || 1,
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    address: formData.get('address') as string,
    shipping_method: formData.get('shipping_method') as string || 'standard',
    payment_method: formData.get('payment_method') as string || 'manual',
    notes: formData.get('notes') as string || '',
    status: 'pending',
    total_amount: parseFloat(formData.get('total_amount') as string) || 0,
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
