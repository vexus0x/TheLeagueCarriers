import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Target, User, Twitter } from 'lucide-react';
import { UserState } from './types';

interface BottomNavProps {
  user: UserState;
  activeTab: 'Proposal' | 'Live' | 'Ended';
  setActiveTab: (tab: 'Proposal' | 'Live' | 'Ended') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ user, activeTab, setActiveTab }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isProfile = location.pathname === '/profile';

  const scrollToProposals = () => {
    const sections = document.querySelectorAll('section');
    if (sections[1]) {
      sections[1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMembers = () => {
    const sections = document.querySelectorAll('section');
    if (sections[2]) {
      sections[2].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10 safe-area-pb">
      {/* Proposal tab indicator */}
      {isHome && (
        <div className="absolute -top-10 left-0 right-0 flex justify-center px-4">
          <div className="flex gap-2 bg-black/80 backdrop-blur rounded-full px-2 py-1">
            <button 
              onClick={() => setActiveTab('Proposal')}
              className={`text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full transition-all ${
                activeTab === 'Proposal' ? 'bg-plague text-black' : 'text-white/40 hover:text-white'
              }`}
            >
              Proposals
            </button>
            <button 
              onClick={() => setActiveTab('Live')}
              className={`text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full transition-all ${
                activeTab === 'Live' ? 'bg-plague text-black' : 'text-white/40 hover:text-white'
              }`}
            >
              Live
            </button>
          </div>
        </div>
      )}

      {/* Bottom nav items */}
      <div className="flex justify-around items-center py-3 pb-safe">
        <button 
          onClick={scrollToProposals}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
            isHome && (activeTab === 'Proposal' || activeTab === 'Live') ? 'text-plague' : 'text-white/40 hover:text-white'
          }`}
        >
          <Target className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Missions</span>
        </button>

        <button 
          onClick={scrollToMembers}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
            isHome && activeTab === 'Ended' ? 'text-plague' : 'text-white/40 hover:text-white'
          }`}
        >
          <Users className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Frogs</span>
        </button>

        <Link 
          to="/"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
            isHome && activeTab === 'Ended' ? 'text-plague' : 'text-white/40 hover:text-white'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </Link>

        {user.isLoggedIn ? (
          <Link 
            to="/profile"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              isProfile ? 'text-plague' : 'text-white/40 hover:text-white'
            }`}
          >
            <img 
              src={user.member?.avatar} 
              alt={user.member?.name}
              className="w-6 h-6 rounded-full border border-current"
            />
            <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
          </Link>
        ) : (
          <button 
            onClick={() => {
              // This would trigger login - in a real app this would call a login function
              alert("Login to access profile");
            }}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-white/40 hover:text-white"
          >
            <Twitter className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Login</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
