
export type RoleType = 'Army' | 'Citizen' | 'Representative' | 'Elder';

export type SkillType = 'Development' | 'Design' | 'Marketing' | 'Lore' | 'Community' | 'Trading' | 'Legal' | 'Music' | 'AI' | 'Podcast' | 'Outreach' | 'Sales';

export type WorkgroupType = 'The Lab (Dev)' | 'The Studio (Art)' | 'The Megaphone (Marketing)' | 'The Neural Net (AI)' | 'The Tower (Lore)' | 'The Streets (Outreach)' | 'The Airwaves (Podcast)';

export interface Skill {
  name: string;
  category: SkillType;
  endorsements: number;
}

export interface Member {
  id: string;
  name: string;
  xHandle: string;
  bio: string;
  avatar: string;
  skills: Skill[];
  workgroups: WorkgroupType[];
  role: RoleType;
  isRecruiter: boolean;
  learningMode: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  elderId: string;
  upvoterIds: string[]; // Changed from upvotes: number
  tags: string[];
  workgroup: WorkgroupType;
  status: 'Live' | 'Proposal' | 'Ended';
  applicants: number;
  requirements: string[];
  enlistedIds: string[];
  startDate?: string;
  endDate?: string;
  isOngoing?: boolean;
}

export interface UserState {
  isLoggedIn: boolean;
  member?: Member;
}
