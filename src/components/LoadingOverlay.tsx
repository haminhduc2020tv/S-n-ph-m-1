import React from 'react';
import { motion } from 'motion/react';
import { Loader2, Search, ChefHat, ScrollText } from 'lucide-react';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 border-4 border-t-[#FFFF00] border-r-[#DA251D] border-b-[#FFFF00] border-l-[#DA251D] rounded-full"></div>
      </motion.div>
      
      <h2 className="text-2xl font-bold mb-4 text-[#FFFF00] tracking-wider uppercase">Đang thẩm định</h2>
      
      <div className="flex flex-col gap-3 w-64">
        <LoadingStep icon={<Search className="w-5 h-5" />} text="Quét chi tiết hình ảnh..." delay={0} />
        <LoadingStep icon={<ScrollText className="w-5 h-5" />} text="Đối chiếu danh mục di sản..." delay={1.5} />
        <LoadingStep icon={<ChefHat className="w-5 h-5" />} text="Chuyên gia TT.DPĐ phân tích..." delay={3} />
      </div>
    </div>
  );
}

function LoadingStep({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-3 text-gray-300"
    >
      <span className="text-[#DA251D]">{icon}</span>
      <span className="text-sm">{text}</span>
    </motion.div>
  );
}
