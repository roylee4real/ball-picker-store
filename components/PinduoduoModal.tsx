'use client'

interface Props {
  onClose: () => void
}

export default function PinduoduoModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-6">拼多多购买指引</h2>

        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-medium">打开拼多多 APP</p>
              <p className="text-sm text-neutral-400 mt-0.5">在手机上启动拼多多应用</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-medium">点击搜索栏，选择搜索店铺</p>
              <p className="text-sm text-neutral-400 mt-0.5">在顶部搜索栏点击后，切换到"店铺"标签</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-medium">搜索"现在教育教具工坊"</p>
              <p className="text-sm text-neutral-400 mt-0.5">输入店铺名称，进店咨询下单即可</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-8 py-3 bg-neutral-800 text-white rounded-lg font-medium hover:bg-neutral-700 transition-colors"
        >
          知道了
        </button>
      </div>
    </div>
  )
}
