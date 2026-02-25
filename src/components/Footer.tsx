import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white py-8 border-t-4 border-[#DA251D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-bold text-[#FFFF00] uppercase tracking-wider">Việt Nam Ăn Gì</h3>
            <p className="text-sm text-gray-400 mt-1">Hệ thống thẩm định ẩm thực TT.DPĐ</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">© 2026 VietFood Scan. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-1">Tôn vinh giá trị văn hóa ẩm thực Việt</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
