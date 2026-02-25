import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUpload from './components/ImageUpload';
import ResultDisplay from './components/ResultDisplay';
import LoadingOverlay from './components/LoadingOverlay';
import Explore from './components/Explore';
import About from './components/About';
import { analyzeImage, AnalysisResponse } from './services/gemini';
import { motion, AnimatePresence } from 'motion/react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageSelect = async (file: File) => {
    setIsLoading(true);
    
    // Convert to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result as string;
      setUploadedImage(base64);
      
      // Extract base64 data part
      const base64Data = base64.split(',')[1];
      
      try {
        const result = await analyzeImage(base64Data, file.type);
        setAnalysisResult(result);
      } catch (error) {
        console.error("Analysis failed", error);
        alert("Có lỗi xảy ra trong quá trình thẩm định. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {isLoading && <LoadingOverlay />}
          
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              {!analysisResult ? (
                <div className="relative">
                  {/* Hero Section */}
                  <div className="relative text-white py-32 px-4 overflow-hidden min-h-[80vh] flex flex-col justify-center items-center">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <motion.img 
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 20, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1557750255-c76072a7bb56?q=80&w=2000&auto=format&fit=crop" 
                        alt="Vietnam Landscape" 
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
                    </div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                      <motion.h1 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-7xl font-bold mb-6 font-serif uppercase tracking-tight drop-shadow-lg"
                      >
                        Quét ảnh <span className="text-[#FFFF00]">Ẩm Thực Việt</span>
                      </motion.h1>
                      <p className="text-xl md:text-3xl mb-12 font-light opacity-90 drop-shadow-md">
                        Khám phá nguồn gốc, ý nghĩa và tinh hoa văn hóa trong từng món ăn
                      </p>
                      
                      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl">
                        <ImageUpload onImageSelect={handleImageSelect} />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Food Strip */}
                  <div className="h-24 bg-[#FFFF00] w-full flex items-center justify-around overflow-hidden opacity-90">
                     {/* Placeholder for decorative food patterns/icons */}
                     <div className="text-[#DA251D] font-bold text-lg opacity-20 uppercase tracking-[0.5em] whitespace-nowrap">
                        Phở • Bánh Mì • Bún Bò • Gỏi Cuốn • Cơm Tấm • Bánh Xèo • Chả Giò
                     </div>
                  </div>
                  
                  {/* Features Grid */}
                  <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
                    {[
                      { title: "Nhận diện AI", desc: "Công nghệ Gemini Vision phân tích chính xác từng nguyên liệu." },
                      { title: "Thẩm định Văn hóa", desc: "Cung cấp thông tin lịch sử và ý nghĩa sâu sắc của món ăn." },
                      { title: "Chuẩn vị TT.DPĐ", desc: "Dữ liệu được kiểm duyệt bởi các chuyên gia ẩm thực hàng đầu." }
                    ].map((feature, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-[#009900] hover:shadow-xl transition-all hover:-translate-y-1"
                      >
                        <h3 className="text-xl font-bold text-[#009900] mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <ResultDisplay 
                  data={analysisResult} 
                  imageSrc={uploadedImage!} 
                  onReset={handleReset} 
                />
              )}
            </motion.div>
          )}

          {activeTab === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Explore />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <About />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
