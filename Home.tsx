
import React, { useState, useEffect } from 'react';
import { Search, Users, Activity, Target, MessageSquareCode, Filter, Plus, X, Calendar, Infinity, Briefcase, Settings2 } from 'lucide-react';
import MemberCard from '../components/MemberCard';
import ProjectCard from '../components/ProjectCard';
import { Member, Project, SkillType, WorkgroupType, UserState } from '../types';
import { SKILL_OPTIONS, WORKGROUP_OPTIONS } from '../constants';

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

  // Form state
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDesc, setProposalDesc] = useState('');
  const [proposalTags, setProposalTags] = useState('');
  const [proposalWG, setProposalWG] = useState<WorkgroupType>(WORKGROUP_OPTIONS[0]);
  const [proposalStartDate, setProposalStartDate] = useState('');
  const [proposalEndDate, setProposalEndDate] = useState('');
  const [proposalIsOngoing, setProposalIsOngoing] = useState(false);
  const [proposalRequirements, setProposalRequirements] = useState(''); // Comma separated string for multiple skills
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
    <div className="space-y-32 pb-40">
      {/* Hero Section */}
      <section className="relative pt-48 pb-10 text-center flex flex-col items-center">
        <div className="max-w-4xl px-4 space-y-12">
          <h1 className="text-6xl md:text-[5.5rem] font-brushed text-plague leading-[1.1] uppercase tracking-wide">
            The Plague <br />
            Community Hub
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
            A decentralized collaboration engine for the Plague Collective. <br className="hidden md:block" />
            Join the trenches, forge specialties, and enlist in missions.
          </p>
        </div>
      </section>

      {/* Tabbed Mission Hub */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-6">
           <div className="flex space-x-8 overflow-x-auto pb-2 scrollbar-hide">
             <button 
                onClick={() => setActiveTab('Proposal')}
                className={`text-4xl font-brushed uppercase transition-all whitespace-nowrap ${activeTab === 'Proposal' ? 'text-plague scale-105' : 'text-white/40 hover:text-white'}`}
             >
               Elders Proposals
             </button>
             <button 
                onClick={() => setActiveTab('Live')}
                className={`text-4xl font-brushed uppercase transition-all whitespace-nowrap ${activeTab === 'Live' ? 'text-plague scale-105' : 'text-white/40 hover:text-white'}`}
             >
               Live Operations
             </button>
             <button 
                onClick={() => setActiveTab('Ended')}
                className={`text-4xl font-brushed uppercase transition-all whitespace-nowrap ${activeTab === 'Ended' ? 'text-plague scale-105' : 'text-white/40 hover:text-white'}`}
             >
               Archive
             </button>
           </div>

           <div className="flex items-center gap-4 shrink-0">
              {activeTab === 'Proposal' && isElder && (
                <button 
                  onClick={() => setIsProposalModalOpen(true)}
                  className="plague-button flex items-center gap-2 text-xs"
                >
                  <Plus className="w-4 h-4" />
                  Propose Operation
                </button>
              )}
              {activeTab === 'Proposal' && (
                <div className="flex items-center space-x-2 text-plagueDark font-bold text-xs uppercase tracking-widest">
                  <MessageSquareCode className="w-5 h-5" />
                  <span>From Elders & Representatives</span>
                </div>
              )}
           </div>
        </div>
        
        <div className="grid grid-cols-1 gap-12 min-h-[400px]">
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
            <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <Activity className="w-12 h-12 text-white/20 mb-4" />
              <p className="text-white/40 font-brushed text-2xl uppercase">No {activeTab === 'Ended' ? 'archived' : activeTab.toLowerCase()} operations found</p>
            </div>
          )}
        </div>
      </section>

      {/* Swamp Grid */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
           <div className="flex items-center space-x-4 shrink-0">
              <Target className="w-8 h-8 text-plague" />
              <h2 className="text-5xl font-brushed text-white uppercase">Swamp</h2>
              <div className="text-plagueDark font-brushed text-xl hidden sm:block">
                {members.length} Active
              </div>
           </div>

           <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 flex-1 lg:max-w-3xl">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-plagueDark group-focus-within:text-plague transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search frogs..."
                  className="w-full bg-black border border-white/10 rounded-full pl-12 pr-4 py-2.5 text-sm focus:border-plague focus:ring-0 text-white placeholder:text-white/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select 
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value as any)}
                className="bg-black border border-white/10 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-plagueDark focus:border-plague focus:ring-0 cursor-pointer appearance-none"
              >
                <option value="" className="bg-black">All Skills</option>
                {SKILL_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-black">{opt}</option>)}
              </select>

              <select 
                value={selectedWorkgroup}
                onChange={(e) => setSelectedWorkgroup(e.target.value as any)}
                className="bg-black border border-white/10 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-plagueDark focus:border-plague focus:ring-0 cursor-pointer appearance-none"
              >
                <option value="" className="bg-black">All Workgroups</option>
                {WORKGROUP_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-black">{opt}</option>)}
              </select>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.length > 0 ? members.map(member => (
            <MemberCard key={member.id} member={member} onEndorse={onEndorse} />
          )) : (
            <div className="col-span-full py-20 text-center text-white/20 font-brushed text-2xl uppercase border border-dashed border-white/10 rounded-3xl">
              No matching frogs found in this sector.
            </div>
          )}
        </div>
      </section>

      {/* Proposal Modal (New or Edit) */}
      {isProposalModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="card-glass w-full max-w-2xl p-8 relative overflow-hidden my-auto">
             <button 
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/40 hover:text-plague transition-colors"
             >
               <X className="w-8 h-8" />
             </button>

             <h2 className="text-4xl font-brushed text-plague mb-8 uppercase">
               {editingProject ? 'Modify Operation' : 'Propose Operation'}
             </h2>
             
             <form onSubmit={handleSubmitProposal} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Operation Title</label>
                    <input 
                      required
                      value={proposalTitle}
                      onChange={(e) => setProposalTitle(e.target.value)}
                      placeholder="e.g. Swamp OS Development"
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-plague focus:ring-0 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Required Skills / Specializations</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input 
                        required
                        value={proposalRequirements}
                        onChange={(e) => setProposalRequirements(e.target.value)}
                        placeholder="e.g. Developer, Content Creator..."
                        className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:border-plague focus:ring-0 transition-all"
                      />
                    </div>
                    <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold px-2 italic">Separate multiple skills with commas</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Mission Briefing (3-5 phrases)</label>
                  <textarea 
                    required
                    rows={4}
                    value={proposalDesc}
                    onChange={(e) => setProposalDesc(e.target.value)}
                    placeholder="Detail the objectives of this operation. What is the goal? Who does it serve?"
                    className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-plague focus:ring-0 transition-all resize-none"
                  />
                </div>

                {/* Date Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      Start Date
                    </label>
                    <input 
                      type="date"
                      required
                      value={proposalStartDate}
                      onChange={(e) => setProposalStartDate(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-plague focus:ring-0 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        End Date
                      </label>
                      <button 
                        type="button"
                        onClick={() => setProposalIsOngoing(!proposalIsOngoing)}
                        className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${proposalIsOngoing ? 'text-plague' : 'text-white/20'}`}
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
                      className={`w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-plague focus:ring-0 transition-all ${proposalIsOngoing ? 'opacity-30' : ''}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Workgroup Deployment</label>
                    <select 
                      value={proposalWG}
                      onChange={(e) => setProposalWG(e.target.value as WorkgroupType)}
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-plague focus:ring-0 appearance-none cursor-pointer"
                    >
                      {WORKGROUP_OPTIONS.map(wg => <option key={wg} value={wg} className="bg-black">{wg}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Deployment Status</label>
                    <div className="relative">
                      <Settings2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                      <select 
                        value={proposalStatus}
                        onChange={(e) => setProposalStatus(e.target.value as any)}
                        className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:border-plague focus:ring-0 appearance-none cursor-pointer"
                      >
                        <option value="Proposal" className="bg-black text-blue-400">Proposal Phase</option>
                        <option value="Live" className="bg-black text-plague">Live Operation</option>
                        <option value="Ended" className="bg-black text-red-400">Ended / Archived</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Operation Tags (comma separated)</label>
                  <input 
                    value={proposalTags}
                    onChange={(e) => setProposalTags(e.target.value)}
                    placeholder="Dev, Lore, Community"
                    className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-plague focus:ring-0 transition-all"
                  />
                </div>

                <div className="pt-6">
                  <button type="submit" className="plague-button w-full py-5 text-xl flex items-center justify-center gap-4">
                    <span>{editingProject ? 'Update Operation Data' : 'Authorize Proposal'}</span>
                    {editingProject ? <Activity className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
