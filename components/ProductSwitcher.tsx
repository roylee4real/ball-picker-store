'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PRODUCTS } from '@/lib/constants'

const productImages: Record<string, string> = {
  'tennis-ball-picker': '/images/pingpong01.jpg',
  'pingpong-ball-picker': '/images/pingpong01.jpg',
}

export default function ProductSwitcher() {
  const [active, setActive] = useState(0)
  const product = PRODUCTS[active]

  return (
    <div className="min-h-screen">
      {/* Screen 1: Hero image */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black" />
        <motion.div
          key={product.id + '-hero'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center px-4"
        >
          <div className="w-80 h-80 relative mx-auto mb-10 overflow-hidden rounded-2xl">
            <Image
              src={productImages[product.id]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-neutral-400 mb-8">{product.description}</p>
          <div className="text-3xl font-bold">¥{product.price}</div>
        </motion.div>
      </section>

      {/* Screen 2: Features */}
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-12">核心特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-6"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                <span className="text-lg">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screen 3: Specs */}
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-12">规格参数</h2>
          <div className="grid grid-cols-2 gap-1">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="bg-neutral-900 p-8 flex justify-between items-center">
                <span className="text-neutral-400">{k}</span>
                <span className="font-semibold text-lg">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screen 4: Buy CTA */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">准备好提升训练效率了吗？</h2>
          <p className="text-neutral-400 mb-8">{product.name} — ¥{product.price}</p>
          <a
            href={`/order?product=${product.id}`}
            className="inline-block px-10 py-4 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-400 transition-colors text-lg"
          >
            立即购买
          </a>
        </div>
      </section>

      {/* Product switcher dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {PRODUCTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === active ? 'bg-white scale-150' : 'bg-neutral-600 hover:bg-neutral-400'
            }`}
            aria-label={p.name}
          />
        ))}
      </div>
    </div>
  )
}
