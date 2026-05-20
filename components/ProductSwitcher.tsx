'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS } from '@/lib/constants'

const productImages: Record<string, string[]> = {
  'tennis-ball-picker': [],
  'pingpong-ball-picker': [
    '/images/pingpong01.jpg',
    '/images/pingpong02.jpg',
    '/images/pingpong03.jpg',
    '/images/pingpong04.jpg',
  ],
}

const productVideo: Record<string, string | null> = {
  'tennis-ball-picker': null,
  'pingpong-ball-picker': '/images/pingpongvd.mp4',
}

export default function ProductSwitcher() {
  const [active, setActive] = useState(1) // default to pingpong since it has images
  const [imgIndex, setImgIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const product = PRODUCTS[active]
  const images = productImages[product.id]
  const video = productVideo[product.id]

  const nextImage = () => setImgIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setImgIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="min-h-screen">
      {/* Product tabs */}
      <div className="fixed top-20 left-0 right-0 z-40 flex justify-center">
        <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-full p-1 flex">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setActive(i); setImgIndex(0); setShowVideo(false) }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                i === active ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Screen 1: Image Gallery */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black" />
        <div className="relative z-10 text-center px-4 w-full max-w-2xl mx-auto">
          {images.length > 0 ? (
            <>
              {/* Main image / video */}
              <div className="relative w-full aspect-square max-w-lg mx-auto mb-8 overflow-hidden rounded-2xl bg-neutral-900">
                <AnimatePresence mode="wait">
                  {showVideo && video ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full"
                    >
                      <video
                        src={video}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                        playsInline
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={imgIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={images[imgIndex]}
                        alt={`${product.name} - 图片 ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Left/Right arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                >
                  →
                </button>

                {/* Video toggle button */}
                {video && (
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      showVideo ? 'bg-white text-black' : 'bg-black/60 text-white hover:bg-black/80'
                    }`}
                  >
                    {showVideo ? '查看图片' : '▶ 视频'}
                  </button>
                )}
              </div>

              {/* Thumbnail dots */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setImgIndex(i); setShowVideo(false) }}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      i === imgIndex && !showVideo ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`缩略图 ${i + 1}`}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
                {video && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center bg-neutral-800 ${
                      showVideo ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <span className="text-lg">▶</span>
                  </button>
                )}
              </div>

              <div className="text-sm text-neutral-500">
                {showVideo ? '视频演示' : `${imgIndex + 1} / ${images.length}`}
              </div>
            </>
          ) : (
            <div className="w-full aspect-square max-w-lg mx-auto mb-8 rounded-2xl bg-neutral-800 flex items-center justify-center text-8xl">
              🎾
            </div>
          )}

          <motion.div
            key={product.id + '-info'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-neutral-400 mb-6">{product.description}</p>
            <div className="text-3xl font-bold text-blue-400">¥{product.price}</div>
          </motion.div>
        </div>
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
    </div>
  )
}
