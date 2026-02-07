import React from 'react';
import { X } from 'lucide-react';
import { Member } from './types';

interface VotersEnlistersModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  members: Member[];
  userIds: string[];
  emptyMessage: string;
}

const VotersEnlistersModal: React.FC<VotersEnlistersModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  members, 
  userIds,
  emptyMessage 
}) => {
  if (!isOpen) return null;

  const listedMembers = members.filter(m => userIds.includes(m.id));

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="card-glass w-full max-w-md p-6 relative max-h-[80vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-plague transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-brushed text-plague mb-6 uppercase">{title}</h2>

        {listedMembers.length > 0 ? (
          <div className="space-y-3">
            {listedMembers.map(member => (
              <div 
                key={member.id} 
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-10 h-10 rounded-full border border-plague/30"
                />
                <div>
                  <div className="font-bold text-white">{member.name}</div>
                  <div className="text-xs text-plagueDark">@{member.xHandle}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40 font-brushed">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
};

export default VotersEnlistersModal;
