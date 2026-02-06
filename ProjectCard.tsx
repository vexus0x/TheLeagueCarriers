
import React, { useState } from 'react';
import { Target, Users, ArrowRight, Zap, X, ShieldCheck, Calendar, Infinity, Pencil, Heart } from 'lucide-react';
import { Project, Member, UserState } from '../types';

interface ProjectCardProps { 
  project: Project; 
  onUpvote: (id: string) => void;
  onEnlist: (id: string) => void;
  onEdit?: (project: Project) => void;
  members: Member[];
  currentUser?: UserState;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onUpvote, onEnlist, onEdit, members, currentUser }) => {
  const [modalType, setModalType] = useState<'enlisted' | 'voters' | null>(null);

  const enlistedMembers = members.filter(m => project.enlistedIds.includes(m.id));
  const voterMembers = members.filter(m => project.upvoterIds.includes(m.id));
  const proposer = members.find(m => m.id === project.elderId);
  const isOwner = currentUser?.isLoggedIn && currentUser.member?.id === project.elderId;
  const hasVoted = currentUser?.isLoggedIn && currentUser.member && project.upvoterIds.includes(currentUser.member.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-plague text-black shadow-[0_0_10px_#B6FF91]';
      case 'Proposal': return 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]';
      case 'Ended': return 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]';
      default: return 'bg-white/20 text-white/60';
    }
  };

  const displayedList = modalType === 'enlisted' ? enlistedMembers : voterMembers;
  const modalTitle = modalType === 'enlisted' ? 'Enlisted Operatives' : 'Project Supporters';

  return (
    <div className="card-glass p-8 md:p-12 group hover:border-plagueDark/50 transition-all relative">
      {/* Dynamic Modal Overlay */}
      {modalType && (
        <div className="absolute inset-0 z-20 bg-black/95 rounded-3xl p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-brushed text-plague uppercase">{modalTitle}</h4>
            <button onClick={() => setModalType(null)} className="text-white hover:text-plague">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {displayedList.length > 0 ? displayedList.map(m => (
              <div key={m.id} className="flex items-center space-x-4 bg-white/5 p-3 rounded-xl border border-white/10">
                <img src={m.avatar} className="w-10 h-10 rounded-full object-cover" alt={m.name} />
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{m.name}</div>
                  <div className="text-[10px] text-plagueDark font-bold uppercase tracking-wider">{m.role}</div>
                </div>
                {modalType === 'voters' && <Zap className="w-3 h-3 text-plague fill-current opacity-50" />}
              </div>
            )) : (
              <div className="text-white/40 font-bold uppercase text-center mt-12 italic">
                {modalType === 'enlisted' ? 'No operatives enlisted yet.' : 'No votes cast yet.'}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest border border-white/10 ${getStatusColor(project.status)}`}>
                {project.status}
              </div>
              <div className="h-px w-12 bg-white/10"></div>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                {project.requirements && project.requirements.length > 0 
                  ? project.requirements.join(' & ') 
                  : 'Team Member'} REQUIRED
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {isOwner && onEdit && (
                <button 
                  onClick={() => onEdit(project)}
                  title="Edit Proposal"
                  className="p-2 bg-white/5 hover:bg-plagueDark/20 text-white/40 hover:text-plague rounded-full transition-all border border-white/10"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}
              {proposer && (
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                  <div className="relative">
                    <img src={proposer.avatar} className="w-8 h-8 rounded-full border border-plagueDark/30 object-cover" alt={proposer.name} />
                    <div className="absolute -bottom-1 -right-1 bg-plagueDark rounded-full p-0.5 border border-black">
                      <ShieldCheck className="w-2.5 h-2.5 text-black" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none">Proposed by</span>
                    <span className="text-xs font-bold text-plague leading-tight">{proposer.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-4xl md:text-5xl font-brushed text-white group-hover:text-plague transition-all">
              {project.title}
            </h3>
            
            <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-plagueDark" />
                <span>Starts: {project.startDate || 'TBA'}</span>
              </div>
              <div className="flex items-center gap-2">
                {project.isOngoing ? (
                  <>
                    <Infinity className="w-3.5 h-3.5 text-plagueDark" />
                    <span>Ongoing Operation</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5 text-plagueDark" />
                    <span>Ends: {project.endDate || 'TBA'}</span>
                  </>
                )}
              </div>
            </div>

            <p className="text-xl text-white/60 font-medium leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="bg-white/5 text-white/40 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/5">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-72 space-y-6">
          <div className="bg-white/5 rounded-3xl p-6 space-y-6 border border-white/5">
            <div className="flex justify-between items-center text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
              <button 
                onClick={() => setModalType('voters')}
                className="hover:text-plague transition-colors flex items-center gap-1"
              >
                Votes
              </button>
              <button 
                onClick={() => setModalType('enlisted')}
                className="text-plagueDark animate-pulse flex items-center gap-1 hover:scale-110 transition-transform"
              >
                Active
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onUpvote(project.id)}
                className={`flex flex-col items-center justify-center transition-all rounded-2xl py-4 group/vote border border-white/5 ${hasVoted ? 'bg-plagueDark border-plague' : 'bg-black/40 hover:bg-plagueDark'}`}
              >
                <Zap className={`w-6 h-6 mb-2 fill-current ${hasVoted ? 'text-black' : 'text-plagueDark group-hover/vote:text-black'}`} />
                <span className={`text-xl font-brushed ${hasVoted ? 'text-black' : 'text-white group-hover/vote:text-black'}`}>
                  {project.upvoterIds.length}
                </span>
                {hasVoted && <span className="text-[8px] font-black uppercase text-black/60 leading-none">Voted</span>}
              </button>
              
              <button 
                onClick={() => setModalType('enlisted')}
                className="flex flex-col items-center justify-center bg-black/20 hover:bg-white/5 transition-all rounded-2xl py-4 group/active"
              >
                <Users className="w-6 h-6 text-white/20 group-hover/active:text-plagueDark transition-colors mb-2" />
                <span className="text-xl font-brushed text-white/40 group-hover/active:text-white transition-colors">
                  {project.enlistedIds.length}
                </span>
              </button>
            </div>
          </div>

          <button 
            disabled={project.status === 'Ended'}
            onClick={() => onEnlist(project.id)}
            className={`plague-button w-full py-5 text-xl flex items-center justify-center space-x-4 ${project.status === 'Ended' ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
          >
            <span>{project.status === 'Ended' ? 'Terminated' : 'Enlist'}</span>
            {project.status !== 'Ended' && <ArrowRight className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
