
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Twitter, Save, User, Sparkles, CheckCircle2, ShieldHalf, Plus, X, Tag } from 'lucide-react';
import { UserState, Member, SkillType, WorkgroupType, Skill } from '../types';
import { SKILL_OPTIONS, WORKGROUP_OPTIONS } from '../constants';

interface ProfileProps { 
  user: UserState; 
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
}

const Profile: React.FC<ProfileProps> = ({ user, setMembers, setUser }) => {
  if (!user.isLoggedIn || !user.member) return <Navigate to="/" />;

  const [formData, setFormData] = useState<Member>(user.member);
  const [customSkillName, setCustomSkillName] = useState('');
  const [customSkillCategory, setCustomSkillCategory] = useState<SkillType>(SKILL_OPTIONS[0]);

  const handleSave = () => {
    setMembers(prev => prev.map(m => m.id === formData.id ? formData : m));
    setUser(prev => ({ ...prev, member: formData }));
    alert('SWAMP_ID_SYNCED. IDENTITY_SECURED.');
  };

  const toggleSkill = (skillName: string, category: SkillType) => {
    setFormData(prev => {
      const exists = prev.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
      if (exists) {
        return { ...prev, skills: prev.skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase()) };
      }
      return { ...prev, skills: [...prev.skills, { name: skillName, category, endorsements: 0 }] };
    });
  };

  const removeSkill = (skillName: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.name !== skillName)
    }));
  };

  const handleAddCustomSkill = () => {
    if (!customSkillName.trim()) return;
    
    const exists = formData.skills.some(s => s.name.toLowerCase() === customSkillName.trim().toLowerCase());
    if (exists) {
      alert("SKILL_ALREADY_LOGGED.");
      return;
    }

    const newSkill: Skill = {
      name: customSkillName.trim(),
      category: customSkillCategory,
      endorsements: 0
    };

    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    setCustomSkillName('');
  };

  const toggleWorkgroup = (wg: WorkgroupType) => {
    setFormData(prev => ({
      ...prev,
      workgroups: prev.workgroups.includes(wg) 
        ? prev.workgroups.filter(w => w !== wg) 
        : [...prev.workgroups, wg]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-32 px-4">
      {/* Identity Header */}
      <div className="card-glass p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Twitter className="w-32 h-32 text-plague" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="relative">
            <img 
              src={formData.avatar} 
              className="w-40 h-40 rounded-full border-4 border-plagueDark shadow-[0_0_30px_rgba(182,255,145,0.2)] object-cover" 
              alt="Avatar"
            />
            <div className="absolute -bottom-2 -right-2 bg-plagueDark p-2 rounded-full border-4 border-black">
              <Twitter className="w-5 h-5 text-black" />
            </div>
          </div>
          
          <div className="text-center md:text-left space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h1 className="text-5xl font-brushed text-white uppercase tracking-tight">
                {formData.name}
              </h1>
              <div className="bg-white/10 px-4 py-1 rounded-full border border-white/20 text-plagueDark font-bold text-xs uppercase tracking-widest">
                @{formData.xHandle}
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-4">
               <div className="flex items-center gap-2 text-plague text-sm font-bold uppercase tracking-widest">
                 <ShieldHalf className="w-4 h-4" />
                 <span>Role: {formData.role}</span>
               </div>
               <div className="h-4 w-px bg-white/10"></div>
               <div className="text-white/40 text-xs font-bold uppercase tracking-widest">ID_{formData.id}</div>
            </div>

            <p className="text-white/60 font-medium max-w-xl italic">
              "{formData.bio}"
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Skill Forge */}
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <Sparkles className="w-6 h-6 text-plague" />
              <h2 className="text-3xl font-brushed text-white uppercase">Skill Forge</h2>
            </div>
            
            {/* Active Skills Chips */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Active Specialties</label>
              <div className="flex flex-wrap gap-3 min-h-[50px] p-4 bg-white/5 rounded-2xl border border-dashed border-white/10">
                {formData.skills.length > 0 ? formData.skills.map(skill => (
                  <div 
                    key={skill.name} 
                    className="flex items-center gap-2 bg-plagueDark/20 border border-plagueDark/40 px-3 py-1.5 rounded-full text-plague group/chip"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">{skill.name}</span>
                    <button 
                      onClick={() => removeSkill(skill.name)}
                      className="hover:text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )) : (
                  <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest flex items-center gap-2">
                    No combat specialties active
                  </span>
                )}
              </div>
            </div>

            {/* Manual Entry */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Manual Entry (e.g. Solidity, UI/UX)</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input 
                    type="text"
                    value={customSkillName}
                    onChange={(e) => setCustomSkillName(e.target.value)}
                    placeholder="Enter specialty name..."
                    className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white text-sm focus:border-plague focus:ring-0 transition-all"
                  />
                </div>
                <select 
                  value={customSkillCategory}
                  onChange={(e) => setCustomSkillCategory(e.target.value as SkillType)}
                  className="bg-black border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest text-white focus:border-plague focus:ring-0 cursor-pointer"
                >
                  {SKILL_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-black">{opt}</option>)}
                </select>
                <button 
                  onClick={handleAddCustomSkill}
                  className="plague-button flex items-center justify-center gap-2 px-8"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Predefined Specialties</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SKILL_OPTIONS.map(skill => {
                  const isActive = formData.skills.some(s => s.name.toLowerCase() === skill.toLowerCase());
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill, 'Community')}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        isActive 
                          ? 'bg-plagueDark border-plagueDark text-black' 
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-plagueDark/50'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase">{skill}</span>
                      {isActive && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <User className="w-6 h-6 text-plague" />
              <h2 className="text-3xl font-brushed text-white uppercase">Workgroup Deployment</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WORKGROUP_OPTIONS.map(wg => {
                const isActive = formData.workgroups.includes(wg);
                return (
                  <button
                    key={wg}
                    onClick={() => toggleWorkgroup(wg)}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                      isActive 
                        ? 'bg-plagueDark/20 border-plagueDark text-plague' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-plagueDark/50'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">{wg}</span>
                    <div className={`w-3 h-3 rounded-full border-2 ${isActive ? 'bg-plague border-plague' : 'border-white/20'}`}></div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Profile Controls */}
        <div className="space-y-8">
           <div className="card-glass p-8 space-y-8 sticky top-32">
             <h3 className="text-xl font-brushed text-white uppercase">Sync Settings</h3>
             
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white/40 uppercase">Learning Mode</span>
                  <button 
                    onClick={() => setFormData(p => ({ ...p, learningMode: !p.learningMode }))}
                    className={`w-12 h-6 rounded-full transition-all relative ${formData.learningMode ? 'bg-plagueDark' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.learningMode ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
                
                <p className="text-[10px] text-white/30 italic">
                  Enabling Learning Mode flags you as looking for mentorship in the trenches.
                </p>
             </div>

             <button 
              onClick={handleSave}
              className="plague-button w-full flex items-center justify-center gap-3 py-4 text-sm"
             >
               <Save className="w-5 h-5" />
               Update Profile
             </button>
           </div>

           <div className="bg-plagueDark/10 border border-plagueDark/20 p-6 rounded-3xl text-center space-y-4">
              <div className="text-[10px] font-black text-plagueDark uppercase tracking-widest">Linked Twitter Account</div>
              <div className="flex items-center justify-center gap-2">
                 <Twitter className="w-4 h-4 text-plague" />
                 <span className="text-white font-bold">@{formData.xHandle}</span>
              </div>
              <button className="text-[10px] text-white/40 hover:text-white underline uppercase font-bold transition-colors">
                Re-sync data
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
