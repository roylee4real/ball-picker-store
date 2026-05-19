import OrderForm from '@/components/OrderForm'
import AuthGuard from '@/components/AuthGuard'

export default function OrderPage() {
  return (
    <AuthGuard>
      <OrderForm />
    </AuthGuard>
  )
}
