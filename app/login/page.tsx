'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setMessage('注册成功！请登录')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      const redirect = searchParams.get('redirect') || '/'
      router.push(redirect)
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2">登录</h1>
        <p className="text-neutral-400 mb-8">登录后下单并追踪订单</p>

        {message && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {message}
          </div>
        )}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              placeholder="输入密码"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <p className="text-sm text-neutral-500 mt-6 text-center">
          没有账户？{' '}
          <Link href="/register" className="text-white hover:underline">注册</Link>
        </p>
      </div>
    </div>
  )
}
