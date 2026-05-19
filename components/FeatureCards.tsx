'use client'

import { motion } from 'framer-motion'

const features = [
  { icon: '⚡', title: '高效捡球', desc: '一次收集 20+ 球，训练不中断' },
  { icon: '🪶', title: '轻量耐用', desc: '铝合金材质，1.2kg 轻便携带' },
  { icon: '🖐️', title: '人体工学', desc: '舒适握把，久握不累手' },
  { icon: '🛡️', title: '防锈处理', desc: '表面阳极氧化，室内外通用' },
]

export default function FeatureCards() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-16">为什么选择 BallPicker</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 transition-colors"
          >
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-neutral-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
