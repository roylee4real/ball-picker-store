'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_#ffffff10_0%,_transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          专业<span className="text-blue-400">捡球</span>器
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-xl mx-auto">
          网球 · 乒乓球 — 高效训练，一器搞定。PVC+金属材质，一次收集 30+ 个球。
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/product"
            className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
          >
            了解产品
          </Link>
          <Link
            href="/order"
            className="px-8 py-3 border border-neutral-600 text-white rounded-full font-medium hover:border-white transition-colors"
          >
            官网购买
          </Link>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-600"
      >
        ↓ 向下滚动
      </motion.div>
    </section>
  )
}
