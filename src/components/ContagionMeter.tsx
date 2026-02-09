import React, { useMemo } from 'react';
import { Activity, Users, Target, TrendingUp } from 'lucide-react';
import { Member, Project } from '../types';

interface Props {
  members: Member[];
  projects: Project[];
}

const ContagionMeter: React.FC<Props> = ({ members, projects }) => {
  const stats = useMemo(() => {
    const totalEndorsements = members.reduce((acc, m) => 
      acc + m.skills.reduce((s, skill) => s + skill.endorsements, 0), 0);
    
    const totalContaminations = projects.reduce((acc, p) => 
      acc + p.upvoterIds.length + p.enlistedIds.length, 0);
    
    const activeInfections = projects.filter(p => p.status === 'Live').length;
    const incubations = projects.filter(p => p.status === 'Proposal').length;
    
    return {
      totalEndorsements,
      totalContaminations,
      activeInfections,
      incubations,
      totalVectors: members.length
    };
  }, [members, projects]);

  const biohazardLevel = Math.min(100, Math.floor(
    (stats.totalContaminations / Math.max(1, members.length * 10)) * 50 +
    (stats.activeInfections / Math.max(1, projects.length)) * 50
  ));

  const getBiohazardColor = (level: number) => {
    if (level < 30) return 'text-green-400 border-green-400/30';
    if (level < 60) return 'text-yellow-400 border-yellow-400/30';
    if (level < 80) return 'text-orange-400 border-orange-400/30';
    return 'text-red-400 border-red-400/30';
  };

  const getBiohazardLabel = (level: number) => {
    if (level < 30) return 'Low Risk';
    if (level < 60) return 'Contained';
    if (level < 80) return 'Spreading';
    return 'Pandemic';
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
      {/* Biohazard Level */}
      <div className="text-center">
        <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${getBiohazardColor(biohazardLevel)}`}>
          Biohazard Level {biohazardLevel}%
        </div>
        <div className={`text-lg font-brushed uppercase ${getBiohazardColor(biohazardLevel)}`}>
          {getBiohazardLabel(biohazardLevel)}
        </div>
        <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              biohazardLevel < 30 ? 'bg-green-400' :
              biohazardLevel < 60 ? 'bg-yellow-400' :
              biohazardLevel < 80 ? 'bg-orange-400' : 'bg-red-400'
            }`}
            style={{ width: `${biohazardLevel}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-plague" />
          <div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Vectors</div>
            <div className="text-sm font-bold text-white">{stats.totalVectors}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-plague" />
          <div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Active</div>
            <div className="text-sm font-bold text-white">{stats.activeInfections}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-plague" />
          <div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Mutations</div>
            <div className="text-sm font-bold text-white">{stats.totalEndorsements}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-plague" />
          <div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Contagions</div>
            <div className="text-sm font-bold text-white">{stats.totalContaminations}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContagionMeter;
