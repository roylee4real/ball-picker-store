export const PRODUCTS = [
  {
    id: 'tennis-ball-picker',
    name: '网球捡球器',
    description: '高效捡球，省时省力。适用于标准网球场，一次可收集 30+ 个球。',
    price: 399,
    features: ['PVC+金属配件', '一次收集 30+ 球', '轻量化握把', '可当球框'],
    specs: { 重量: '1 kg', 长度: '85 cm', 材质: 'PVC+金属', 容量: '30+ 球' },
  },
  {
    id: 'pingpong-ball-picker',
    name: '乒乓球捡球器',
    description: '精准拾取，不伤球面。适用于乒乓球训练场，快速回收散落球。',
    price: 239,
    features: ['简单易用', '不伤球面', '轻便携带', '100+ 球大容量'],
    specs: { 重量: '0.8 kg', 长度: '60 cm', 材质: 'PVC+金属', 容量: '100+ 球' },
  },
] as const

export const SHIPPING_METHODS = [
  { id: 'standard', name: '中通快递', price: 0 },
  { id: 'express', name: '顺丰快递', price: 35 },
] as const
