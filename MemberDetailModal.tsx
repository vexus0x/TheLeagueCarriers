import React from 'react';
import { X, Award, Users, Star, MapPin } from 'lucide-react';
import { Member } from './types';

interface MemberDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  onEndorse: (mid: string, sname: string) => void;
}

const MemberDetailModal: React.FC<MemberDetailModalProps> = ({ isOpen, onClose, member, onEndorse }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="card-glass w-full max-w-lg p-6 relative max-h-[85vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-plague transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <img 
            src={member.avatar} 
            alt={member.name}
            className="w-24 h-24 rounded-full border-4 border-plague mx-auto mb-4"
          />
          <h2 className="text-3xl font-brushed text-white uppercase">{member.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-plagueDark">@{member.xHandle}</span>
            {member.role === 'Elder' && (
              <span className="bg-plague text-black px-2 py-0.5 rounded-full text-xs font-bold uppercase">Elder</span>
            )}
            {member.role === 'Representative' && (
              <span className="bg-plagueDark text-black px-2 py-0.5 rounded-full text-xs font-bold uppercase">Rep</span>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white/5 rounded-xl p-4 mb-4">
          <p className="text-white/70 italic">"{member.bio}"</p>
        </div>

        {/* Workgroups */}
        <div className="mb-4">
          <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-2">Workgroups</h3>
          <div className="flex flex-wrap gap-2">
            {member.workgroups.map((wg, idx) => (
              <span key={idx} className="flex items-center gap-1 bg-plague/10 border border-plague/30 text-plagueDark px-3 py-1 rounded-full text-xs font-bold uppercase">
                <MapPin className="w-3 h-3" />
                {wg}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-2">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill, idx) => (
              <button
                key={idx}
                onClick={() => onEndorse(member.id, skill.name)}
                className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-plague/50 px-3 py-1.5 rounded-lg transition-all group"
              >
                <span className="text-sm text-white group-hover:text-plague">{skill.name}</span>
                <span className="flex items-center gap-1 text-plagueDark text-xs font-bold">
                  <Award className="w-3 h-3" />
                  {skill.endorsements}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-brushed text-plague">{member.skills.length}</div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Specialties</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-brushed text-plague">
              {member.skills.reduce((acc, s) => acc + s.endorsements, 0)}
            </div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Total Endorsements</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailModal;
