'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/login?registered=true')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2">创建账户</h1>
        <p className="text-neutral-400 mb-8">注册以下单并追踪订单</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">邮箱</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">密码</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              placeholder="至少 6 位"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>

        <p className="text-sm text-neutral-500 mt-6 text-center">
          已有账户？{' '}
          <Link href="/login" className="text-white hover:underline">登录</Link>
        </p>
      </div>
    </div>
  )
}
