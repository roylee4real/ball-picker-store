'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setUser(data.user)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.error('Logout failed:', err)
    }
    setMenuOpen(false)
    router.refresh()
    router.push('/')
  }

  const linkClass = "text-sm text-neutral-400 hover:text-white transition-colors duration-200"

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-neutral-800' : 'bg-transparent'
      }`}
    >
      <Link href="/" className="text-lg font-bold tracking-tight text-white">
        BallPicker
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className={linkClass}>首页</Link>
        <Link href="/product" className={linkClass}>产品</Link>
        {user ? (
          <>
            <Link href="/orders" className={linkClass}>我的订单</Link>
            <button onClick={handleLogout} className={linkClass}>退出</button>
            <span className="text-xs text-neutral-600">{user.email}</span>
          </>
        ) : (
          <>
            <Link href="/login" className={linkClass}>登录</Link>
            <Link
              href="/register"
              className="text-sm px-4 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              注册
            </Link>
          </>
        )}
      </div>

      <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '×' : '☰'}
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 border-b border-neutral-800 flex flex-col gap-4 p-6 md:hidden">
          <Link href="/" className={linkClass} onClick={() => setMenuOpen(false)}>首页</Link>
          <Link href="/product" className={linkClass} onClick={() => setMenuOpen(false)}>产品</Link>
          {user ? (
            <>
              <Link href="/orders" className={linkClass} onClick={() => setMenuOpen(false)}>我的订单</Link>
              <button onClick={handleLogout} className={`${linkClass} text-left`}>退出</button>
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass} onClick={() => setMenuOpen(false)}>登录</Link>
              <Link href="/register" className={linkClass} onClick={() => setMenuOpen(false)}>注册</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
