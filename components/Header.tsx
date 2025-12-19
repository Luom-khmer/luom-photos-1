import React from 'react';
import { Home, LogIn, Copy, Mail, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Thay đổi URL về gốc mà không reload trang (xóa query params và hash)
    window.history.pushState({}, '', window.location.pathname);
    // Bắn sự kiện popstate để App.tsx bắt được và cập nhật giao diện về trang tạo album
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header className="bg-[#1b5e20] text-white py-3 px-4 shadow-md z-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          {/* Logo click cũng về trang chủ */}
          <div className="flex flex-col cursor-pointer" onClick={handleHomeClick}>
            <h1 className="text-2xl font-bold tracking-tight text-yellow-400 drop-shadow-sm flex items-center">
              {/* Logo Image */}
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" 
                alt="Luom Photos Logo" 
                className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-white/30 shadow-sm"
              />
              LUOM PHOTOS
            </h1>
            <span className="text-[10px] text-gray-200 uppercase tracking-wider ml-14 -mt-1">Chọn ảnh nhanh từ thư mục Google Drive</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex flex-wrap justify-center items-center gap-4 text-sm font-medium">
            <li>
              <a 
                href="/" 
                onClick={handleHomeClick}
                className="flex items-center hover:text-yellow-300 transition-colors"
              >
                <Home className="w-4 h-4 mr-1" />
                Trang Chủ
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-yellow-300 transition-colors">
                <LogIn className="w-4 h-4 mr-1" />
                Đăng Nhập
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-yellow-300 transition-colors">
                <Copy className="w-4 h-4 mr-1" />
                Sao Chép Ảnh
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-yellow-300 transition-colors">
                <Mail className="w-4 h-4 mr-1" />
                Liên Hệ
              </a>
            </li>
            <li className="flex items-center">
              <button className="flex items-center hover:text-yellow-300 transition-colors">
                <Globe className="w-4 h-4 mr-1" />
                <span className="ml-0.5 text-xs">▼</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};