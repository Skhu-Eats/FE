import React from 'react';
import { Home, Users, MessageCircle, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab?: 'home' | 'meal' | 'chat' | 'my';
  onFabClick?: () => void;
}

export const BottomNav = ({ activeTab = 'home', onFabClick }: BottomNavProps) => {
  return (
    <nav className="bottom-nav">
      <div className={cn('nav-item', activeTab === 'home' && 'active')}>
        <Home className="w-[22px] h-[22px]" />
        <span className="nav-label">홈</span>
      </div>
      <div className={cn('nav-item', activeTab === 'meal' && 'active')}>
        <Users className="w-[22px] h-[22px]" />
        <span className="nav-label">밥친구</span>
      </div>
      <div className="nav-fab-wrap">
        <button 
          className="nav-fab border-none cursor-pointer" 
          onClick={onFabClick}
        >
          <Plus className="w-6 h-6 text-grey-900" />
        </button>
      </div>
      <div className={cn('nav-item', activeTab === 'chat' && 'active')}>
        <MessageCircle className="w-[22px] h-[22px]" />
        <span className="nav-label">채팅</span>
      </div>
      <div className={cn('nav-item', activeTab === 'my' && 'active')}>
        <User className="w-[22px] h-[22px]" />
        <span className="nav-label">마이</span>
      </div>
    </nav>
  );
};
