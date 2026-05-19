export const PRODUCTS = [
  {
    id: 'tennis-ball-picker',
    name: '网球捡球器',
    description: '高效捡球，省时省力。适用于标准网球场，一次可收集 20+ 个球。',
    price: 29.99,
    features: ['轻量铝合金材质', '一次收集 20+ 球', '符合人体工学的握把', '耐用防锈'],
    specs: { 重量: '1.2 kg', 长度: '85 cm', 材质: '铝合金', 容量: '20+ 球' },
  },
  {
    id: 'pingpong-ball-picker',
    name: '乒乓球捡球器',
    description: '精准拾取，不伤球面。适用于乒乓球训练场，快速回收散落球。',
    price: 19.99,
    features: ['软质硅胶滚轮', '不伤球面', '轻便携带', '50+ 球大容量'],
    specs: { 重量: '0.8 kg', 长度: '60 cm', 材质: '塑料+硅胶', 容量: '50+ 球' },
  },
] as const

export const SHIPPING_METHODS = [
  { id: 'standard', name: '标准快递', price: 0 },
  { id: 'express', name: '顺丰快递', price: 10 },
] as const
