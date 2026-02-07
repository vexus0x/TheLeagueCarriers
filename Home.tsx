import React, { useState } from 'react';
import { Search, Users, Activity, Target, MessageSquareCode, Plus, X, Calendar, Infinity, Briefcase, Settings2, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Clock, TrendingUp, UserPlus, ThumbsUp } from 'lucide-react';
import MemberCard from './MemberCard';
import ProjectCard from './ProjectCard';
import VotersEnlistersModal from './VotersEnlistersModal';
import MemberDetailModal from './MemberDetailModal';
import { Member, Project, SkillType, WorkgroupType, UserState } from './types';
import { SKILL_OPTIONS, WORKGROUP_OPTIONS } from './constants';

// Activity types
interface ActivityItem {
  id: string;
  type: 'upvote' | 'enlist' | 'propose' | 'endorse';
  userId: string;
  projectId?: string;
  memberId?: string;
  skillName?: string;
  timestamp: Date;
}

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

type SortOption = 'recent' | 'votes' | 'enlistments';

const Home: React.FC<HomeProps> = ({ 
  user, members, projects, searchQuery, setSearchQuery, 
  selectedSkill, setSelectedSkill, selectedWorkgroup, setSelectedWorkgroup,
  onEndorse, onUpvote, onEnlist, onAddProject
}) => {
  const [activeTab, setActiveTab] = useState<'Live' | 'Proposal' | 'Ended'>('Proposal');
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [proposalSearch, setProposalSearch] = useState('');
  const [showActivityFeed, setShowActivityFeed] = useState(true);
  
  // Voters/Enlisters Modal State
  const [modalInfo, setModalInfo] = useState<{
    isOpen: boolean;
    type: 'voters' | 'enlisters' | null;
    projectId: string | null;
    userIds: string[];
    title: string;
  }>({ isOpen: false, type: null, projectId: null, userIds: [], title: '' });

  // Member Detail Modal State
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Mock activity feed - in production this would come from backend
  const [activities] = useState<ActivityItem[]>([
    { id: '1', type: 'upvote', userId: 'm1', projectId: 'p1', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: '2', type: 'enlist', userId: 'm2', projectId: 'p2', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
    { id: '3', type: 'endorse', userId: 'm3', memberId: 'm1', skillName: 'Development', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: '4', type: 'propose', userId: 'm4', projectId: 'p3', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
    { id: '5', type: 'upvote', userId: 'm5', projectId: 'p1', timestamp: new Date(Date.now() - 1000 * 60 * 120) },
  ]);

  const handleShowVoters = (projectId: string, voterIds: string[]) => {
    setModalInfo({
      isOpen: true,
      type: 'voters',
      projectId,
      userIds: voterIds,
      title: `Voted by (${voterIds.length})`
    });
  };

  const handleShowEnlisters = (projectId: string, enlistersIds: string[]) => {
    setModalInfo({
      isOpen: true,
      type: 'enlisters',
      projectId,
      userIds: enlistersIds,
      title: `Enlisted (${enlistersIds.length})`
    });
  };

  const closeProposalModal = () => {
    setIsProposalModalOpen(false);
    setEditingProject(null);
  };

  const closeVotersModal = () => {
    setModalInfo({ isOpen: false, type: null, projectId: null, userIds: [], title: '' });
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
  };

  const closeModal = () => {
    if (isProposalModalOpen) closeProposalModal();
    if (modalInfo.isOpen) closeVotersModal();
  };

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

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsProposalModalOpen(true);
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

  // Filter and sort projects
  const filteredProjects = projects
    .filter(p => p.status === activeTab)
    .filter(p => proposalSearch === '' || p.title.toLowerCase().includes(proposalSearch.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.upvoterIds.length - a.upvoterIds.length;
        case 'enlistments':
          return b.enlistedIds.length - a.enlistedIds.length;
        case 'recent':
        default:
          return new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime();
      }
    });

  const isElder = user.isLoggedIn && (user.member?.role === 'Elder' || user.member?.role === 'Representative');

  // Format activity text
  const getActivityText = (activity: ActivityItem) => {
    const user = members.find(m => m.id === activity.userId);
    if (!user) return '';
    
    switch (activity.type) {
      case 'upvote':
        const project1 = projects.find(p => p.id === activity.projectId);
        return `${user.name} upvoted "${project1?.title}"`;
      case 'enlist':
        const project2 = projects.find(p => p.id === activity.projectId);
        return `${user.name} enlisted in "${project2?.title}"`;
      case 'endorse':
        return `${user.name} endorsed ${activity.skillName}`;
      case 'propose':
        const project3 = projects.find(p => p.id === activity.projectId);
        return `${user.name} proposed "${project3?.title}"`;
    }
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'upvote': return <ThumbsUp className="w-4 h-4 text-plague" />;
      case 'enlist': return <UserPlus className="w-4 h-4 text-plague" />;
      case 'endorse': return <Activity className="w-4 h-4 text-plague" />;
      case 'propose': return <Target className="w-4 h-4 text-plague" />;
    }
  };

  const formatTime = (date: Date) => {
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4 md:pb-6">
          {/* Tabs */}
          <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
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
          <div className="flex items-center gap-3 shrink-0">
            {activeTab === 'Proposal' && isElder && (
              <button 
                onClick={() => setIsProposalModalOpen(true)}
                className="plague-button flex items-center gap-2 text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Propose</span>
              </button>
            )}
            <button 
              onClick={() => setShowActivityFeed(!showActivityFeed)}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg transition-all ${
                showActivityFeed ? 'bg-plague/20 text-plague' : 'bg-white/5 text-white/40'
              }`}
            >
              <Clock className="w-4 h-4" />
              Activity
            </button>
          </div>
        </div>

        {/* Sort & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 bg-white/5 rounded-xl p-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text"
              placeholder="Search proposals..."
              value={proposalSearch}
              onChange={(e) => setProposalSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-plague focus:ring-0"
            />
          </div>
          
          {/* Sort */}
          <div className="flex gap-2">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-plague focus:ring-0 cursor-pointer appearance-none"
            >
              <option value="recent" className="bg-black">Recent</option>
              <option value="votes" className="bg-black">Most Voted</option>
              <option value="enlistments" className="bg-black">Most Enlisted</option>
            </select>
          </div>
        </div>

        {/* Activity Feed Sidebar (collapsible) */}
        {showActivityFeed && (
          <div className="bg-white/5 rounded-xl border border-white/10 p-4">
            <h3 className="text-sm font-bold text-plagueDark uppercase tracking-widest mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Recent Activity
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="shrink-0">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <span className="text-white/80 truncate">{getActivityText(activity)}</span>
                  </div>
                  <span className="text-xs text-white/30 shrink-0">{formatTime(activity.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 min-h-[300px]">
          {filteredProjects.length > 0 ? filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onUpvote={onUpvote} 
              onEnlist={onEnlist}
              onEdit={handleEdit}
              onShowVoters={() => handleShowVoters(project.id, project.upvoterIds)}
              onShowEnlisters={() => handleShowEnlisters(project.id, project.enlistedIds)}
              members={members}
              currentUser={user}
            />
          )) : (
            <div className="flex flex-col items-center justify-center py-12 md:py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
              <Activity className="w-8 h-8 md:w-12 md:h-12 text-white/20 mb-3" />
              <p className="text-base md:text-xl text-white/40 font-brushed uppercase">
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

        {/* Show All Toggle */}
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
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-out gap-4 md:gap-6"
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {members.map((member) => (
                  <div key={member.id} className="flex-none w-[280px] md:w-[320px]">
                    <button 
                      onClick={() => setSelectedMember(member)}
                      className="w-full text-left"
                    >
                      <MemberCard member={member} onEndorse={onEndorse} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {members.length > 3 && (
              <>
                <button 
                  onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                  disabled={carouselIndex === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-plague hover:bg-plague hover:text-black disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCarouselIndex(Math.min(members.length - 3, carouselIndex + 1))}
                  disabled={carouselIndex >= members.length - 3}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-plague hover:bg-plague hover:text-black disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {members.length > 3 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: Math.max(1, members.length - 2) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === carouselIndex ? 'bg-plague w-6' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Full Grid View with Filters */}
        {showAllMembers && (
          <>
            <div className="bg-white/5 rounded-xl border border-white/10 p-4 space-y-4">
              <div className="flex items-center gap-2 text-plague text-xs font-bold uppercase tracking-widest">
                <Settings2 className="w-4 h-4" />
                <span>Filter Frogs</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input 
                    type="text" 
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-plague focus:ring-0"
                  />
                </div>
                
                <select 
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value as any)}
                  className="bg-black border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-plague focus:ring-0 cursor-pointer appearance-none"
                >
                  <option value="" className="bg-black">All Skills</option>
                  {SKILL_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-black">{opt}</option>)}
                </select>
                
                <select 
                  value={selectedWorkgroup}
                  onChange={(e) => setSelectedWorkgroup(e.target.value as any)}
                  className="bg-black border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-plague focus:ring-0 cursor-pointer appearance-none"
                >
                  <option value="" className="bg-black">All Workgroups</option>
                  {WORKGROUP_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-black">{opt}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {members
                .filter(m => {
                  const matchesSearch = searchQuery === '' || m.name.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchesSkill = selectedSkill === '' || m.skills.some(s => s.name === selectedSkill);
                  const matchesWorkgroup = selectedWorkgroup === '' || m.workgroups.includes(selectedWorkgroup);
                  return matchesSearch && matchesSkill && matchesWorkgroup;
                })
                .map(member => (
                  <button 
                    key={member.id} 
                    onClick={() => setSelectedMember(member)}
                    className="w-full text-left"
                  >
                    <MemberCard member={member} onEndorse={onEndorse} />
                  </button>
                ))
              }
            </div>
          </>
        )}
      </section>

      {/* Proposal Modal */}
      {isProposalModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="card-glass w-full max-w-lg md:max-w-2xl p-6 md:p-8 relative my-4">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/40 hover:text-plague transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl md:text-4xl font-brushed text-plague mb-6 md:mb-8 uppercase">
              {editingProject ? 'Modify Operation' : 'Propose Operation'}
            </h2>
            
            <form onSubmit={handleSubmitProposal} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Operation Title</label>
                  <input 
                    required
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    placeholder="e.g. Swamp OS Development"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base text-white focus:border-plague focus:ring-0"
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
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-plague focus:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Mission Briefing</label>
                <textarea 
                  required
                  rows={3}
                  value={proposalDesc}
                  onChange={(e) => setProposalDesc(e.target.value)}
                  placeholder="Detail the objectives of this operation..."
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-plague focus:ring-0 resize-none"
                />
              </div>

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

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Operation Tags</label>
                <input 
                  value={proposalTags}
                  onChange={(e) => setProposalTags(e.target.value)}
                  placeholder="Dev, Lore, Community"
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-plague focus:ring-0"
                />
              </div>

              <button type="submit" className="plague-button w-full py-4 text-base md:text-lg flex items-center justify-center gap-2 mt-4">
                <span>{editingProject ? 'Update Data' : 'Authorize Proposal'}</span>
                {editingProject ? <Activity className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Voters/Enlisters Modal */}
      <VotersEnlistersModal
        isOpen={modalInfo.isOpen}
        onClose={closeVotersModal}
        title={modalInfo.title}
        members={members}
        userIds={modalInfo.userIds}
        emptyMessage="No one yet"
      />

      {/* Member Detail Modal */}
      <MemberDetailModal
        isOpen={!!selectedMember}
        onClose={closeMemberModal}
        member={selectedMember}
        onEndorse={onEndorse}
      />
    </div>
  );
};

export default Home;
