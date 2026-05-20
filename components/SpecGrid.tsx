'use client'

import { motion } from 'framer-motion'

const specs = [
  { label: '重量', value: '1 kg' },
  { label: '长度', value: '85 cm' },
  { label: '材质', value: 'PVC+金属' },
  { label: '容量', value: '30+ 球' },
]

export default function SpecGrid() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-16">产品参数</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {specs.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-neutral-900 p-8 text-center"
          >
            <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-sm text-neutral-500">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
