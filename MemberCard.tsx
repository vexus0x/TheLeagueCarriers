import React from 'react';
import { Member } from './types';

interface MemberCardProps {
  member: Member;
  onEndorse: (mid: string, sname: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onEndorse }) => {
  return (
    <div className="bg-white/5 rounded-xl md:rounded-2xl border border-white/10 p-4 md:p-6 hover:border-plague/50 transition-all group">
      {/* Header */}
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <img 
          src={member.avatar} 
          alt={member.name}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-plague/30 group-hover:border-plague transition-colors" 
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base md:text-lg font-bold text-white truncate">{member.name}</h3>
            {member.role === 'Elder' && (
              <span className="text-[10px] font-black bg-plague text-black px-2 py-0.5 rounded-full uppercase tracking-wider">Elder</span>
            )}
            {member.role === 'Representative' && (
              <span className="text-[10px] font-black bg-plagueDark text-black px-2 py-0.5 rounded-full uppercase tracking-wider">Rep</span>
            )}
          </div>
          <p className="text-xs md:text-sm text-plagueDark truncate">{member.workgroup}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-xs md:text-sm text-white/60 mb-4 line-clamp-2 leading-relaxed">
        {member.bio}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
        {member.skills.map((skill, idx) => (
          <button
            key={idx}
            onClick={() => onEndorse(member.id, skill.name)}
            className="flex items-center gap-1 px-2 py-1 md:px-2.5 md:py-1 bg-white/5 rounded-full border border-white/10 hover:border-plague/50 transition-all group/skill"
          >
            <span className="text-[10px] md:text-xs text-white/70 group-hover/skill:text-white font-medium truncate max-w-[80px] md:max-w-[120px]">{skill.name}</span>
            <span className="text-[10px] md:text-xs text-plagueDark font-bold">{skill.endorsements}</span>
          </button>
        ))}
      </div>

      {/* Workgroups */}
      <div className="flex flex-wrap gap-1">
        {member.workgroups.map((wg, idx) => (
          <span key={idx} className="text-[9px] md:text-[10px] font-bold text-white/30 uppercase tracking-wider border border-white/10 rounded px-1.5 py-0.5">
            {wg}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MemberCard;
