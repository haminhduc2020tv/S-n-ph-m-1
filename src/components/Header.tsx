import React from 'react';
import { UtensilsCrossed, Search, Info, Camera, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'explore', label: 'Khám phá', icon: <Search className="w-4 h-4" /> },
    { id: 'about', label: 'Về chúng tôi', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-[#DA251D] text-[#FFFF00] shadow-lg sticky top-0 z-50 border-b-4 border-[#FFFF00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer gap-2"
            onClick={() => setActiveTab('home')}
          >
            <div className="bg-[#FFFF00] p-2 rounded-full border-2 border-[#DA251D]">
              <UtensilsCrossed className="h-6 w-6 text-[#DA251D]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-wider uppercase font-serif">Việt Nam Ăn Gì</span>
              <span className="text-[10px] text-white tracking-widest uppercase opacity-90">TT.DPĐ Thẩm định</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-[#FFFF00] text-[#DA251D] shadow-md transform -translate-y-0.5'
                    : 'text-white hover:bg-[#B41F18] hover:text-[#FFFF00]'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-[#FFFF00] hover:bg-[#B41F18] focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#DA251D] border-t border-[#B41F18]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-md text-base font-medium ${
                  activeTab === item.id
                    ? 'bg-[#FFFF00] text-[#DA251D]'
                    : 'text-white hover:bg-[#B41F18]'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
