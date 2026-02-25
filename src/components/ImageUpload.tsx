import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { motion } from 'motion/react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

export default function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  }, [onImageSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label
          className={`relative flex flex-col items-center justify-center w-full h-80 border-3 border-dashed rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden group ${
            isDragging
              ? 'border-[#DA251D] bg-[#DA251D]/5 scale-[1.02]'
              : 'border-gray-300 bg-white hover:border-[#DA251D] hover:bg-gray-50 hover:shadow-xl'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
          
          <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
            <div className={`p-4 rounded-full mb-4 transition-colors duration-300 ${isDragging ? 'bg-[#DA251D] text-white' : 'bg-[#DA251D]/10 text-[#DA251D] group-hover:bg-[#DA251D] group-hover:text-white'}`}>
              <Upload className="w-10 h-10" />
            </div>
            <p className="mb-2 text-xl font-semibold text-gray-700 group-hover:text-[#DA251D] transition-colors">
              <span className="font-bold">Tải ảnh lên</span> hoặc kéo thả vào đây
            </p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF (Tối đa 10MB)</p>
            <div className="mt-6 px-6 py-2 bg-[#FFFF00] text-[#DA251D] font-bold rounded-full shadow-md border border-[#DA251D] group-hover:shadow-lg transform group-hover:-translate-y-1 transition-all">
              Chọn từ thư viện
            </div>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileInput}
          />
        </label>
      </motion.div>
    </div>
  );
}
