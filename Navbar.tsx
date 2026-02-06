
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, ShoppingBasket, MessageSquare, Menu, LogOut, Skull } from 'lucide-react';
import { UserState } from '../types';

interface NavbarProps {
  user: UserState;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout }) => {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-3">
        <div className="w-12 h-12 flex items-center justify-center">
           <svg viewBox="0 0 100 100" className="w-full h-full text-plagueDark fill-current">
              <path d="M50 10C30 10 10 30 10 50s20 40 40 40 40-20 40-40S70 10 50 10zm0 70c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z"/>
              <circle cx="35" cy="45" r="5" />
              <circle cx="65" cy="45" r="5" />
              <path d="M30 65q20 10 40 0" stroke="currentColor" fill="none" strokeWidth="3" />
           </svg>
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-white uppercase">The</span>
          <span className="text-2xl font-brushed text-white leading-none">PLAGUE</span>
        </div>
      </Link>

      {/* Right Side Items */}
      <div className="flex items-center space-x-4 md:space-x-8">
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-plagueDark hover:text-white transition-colors">
            <ShoppingBasket className="w-6 h-6" />
          </a>
          <a href="#" className="text-plagueDark hover:text-white transition-colors">
            <MessageSquare className="w-6 h-6" />
          </a>
          <a href="#" className="text-plagueDark hover:text-white transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
        </div>

        {user.isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="plague-button flex items-center space-x-2 lowercase text-sm">
              <img src={user.member?.avatar} className="w-5 h-5 rounded-full" />
              <span>{user.member?.name}</span>
            </Link>
            <button onClick={onLogout} className="text-plagueDark hover:text-white">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="plague-button text-xs md:text-sm flex items-center gap-2"
          >
            <Twitter className="w-4 h-4 fill-current" />
            Login with Twitter
          </button>
        )}

        <button className="text-white hover:text-plagueDark">
          <Menu className="w-8 h-8" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
