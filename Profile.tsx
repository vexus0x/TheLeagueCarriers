import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Twitter, Save, User, Sparkles, CheckCircle2, ShieldHalf, Plus, X, Tag } from 'lucide-react';
import { UserState, Member, SkillType, WorkgroupType, Skill } from './types';
import { SKILL_OPTIONS, WORKGROUP_OPTIONS } from './constants';

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
    <div className="max-w-4xl mx-auto space-y-8 pb-24 px-4 pt-20 md:pt-24">
      {/* Identity Header */}
      <div className="card-glass p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <Twitter className="w-20 h-20 md:w-24 md:h-24 text-plague" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
          <div className="relative">
            <img 
              src={formData.avatar} 
              className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-plagueDark shadow-[0_0_30px_rgba(182,255,145,0.2)] object-cover"
              alt="Avatar"
            />
            <div className="absolute -bottom-1 -right-1 bg-plagueDark p-2 rounded-full border-4 border-black">
              <Twitter className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </div>
          </div>
          
          <div className="text-center md:text-left space-y-3 flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <h1 className="text-3xl md:text-4xl font-brushed text-white uppercase tracking-tight">
                {formData.name}
              </h1>
              <span className="inline-block bg-white/10 px-3 py-1 rounded-full border border-white/20 text-plagueDark font-bold text-xs uppercase tracking-widest">
                @{formData.xHandle}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
               <div className="flex items-center gap-2 text-plague text-xs font-bold uppercase tracking-widest">
                 <ShieldHalf className="w-4 h-4" />
                 <span>Role: {formData.role}</span>
               </div>
               <span className="text-white/40 text-xs font-bold uppercase tracking-widest">ID_{formData.id}</span>
            </div>

            <p className="text-white/60 font-medium text-sm md:text-base max-w-md italic">
              "{formData.bio}"
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Skill Forge */}
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-plague" />
              <h2 className="text-2xl md:text-3xl font-brushed text-white uppercase">Skill Forge</h2>
            </div>
            
            {/* Active Skills */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Active Specialties</label>
              <div className="flex flex-wrap gap-2 min-h-[48px] p-4 bg-white/5 rounded-xl border border-dashed border-white/10">
                {formData.skills.length > 0 ? formData.skills.map(skill => (
                  <div 
                    key={skill.name} 
                    className="flex items-center gap-2 bg-plagueDark/20 border border-plagueDark/40 px-3 py-1.5 rounded-full text-plague group/chip"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">{skill.name}</span>
                    <button 
                      onClick={() => removeSkill(skill.name)}
                      className="hover:text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )) : (
                  <span className="text-xs text-white/20 uppercase font-bold tracking-widest flex items-center gap-2">
                    No specialties active
                  </span>
                )}
              </div>
            </div>

            {/* Add Custom Skill */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Add Specialty</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input 
                    type="text"
                    value={customSkillName}
                    onChange={(e) => setCustomSkillName(e.target.value)}
                    placeholder="Enter specialty..."
                    className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-3 py-3 text-sm text-white placeholder:text-white/20 focus:border-plague focus:ring-0 transition-all"
                  />
                </div>
                <select 
                  value={customSkillCategory}
                  onChange={(e) => setCustomSkillCategory(e.target.value as SkillType)}
                  className="bg-black border border-white/10 rounded-xl px-3 py-3 text-xs font-bold uppercase tracking-widest text-white focus:border-plague focus:ring-0 cursor-pointer appearance-none"
                >
                  {SKILL_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-black">{opt}</option>)}
                </select>
                <button 
                  onClick={handleAddCustomSkill}
                  className="plague-button flex items-center justify-center gap-2 px-4 md:px-6"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
            
            {/* Skill Options */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Quick Add</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SKILL_OPTIONS.map(skill => {
                  const isActive = formData.skills.some(s => s.name.toLowerCase() === skill.toLowerCase());
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill, 'Community')}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
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

          {/* Workgroup Deployment */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <User className="w-5 h-5 md:w-6 md:h-6 text-plague" />
              <h2 className="text-2xl md:text-3xl font-brushed text-white uppercase">Workgroups</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WORKGROUP_OPTIONS.map(wg => {
                const isActive = formData.workgroups.includes(wg);
                return (
                  <button
                    key={wg}
                    onClick={() => toggleWorkgroup(wg)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      isActive 
                        ? 'bg-plagueDark/20 border-plagueDark text-plague' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-plagueDark/50'
                    }`}
                  >
                    <span className="text-xs font-black uppercase tracking-wider">{wg}</span>
                    <div className={`w-3 h-3 rounded-full border-2 ${isActive ? 'bg-plague border-plague' : 'border-white/20'}`}></div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Profile Controls */}
        <div className="space-y-6">
          <div className="card-glass p-6 space-y-6 sticky top-24">
            <h3 className="text-lg md:text-xl font-brushed text-white uppercase">Settings</h3>
            
            <div className="space-y-4">
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
                Enabling Learning Mode marks you as seeking mentorship.
              </p>
            </div>

            <button 
              onClick={handleSave}
              className="plague-button w-full flex items-center justify-center gap-2 py-4"
            >
              <Save className="w-5 h-5" />
              <span>Save Profile</span>
            </button>

            <div className="bg-plagueDark/10 border border-plagueDark/20 p-4 rounded-xl text-center space-y-2">
              <div className="text-[10px] font-black text-plagueDark uppercase tracking-widest">Linked Account</div>
              <div className="flex items-center justify-center gap-2">
                 <Twitter className="w-4 h-4 text-plague" />
                 <span className="text-white font-bold text-sm">@{formData.xHandle}</span>
              </div>
              <button className="text-xs text-white/40 hover:text-white underline uppercase font-bold transition-colors">
                Re-sync
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
