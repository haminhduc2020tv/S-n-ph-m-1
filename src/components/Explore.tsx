import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DISH_DATA } from '../constants/data';
import { motion } from 'motion/react';

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = DISH_DATA.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#DA251D] mb-4 font-serif uppercase">Kho tàng Ẩm thực Việt</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Khám phá danh mục các món ăn truyền thống được hệ thống TT.DPĐ lưu trữ và thẩm định.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-16 relative">
        <input
          type="text"
          placeholder="Tìm kiếm món ăn..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-[#DA251D] focus:ring-2 focus:ring-[#DA251D]/20 outline-none transition-all shadow-sm text-lg"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((category, idx) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#009900] hover:shadow-xl transition-shadow"
          >
            <div className="bg-[#009900]/5 p-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#009900] uppercase tracking-wide">
                {category.category}
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-2 group cursor-default">
                    <span className="w-2 h-2 bg-[#FFFF00] border border-[#DA251D] rounded-full group-hover:bg-[#DA251D] transition-colors" />
                    <span className="text-gray-700 group-hover:text-[#DA251D] transition-colors font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
