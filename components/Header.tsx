import React, { useState, useEffect } from 'react';
import { Home, LogIn, Copy, Mail, Globe, LogOut, User as UserIcon } from 'lucide-react';
import { auth, isFirebaseConfigured } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';

export const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Lắng nghe trạng thái đăng nhập
    // Chỉ lắng nghe nếu đã config, tránh lỗi console
    if (isFirebaseConfigured()) {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubscribe();
    }
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', window.location.pathname);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error);
      alert(`Đăng nhập thất bại: ${error.message}`);
    }
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut(auth);
      // Xóa user state thủ công cho chắc chắn
      setUser(null);
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return (
    <>
      <header className="bg-[#1b5e20] text-white py-3 px-4 shadow-md z-20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="flex flex-col cursor-pointer" onClick={handleHomeClick}>
              <h1 className="text-2xl font-bold tracking-tight text-yellow-400 drop-shadow-sm flex items-center">
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
              
              {/* Login / User Info Area */}
              {user ? (
                 <li className="relative group">
                    <button className="flex items-center hover:text-yellow-300 transition-colors focus:outline-none">
                      {user.photoURL ? (
                          <img src={user.photoURL} alt="Avatar" className="w-5 h-5 rounded-full mr-1.5 border border-white/50" />
                      ) : (
                          <UserIcon className="w-4 h-4 mr-1" />
                      )}
                      <span className="max-w-[100px] truncate md:max-w-[150px]">{user.displayName || user.email}</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block animate-in fade-in zoom-in-95 duration-200 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-xs text-gray-500 font-normal">Đăng nhập bởi</p>
                            <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                        </div>
                        <a href="#" onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                            <LogOut className="w-4 h-4 mr-2" />
                            Đăng Xuất
                        </a>
                    </div>
                 </li>
              ) : (
                 <li className="flex items-center gap-2">
                  <a href="#" onClick={handleLogin} className="flex items-center hover:text-yellow-300 transition-colors">
                    <LogIn className="w-4 h-4 mr-1" />
                    Đăng Nhập
                  </a>
                 </li>
              )}

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
    </>
  );
};