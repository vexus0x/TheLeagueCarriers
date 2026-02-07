import React from 'react';
import { Project, Member, UserState } from './types';
import { ArrowBigUp, Users, Calendar, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onUpvote: (pid: string) => void;
  onEnlist: (pid: string) => void;
  onEdit?: (project: Project) => void;
  onShowVoters?: () => void;
  onShowEnlisters?: () => void;
  members: Member[];
  currentUser: UserState;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onUpvote, 
  onEnlist, 
  onEdit,
  onShowVoters,
  onShowEnlisters,
  members, 
  currentUser 
}) => {
  const author = members.find(m => m.id === project.elderId);
  const hasVoted = currentUser.isLoggedIn && project.upvoterIds.includes(currentUser.member?.id || '');
  const isEnlisted = currentUser.isLoggedIn && project.enlistedIds.includes(currentUser.member?.id || '');

  return (
    <div className="bg-white/5 rounded-xl md:rounded-2xl border border-white/10 p-4 md:p-6 hover:border-plague/50 transition-all group">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Vote Button */}
        <button 
          onClick={() => onUpvote(project.id)}
          className={`flex flex-col items-center p-1.5 md:p-2 rounded-lg transition-all ${
            hasVoted 
              ? 'text-plagueDark bg-plague/10' 
              : 'text-white/30 hover:text-white/50 hover:bg-white/5'
          }`}
        >
          <ArrowBigUp className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs md:text-sm font-bold">{project.upvoterIds.length}</span>
        </button>

        <div className="flex-1 min-w-0">
          {/* Title & Tags */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{project.title}</h3>
            {onEdit && (
              <button 
                onClick={() => onEdit(project)}
                className="text-white/30 hover:text-plague transition-colors text-xs font-bold uppercase tracking-wider px-2 py-1"
              >
                Edit
              </button>
            )}
          </div>

          {/* Workgroup Badge */}
          <span className="inline-block text-[10px] md:text-xs font-black text-plagueDark bg-plague/10 px-2 py-0.5 rounded-full uppercase tracking-wider mb-2">
            {project.workgroup}
          </span>

          {/* Description */}
          <p className="text-sm md:text-base text-white/60 leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-white/40 mb-4">
            {/* Author */}
            {author && (
              <div className="flex items-center gap-1.5">
                <img src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full" />
                <span className="font-medium text-white/60">{author.name}</span>
              </div>
            )}
            
            {/* Dates */}
            {(project.startDate || project.isOngoing) && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {project.startDate}
                  {project.isOngoing ? ' - Ongoing' : project.endDate ? ` - ${project.endDate}` : ''}
                </span>
              </div>
            )}

            {/* Enlisted - Clickable */}
            {project.enlistedIds.length > 0 && onShowEnlisters && (
              <button 
                onClick={onShowEnlisters}
                className="flex items-center gap-1 hover:text-plague transition-colors"
              >
                <Users className="w-3.5 h-3.5" />
                <span>{project.enlistedIds.length} enlisted</span>
              </button>
            )}
            
            {/* Enlisted - Non-clickable fallback */}
            {project.enlistedIds.length > 0 && !onShowEnlisters && (
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{project.enlistedIds.length} enlisted</span>
              </div>
            )}
          </div>

          {/* Requirements Tags */}
          {project.requirements.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {project.requirements.map((req, idx) => (
                <span key={idx} className="text-[10px] font-bold text-white/30 border border-white/10 rounded px-2 py-0.5 uppercase tracking-wider">
                  {req}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-medium text-plagueDark/70 bg-plague/5 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Button */}
      <button 
        onClick={() => onEnlist(project.id)}
        disabled={isEnlisted}
        className={`w-full py-3 md:py-3.5 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
          isEnlisted 
            ? 'bg-plague/10 text-plagueDark cursor-default'
            : 'bg-plague hover:bg-plagueDark text-black'
        }`}
      >
        <span>{isEnlisted ? 'Enlisted' : 'Enlist'}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ProjectCard;
