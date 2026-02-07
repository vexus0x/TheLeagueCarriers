
import React, { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import { Member, Project, UserState, SkillType, WorkgroupType } from './types';
import { MOCK_MEMBERS, MOCK_PROJECTS } from './constants';

const App: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [user, setUser] = useState<UserState>({ isLoggedIn: false });
  
  // Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillType | ''>('');
  const [selectedWorkgroup, setSelectedWorkgroup] = useState<WorkgroupType | ''>('');

  const login = () => {
    // For testing: Log in as Doctor Vile (Elder) to see the Proposal Form
    const elderUser = MOCK_MEMBERS.find(m => m.role === 'Elder') || MOCK_MEMBERS[0];
    
    setUser({
      isLoggedIn: true,
      member: elderUser
    });
  };

  const logout = () => {
    setUser({ isLoggedIn: false });
  };

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const matchesSearch = !searchQuery || 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.skills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSkill = !selectedSkill || 
        m.skills.some(s => s.name === selectedSkill || s.category === selectedSkill);
        
      const matchesWorkgroup = !selectedWorkgroup || 
        m.workgroups.includes(selectedWorkgroup);

      return matchesSearch && matchesSkill && matchesWorkgroup;
    });
  }, [members, searchQuery, selectedSkill, selectedWorkgroup]);

  const handleEndorse = (memberId: string, skillName: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          skills: m.skills.map(s => s.name === skillName ? { ...s, endorsements: s.endorsements + 1 } : s)
        };
      }
      return m;
    }));
  };

  const handleUpvote = (projectId: string) => {
    if (!user.isLoggedIn || !user.member) {
      alert("Authenticate to cast your vote.");
      return;
    }
    
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const hasVoted = p.upvoterIds.includes(user.member!.id);
        if (hasVoted) {
          // Retrieve vote
          return { ...p, upvoterIds: p.upvoterIds.filter(id => id !== user.member!.id) };
        } else {
          // Add vote
          return { ...p, upvoterIds: [...p.upvoterIds, user.member!.id] };
        }
      }
      return p;
    }));
  };

  const handleEnlist = (projectId: string) => {
    if (!user.isLoggedIn || !user.member) {
      alert("Authenticate your wallet to enlist in missions.");
      return;
    }
    
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        if (p.enlistedIds.includes(user.member!.id)) {
          alert("You are already enlisted for this operation.");
          return p;
        }
        return {
          ...p,
          enlistedIds: [...p.enlistedIds, user.member!.id]
        };
      }
      return p;
    }));
    alert("ENLISTMENT COMPLETE. PREPARE FOR DEPLOYMENT.");
  };

  const handleAddProject = (projectData: Partial<Project>) => {
    if (!user.member) return;
    
    if (projectData.id) {
      // Edit existing
      setProjects(prev => prev.map(p => p.id === projectData.id ? { ...p, ...projectData } : p));
      alert("OPERATION_MODIFIED. INTEL_UPDATED.");
    } else {
      // Create new
      const newProject: Project = {
        id: `P${projects.length + 1}`,
        title: projectData.title || 'Untitled Proposal',
        description: projectData.description || '',
        elderId: user.member.id,
        upvoterIds: [],
        tags: projectData.tags || [],
        workgroup: projectData.workgroup || 'The Lab (Dev)',
        status: projectData.status || 'Proposal',
        applicants: 0,
        requirements: projectData.requirements && projectData.requirements.length > 0 
          ? projectData.requirements 
          : ['Team Member'],
        enlistedIds: [],
        startDate: projectData.startDate,
        endDate: projectData.endDate,
        isOngoing: projectData.isOngoing,
      };
      setProjects(prev => [newProject, ...prev]);
      alert("PROPOSAL_LOGGED. MISSION_AWAITING_REVIEWS.");
    }
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar 
          user={user} 
          onLogin={login} 
          onLogout={logout} 
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <Home 
                user={user}
                members={filteredMembers} 
                projects={projects} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
                selectedWorkgroup={selectedWorkgroup}
                setSelectedWorkgroup={setSelectedWorkgroup}
                onEndorse={handleEndorse}
                onUpvote={handleUpvote}
                onEnlist={handleEnlist}
                onAddProject={handleAddProject}
              />
            } />
            <Route path="/profile" element={
              <Profile 
                user={user} 
                setMembers={setMembers}
                setUser={setUser}
              />
            } />
          </Routes>
        </main>

        <footer className="py-12 text-center text-white/20 mt-20 font-brushed uppercase tracking-widest text-xs">
          <p>© 2024 The Plague Collective. Stay Infected.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
