import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-12 border-t-8 border-[#DA251D]"
      >
        <h1 className="text-4xl font-bold text-[#DA251D] mb-8 text-center font-serif uppercase">Về Hệ Thống TT.DPĐ</h1>
        
        <div className="prose prose-lg mx-auto text-gray-700 space-y-6">
          <p className="text-xl font-medium leading-relaxed text-center italic text-gray-900">
            "Bảo tồn hương vị - Gìn giữ tinh hoa"
          </p>
          
          <p>
            Hệ thống <strong>TT.DPĐ (Trung Tâm Di Sản Phẩm Định)</strong> là một dự án tâm huyết nhằm số hóa và bảo tồn các giá trị ẩm thực truyền thống của Việt Nam. Chúng tôi sử dụng công nghệ trí tuệ nhân tạo tiên tiến (Gemini AI) kết hợp với kho dữ liệu văn hóa sâu rộng để không chỉ nhận diện món ăn mà còn kể lại câu chuyện lịch sử đằng sau mỗi hương vị.
          </p>

          <h3 className="text-2xl font-bold text-[#009900] mt-8">Sứ mệnh của chúng tôi</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Giúp người dùng hiểu đúng về nguồn gốc và cách thưởng thức món ăn Việt.</li>
            <li>Quảng bá hình ảnh ẩm thực Việt Nam đến bạn bè quốc tế.</li>
            <li>Lưu trữ dữ liệu chuẩn xác về các công thức và biến tấu vùng miền.</li>
          </ul>

          <div className="mt-12 p-6 bg-[#FFFF00]/10 rounded-xl border border-[#FFFF00]">
            <p className="text-sm text-center text-gray-600">
              Dự án được phát triển với niềm tự hào dân tộc và tình yêu vô bờ bến dành cho nền ẩm thực nước nhà.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
