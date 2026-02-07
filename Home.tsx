import React, { useState, useEffect } from 'react';
import { Search, Users, Activity, Target, MessageSquareCode, Plus, X, Calendar, Infinity, Briefcase, Settings2, ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import MemberCard from './MemberCard';
import ProjectCard from './ProjectCard';
import { Member, Project, SkillType, WorkgroupType, UserState } from './types';
import { SKILL_OPTIONS, WORKGROUP_OPTIONS } from './constants';

interface HomeProps {
  user: UserState;
  members: Member[];
  projects: Project[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSkill: SkillType | '';
  setSelectedSkill: (skill: SkillType | '') => void;
  selectedWorkgroup: WorkgroupType | '';
  setSelectedWorkgroup: (wg: WorkgroupType | '') => void;
  onEndorse: (mid: string, sname: string) => void;
  onUpvote: (pid: string) => void;
  onEnlist: (pid: string) => void;
  onAddProject: (p: Partial<Project>) => void;
}

const Home: React.FC<HomeProps> = ({ 
  user, members, projects, searchQuery, setSearchQuery, 
  selectedSkill, setSelectedSkill, selectedWorkgroup, setSelectedWorkgroup,
  onEndorse, onUpvote, onEnlist, onAddProject
}) => {
  const [activeTab, setActiveTab] = useState<'Live' | 'Proposal' | 'Ended'>('Proposal');
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showAllMembers, setShowAllMembers] = useState(false);

  // Form state
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDesc, setProposalDesc] = useState('');
  const [proposalTags, setProposalTags] = useState('');
  const [proposalWG, setProposalWG] = useState<WorkgroupType>(WORKGROUP_OPTIONS[0]);
  const [proposalStartDate, setProposalStartDate] = useState('');
  const [proposalEndDate, setProposalEndDate] = useState('');
  const [proposalIsOngoing, setProposalIsOngoing] = useState(false);
  const [proposalRequirements, setProposalRequirements] = useState('');
  const [proposalStatus, setProposalStatus] = useState<'Live' | 'Proposal' | 'Ended'>('Proposal');

  useEffect(() => {
    if (editingProject) {
      setProposalTitle(editingProject.title);
      setProposalDesc(editingProject.description);
      setProposalTags(editingProject.tags.join(', '));
      setProposalWG(editingProject.workgroup);
      setProposalStartDate(editingProject.startDate || '');
      setProposalEndDate(editingProject.endDate || '');
      setProposalIsOngoing(!!editingProject.isOngoing);
      setProposalRequirements(editingProject.requirements ? editingProject.requirements.join(', ') : '');
      setProposalStatus(editingProject.status);
    } else {
      setProposalTitle('');
      setProposalDesc('');
      setProposalTags('');
      setProposalWG(WORKGROUP_OPTIONS[0]);
      setProposalStartDate('');
      setProposalEndDate('');
      setProposalIsOngoing(false);
      setProposalRequirements('');
      setProposalStatus('Proposal');
    }
  }, [editingProject, isProposalModalOpen]);

  const filteredProjects = projects.filter(p => p.status === activeTab);
  const isElder = user.isLoggedIn && (user.member?.role === 'Elder' || user.member?.role === 'Representative');

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsProposalModalOpen(true);
  };

  const closeModal = () => {
    setIsProposalModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProject({
      id: editingProject?.id,
      title: proposalTitle,
      description: proposalDesc,
      tags: proposalTags.split(',').map(t => t.trim()).filter(t => t),
      workgroup: proposalWG,
      startDate: proposalStartDate,
      endDate: proposalIsOngoing ? undefined : proposalEndDate,
      isOngoing: proposalIsOngoing,
      requirements: proposalRequirements.split(',').map(r => r.trim()).filter(r => r),
      status: proposalStatus
    });
    closeModal();
  };

  return (
    <div className="space-y-8 md:space-y-12 pb-20 md:pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 pb-8 text-center flex flex-col items-center px-4">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-brushed text-plague leading-tight uppercase">
            The Plague <br className="md:hidden" />
            Community Hub
          </h1>
          
          <p className="text-sm md:text-base text-white/80 font-medium max-w-lg mx-auto leading-relaxed">
            A decentralized collaboration engine for the Plague Collective. <br className="hidden md:block" />
            Join the trenches, forge specialties, and enlist in missions.
          </p>
        </div>
      </section>

      {/* Tabbed Mission Hub */}
      <section className="max-w-6xl mx-auto px-4 space-y-6 md:space-y-8">
        {/* Tab Headers */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 md:pb-6">
          {/* Tabs - Scrollable on mobile */}
          <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button 
              onClick={() => setActiveTab('Proposal')}
              className={`text-xl md:text-3xl lg:text-4xl font-brushed uppercase transition-all whitespace-nowrap ${activeTab === 'Proposal' ? 'text-plague' : 'text-white/40 hover:text-white'}`}
            >
              Proposals
            </button>
            <button 
              onClick={() => setActiveTab('Live')}
              className={`text-xl md:text-3xl lg:text-4xl font-brushed uppercase transition-all whitespace-nowrap ${activeTab === 'Live' ? 'text-plague' : 'text-white/40 hover:text-white'}`}
            >
              Live
            </button>
            <button 
              onClick={() => setActiveTab('Ended')}
              className={`text-xl md:text-3xl lg:text-4xl font-brushed uppercase transition-all whitespace-nowrap ${activeTab === 'Ended' ? 'text-plague' : 'text-white/40 hover:text-white'}`}
            >
              Archive
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {activeTab === 'Proposal' && isElder && (
              <button 
                onClick={() => setIsProposalModalOpen(true)}
                className="plague-button flex items-center gap-2 text-xs"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Propose</span>
              </button>
            )}
            {activeTab === 'Proposal' && (
              <div className="flex items-center gap-2 text-plagueDark font-bold text-xs uppercase tracking-widest">
                <MessageSquareCode className="w-4 h-4" />
                <span className="hidden sm:inline">From Elders</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 min-h-[300px]">
          {filteredProjects.length > 0 ? filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onUpvote={onUpvote} 
              onEnlist={onEnlist}
              onEdit={handleEdit}
              members={members}
              currentUser={user}
            />
          )) : (
            <div className="flex flex-col items-center justify-center py-12 md:py-20 bg-white/5 rounded-2xl md:rounded-3xl border border-dashed border-white/10">
              <Activity className="w-8 h-8 md:w-12 md:h-12 text-white/20 mb-3 md:mb-4" />
              <p className="text-base md:text-2xl text-white/40 font-brushed uppercase">
                No {activeTab === 'Ended' ? 'archived' : activeTab.toLowerCase()} operations found
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Members Carousel */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-plague" />
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-brushed text-white uppercase">
              {showAllMembers ? 'All Frogs' : 'Featured Frogs'}
            </h2>
          </div>
          
          {!showAllMembers && (
            <button 
              onClick={() => setShowAllMembers(true)}
              className="plague-button flex items-center gap-2 text-xs md:text-sm"
            >
              <span>Explore All {members.length} Frogs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Show All Toggle - when viewing all */}
        {showAllMembers && (
          <div className="flex justify-end">
            <button 
              onClick={() => { setShowAllMembers(false); setCarouselIndex(0); }}
              className="text-plague hover:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Carousel
            </button>
          </div>
        )}

        {/* Carousel View */}
        {!showAllMembers && (
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-out gap-4 md:gap-6"
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {members.map((member) => (
                  <div key={member.id} className="flex-none w-[280px] md:w-[320px]">
                    <MemberCard member={member} onEndorse={onEndorse} />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            {members.length > 3 && (
              <>
                <button 
                  onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                  disabled={carouselIndex === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 md:w-12 md:h-12 bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-plague hover:bg-plague hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button 
                  onClick={() => setCarouselIndex(Math.min(members.length - 3, carouselIndex + 1))}
                  disabled={carouselIndex >= members.length - 3}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 md:w-12 bg-black/80 md:h-12 border border-white/20 rounded-full flex items-center justify-center text-plague hover:bg-plague hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {members.length > 3 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: Math.max(1, members.length - 2) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === carouselIndex ? 'bg-plague w-6' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Full Grid View */}
        {showAllMembers && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {members.map(member => (
              <MemberCard key={member.id} member={member} onEndorse={onEndorse} />
            ))}
          </div>
        )}
      </section>

      {/* Proposal Modal */}
      {isProposalModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="card-glass w-full max-w-lg md:max-w-2xl p-6 md:p-8 relative overflow-hidden my-4">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/40 hover:text-plague transition-colors"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <h2 className="text-2xl md:text-4xl font-brushed text-plague mb-6 md:mb-8 uppercase">
              {editingProject ? 'Modify Operation' : 'Propose Operation'}
            </h2>
            
            <form onSubmit={handleSubmitProposal} className="space-y-4 md:space-y-6">
              {/* Title & Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Operation Title</label>
                  <input 
                    required
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    placeholder="e.g. Swamp OS Development"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base text-white focus:border-plague focus:ring-0 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Briefcase className="w-3 h-3" />
                    Required Skills
                  </label>
                  <input 
                    required
                    value={proposalRequirements}
                    onChange={(e) => setProposalRequirements(e.target.value)}
                    placeholder="e.g. Developer, Content Creator..."
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base text-white placeholder:text-white/20 focus:border-plague focus:ring-0 transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Mission Briefing</label>
                <textarea 
                  required
                  rows={3}
                  value={proposalDesc}
                  onChange={(e) => setProposalDesc(e.target.value)}
                  placeholder="Detail the objectives of this operation..."
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base text-white placeholder:text-white/20 focus:border-plague focus:ring-0 transition-all resize-none"
                />
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Start Date
                  </label>
                  <input 
                    type="date"
                    required
                    value={proposalStartDate}
                    onChange={(e) => setProposalStartDate(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-plague focus:ring-0"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      End Date
                    </label>
                    <button 
                      type="button"
                      onClick={() => setProposalIsOngoing(!proposalIsOngoing)}
                      className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors ${proposalIsOngoing ? 'text-plague' : 'text-white/20'}`}
                    >
                      <Infinity className="w-3 h-3" />
                      Ongoing
                    </button>
                  </div>
                  <input 
                    type="date"
                    disabled={proposalIsOngoing}
                    required={!proposalIsOngoing}
                    value={proposalEndDate}
                    onChange={(e) => setProposalEndDate(e.target.value)}
                    className={`w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-plague focus:ring-0 ${proposalIsOngoing ? 'opacity-30' : ''}`}
                  />
                </div>
              </div>

              {/* Workgroup & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Workgroup</label>
                  <select 
                    value={proposalWG}
                    onChange={(e) => setProposalWG(e.target.value as WorkgroupType)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-plague focus:ring-0 appearance-none cursor-pointer"
                  >
                    {WORKGROUP_OPTIONS.map(wg => <option key={wg} value={wg} className="bg-black">{wg}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Settings2 className="w-3 h-3" />
                    Status
                  </label>
                  <select 
                    value={proposalStatus}
                    onChange={(e) => setProposalStatus(e.target.value as any)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-plague focus:ring-0 appearance-none cursor-pointer"
                  >
                    <option value="Proposal" className="bg-black text-blue-400">Proposal</option>
                    <option value="Live" className="bg-black text-plague">Live</option>
                    <option value="Ended" className="bg-black text-red-400">Ended</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Operation Tags</label>
                <input 
                  value={proposalTags}
                  onChange={(e) => setProposalTags(e.target.value)}
                  placeholder="Dev, Lore, Community"
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-plague focus:ring-0 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="plague-button w-full py-4 text-base md:text-lg flex items-center justify-center gap-2 mt-4">
                <span>{editingProject ? 'Update Data' : 'Authorize Proposal'}</span>
                {editingProject ? <Activity className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
