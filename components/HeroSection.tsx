'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Very subtle base tint, not a full black overlay */}
      <div className="absolute inset-0 bg-neutral-950/20" />

      {/* Decorative side posters - full color, behind text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 max-w-[320px] z-[1] pointer-events-none">
        <Image
          src="/images/postA.jpg"
          alt=""
          width={400}
          height={600}
          className="w-full h-auto opacity-85 hover:opacity-100 transition-opacity duration-500"
        />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/4 max-w-[320px] z-[1] pointer-events-none">
        <Image
          src="/images/postB.jpg"
          alt=""
          width={400}
          height={600}
          className="w-full h-auto opacity-85 hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      {/* Center text with a subtle dark backing for readability */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        <div className="bg-neutral-950/50 backdrop-blur-sm rounded-3xl px-10 py-12 inline-block">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
            专业<span className="text-blue-400">捡球</span>器
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-xl mx-auto">
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
              className="px-8 py-3 border border-white/40 text-white rounded-full font-medium hover:border-white hover:bg-white/10 transition-colors"
            >
              官网购买
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-500 z-10"
      >
        ↓ 向下滚动
      </motion.div>
    </section>
  )
}
