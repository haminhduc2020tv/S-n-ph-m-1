import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ChefHat, ScrollText, Utensils, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { AnalysisResponse, DishResult } from '../services/gemini';

interface ResultDisplayProps {
  data: AnalysisResponse;
  imageSrc: string;
  onReset: () => void;
}

export default function ResultDisplay({ data, imageSrc, onReset }: ResultDisplayProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle error case (Not Vietnamese food)
  if (data.thong_bao_loi || !data.danh_sach_ket_qua || data.danh_sach_ket_qua.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 border-2 border-[#DA251D]/20"
        >
          <div className="w-full h-64 mb-8 rounded-2xl overflow-hidden bg-gray-100 mx-auto max-w-md shadow-inner">
            <img src={imageSrc} alt="Uploaded" className="w-full h-full object-contain" />
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-red-100 rounded-full text-[#DA251D]">
              <AlertCircle className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Thông báo từ TT.DPĐ</h2>
            <p className="text-lg text-gray-600 italic max-w-lg mx-auto">
              "{data.thong_bao_loi || "Thành thật xin lỗi !!! Quý khách ơi, bạn giùm xem lại ảnh có đúng món ăn Văn Hoá Việt Nam không ạ . Xin cảm ơn vì đã sử dụng dịch vụ !!!!!"}"
            </p>
            
            <button
              onClick={onReset}
              className="mt-6 px-8 py-3 bg-[#DA251D] text-white font-bold rounded-full hover:bg-[#B41F18] transition-colors shadow-lg"
            >
              Quét ảnh khác
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const selectedDish = data.danh_sach_ket_qua[selectedIndex];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image & Selection List */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-[#FFFF00]"
          >
            <div className="relative aspect-square bg-gray-100">
              <img src={imageSrc} alt="Uploaded" className="w-full h-full object-cover" />
            </div>
            
            <div className="p-6 bg-[#DA251D] text-white">
              <h3 className="text-lg font-bold uppercase mb-4 border-b border-white/20 pb-2">
                Kết quả thẩm định ({data.danh_sach_ket_qua.length})
              </h3>
              
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {data.danh_sach_ket_qua.map((dish, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${
                      index === selectedIndex
                        ? 'bg-[#FFFF00] text-[#DA251D] font-bold shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <span className="truncate">{dish.ten}</span>
                    {index === selectedIndex && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <button
            onClick={onReset}
            className="w-full py-4 bg-white border-2 border-[#DA251D] text-[#DA251D] font-bold rounded-xl hover:bg-[#DA251D] hover:text-white transition-all shadow-md uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Utensils className="w-5 h-5" />
            Quét ảnh khác
          </button>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DishDetailCard dish={selectedDish} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function DishDetailCard({ dish }: { dish: DishResult }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#DA251D] font-serif uppercase mb-2">
            {dish.ten}
          </h2>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-[#009900]" />
            <span className="font-medium text-lg">{dish.nguon_goc}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#FFFF00]/20 px-4 py-2 rounded-full border border-[#FFFF00]">
          <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Độ chính xác</span>
          <span className="text-2xl font-bold text-[#DA251D]">{dish.do_chinh_xac}%</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* Story */}
        <section>
          <div className="flex items-center gap-3 mb-4 text-[#DA251D]">
            <ScrollText className="w-6 h-6" />
            <h3 className="text-xl font-bold uppercase tracking-wide">Nghệ thuật & Câu chuyện</h3>
          </div>
          <div className="bg-[#FDFBF7] p-6 rounded-2xl border-l-4 border-[#DA251D]">
            <p className="text-gray-800 leading-relaxed italic text-lg">
              "{dish.nghe_thuat_cau_truyen}"
            </p>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <section>
            <div className="flex items-center gap-3 mb-4 text-[#009900]">
              <ChefHat className="w-6 h-6" />
              <h3 className="text-xl font-bold uppercase tracking-wide">Nguyên liệu chính</h3>
            </div>
            <ul className="space-y-3 bg-gray-50 p-6 rounded-2xl">
              {dish.nguyen_lieu.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-[#009900] rounded-full mt-2 flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* How to Eat */}
          <section>
            <div className="flex items-center gap-3 mb-4 text-[#DA251D]">
              <Utensils className="w-6 h-6" />
              <h3 className="text-xl font-bold uppercase tracking-wide">Cách ăn chuẩn vị</h3>
            </div>
            <ul className="space-y-3 bg-gray-50 p-6 rounded-2xl">
              {dish.cach_an_chuan_vi.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#DA251D] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Preparation */}
        <section>
           <div className="flex items-center gap-3 mb-4 text-gray-800">
              <div className="p-2 bg-gray-100 rounded-lg">
                <ChefHat className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide">Quy trình chế biến</h3>
            </div>
          <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
            {dish.che_bien}
          </p>
        </section>
      </div>
    </div>
  );
}
