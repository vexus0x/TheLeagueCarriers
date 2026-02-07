import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, ShoppingBasket, MessageSquare, Menu, LogOut, Skull, X } from 'lucide-react';
import { UserState } from '../types';

interface NavbarProps {
  user: UserState;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-4 py-4 md:px-6 lg:px-12 flex justify-between items-center bg-gradient-to-b from-black/95 to-transparent">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 md:space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-plagueDark fill-current">
              <path d="M50 10C30 10 10 30 10 50s20 40 40 40 40-20 40-40S70 10 50 10zm0 70c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z"/>
              <circle cx="35" cy="45" r="5" />
              <circle cx="65" cy="45" r="5" />
              <path d="M30 65q20 10 40 0" stroke="currentColor" fill="none" strokeWidth="3" />
            </svg>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-[8px] md:text-[10px] font-bold tracking-widest text-white uppercase">The</span>
            <span className="text-lg md:text-2xl font-brushed text-white leading-none">PLAGUE</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a href="#" className="text-plagueDark hover:text-white transition-colors">
            <ShoppingBasket className="w-5 h-5" />
          </a>
          <a href="#" className="text-plagueDark hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
          </a>
          <a href="#" className="text-plagueDark hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          
          {user.isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="plague-button flex items-center space-x-2 text-xs">
                <img src={user.member?.avatar} className="w-5 h-5 rounded-full" alt="" />
                <span>{user.member?.name}</span>
              </Link>
              <button onClick={onLogout} className="text-plagueDark hover:text-white">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="plague-button text-xs lg:text-sm flex items-center gap-2"
            >
              <Twitter className="w-4 h-4 fill-current" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button - Always visible on mobile */}
        <button 
          className="text-white p-2 hover:text-plague transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-8 h-8" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-plagueDark fill-current">
                  <path d="M50 10C30 10 10 30 10 50s20 40 40 40 40-20 40-40S70 10 50 10zm0 70c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z"/>
                  <circle cx="35" cy="45" r="5" />
                  <circle cx="65" cy="45" r="5" />
                  <path d="M30 65q20 10 40 0" stroke="currentColor" fill="none" strokeWidth="3" />
                </svg>
              </div>
              <span className="text-xl font-brushed text-white">PLAGUE</span>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-4">
            <a href="#" className="flex items-center space-x-3 text-plagueDark hover:text-white transition-colors text-lg">
              <ShoppingBasket className="w-6 h-6" />
              <span className="font-brushed">Shop</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-plagueDark hover:text-white transition-colors text-lg">
              <MessageSquare className="w-6 h-6" />
              <span className="font-brushed">Community</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-plagueDark hover:text-white transition-colors text-lg">
              <Twitter className="w-6 h-6" />
              <span className="font-brushed">Twitter</span>
            </a>
            
            {user.isLoggedIn ? (
              <Link 
                to="/profile" 
                className="plague-button text-sm flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img src={user.member?.avatar} className="w-5 h-5 rounded-full" alt="" />
                <span>{user.member?.name}</span>
              </Link>
            ) : (
              <button 
                onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}
                className="plague-button text-sm flex items-center gap-2"
              >
                <Twitter className="w-4 h-4 fill-current" />
                <span>Login with Twitter</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
