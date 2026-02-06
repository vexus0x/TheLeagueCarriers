
import React, { useState } from 'react';
import { Zap, ShieldCheck, Twitter, ChevronDown, ChevronUp } from 'lucide-react';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
  onEndorse: (memberId: string, skillName: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onEndorse }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedSkills = isExpanded ? member.skills : member.skills.slice(0, 2);
  const hasMoreSkills = member.skills.length > 2;

  return (
    <div className="card-glass p-6 group hover:border-plagueDark/50 transition-all flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-plagueDark/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img 
            src={member.avatar} 
            alt={member.name} 
            className="relative w-20 h-20 rounded-full border-2 border-plagueDark/30 object-cover"
          />
          {member.role === 'Elder' && (
            <div className="absolute -bottom-1 -right-1 bg-plagueDark text-black p-1 rounded-full border-2 border-black">
              <ShieldCheck className="w-4 h-4" />
            </div>
          )}
        </div>
        <a 
          href={`https://x.com/${member.xHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white/5 rounded-full text-plagueDark hover:bg-plagueDark hover:text-black transition-all"
        >
          <Twitter className="w-4 h-4" />
        </a>
      </div>

      <div className="flex-1">
        <h3 className="text-2xl font-brushed text-white mb-2 group-hover:text-plague transition-colors">
          {member.name}
        </h3>
        <p className="text-sm text-white/60 mb-6 leading-relaxed">
          {member.bio}
        </p>

        <div className="space-y-3">
          {displayedSkills.map(skill => (
            <button
              key={skill.name}
              onClick={() => onEndorse(member.id, skill.name)}
              className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2 hover:bg-white/10 transition-all group/skill animate-in fade-in slide-in-from-top-1"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">{skill.name}</span>
              <div className="flex items-center space-x-2 text-plagueDark">
                <Zap className="w-3 h-3 fill-current" />
                <span className="text-xs font-bold">{skill.endorsements}</span>
              </div>
            </button>
          ))}
          
          {hasMoreSkills && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest text-plagueDark hover:text-white transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>Show {member.skills.length - 2} More Skills</span>
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">ID_{member.id.padStart(4, '0')}</span>
         <div className="flex items-center gap-2">
           {member.learningMode && (
             <span className="text-[9px] bg-plague/10 text-plague px-2 py-0.5 rounded-full border border-plague/20 font-bold uppercase">Training</span>
           )}
           <span className="text-[9px] text-white/20 font-bold uppercase">{member.role}</span>
         </div>
      </div>
    </div>
  );
};

export default MemberCard;
