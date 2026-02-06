
import { Member, Project, SkillType, WorkgroupType } from './types';

export const SKILL_OPTIONS: SkillType[] = [
  'Development', 'Design', 'Marketing', 'Lore', 'Community', 'Trading', 'Legal', 'Music', 'AI', 'Podcast', 'Outreach', 'Sales'
];

export const WORKGROUP_OPTIONS: WorkgroupType[] = [
  'The Lab (Dev)', 'The Studio (Art)', 'The Megaphone (Marketing)', 'The Neural Net (AI)', 'The Tower (Lore)', 'The Streets (Outreach)', 'The Airwaves (Podcast)'
];

export const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Doctor Vile',
    xHandle: 'dr_vile',
    bio: 'Lead Alchemist. Here to coordinate the voluntary dev efforts. Get in the trenches.',
    avatar: 'https://picsum.photos/seed/plague1/200/200',
    role: 'Elder',
    isRecruiter: true,
    learningMode: false,
    workgroups: ['The Lab (Dev)', 'The Tower (Lore)'],
    skills: [
      { name: 'Solidity', category: 'Development', endorsements: 142 },
      { name: 'Lore Crafting', category: 'Lore', endorsements: 89 }
    ]
  },
  {
    id: '2',
    name: 'Leaping Lily',
    xHandle: 'lily_leap',
    bio: 'Designer learning the ropes of Web3. Eager to contribute to art workgroups!',
    avatar: 'https://picsum.photos/seed/plague2/200/200',
    role: 'Army',
    isRecruiter: false,
    learningMode: true,
    workgroups: ['The Studio (Art)'],
    skills: [
      { name: 'UI/UX', category: 'Design', endorsements: 12 },
      { name: 'Illustrator', category: 'Design', endorsements: 8 }
    ]
  },
  {
    id: '3',
    name: 'Podcast Pete',
    xHandle: 'pete_waves',
    bio: 'I bring the noise. Organizing the weekly Frog Tank podcast. Join us!',
    avatar: 'https://picsum.photos/seed/plague3/200/200',
    role: 'Representative',
    isRecruiter: true,
    learningMode: false,
    workgroups: ['The Airwaves (Podcast)'],
    skills: [
      { name: 'Audio Editing', category: 'Podcast', endorsements: 56 },
      { name: 'Public Speaking', category: 'Outreach', endorsements: 92 }
    ]
  },
  {
    id: '4',
    name: 'Neural Toad',
    xHandle: 'neural_toad',
    bio: 'AI researcher and prototype engineer. Looking to automate the Plague workflow.',
    avatar: 'https://picsum.photos/seed/plague4/200/200',
    role: 'Citizen',
    isRecruiter: false,
    learningMode: false,
    workgroups: ['The Neural Net (AI)'],
    skills: [
      { name: 'LLM Prompting', category: 'AI', endorsements: 44 },
      { name: 'Python', category: 'Development', endorsements: 31 }
    ]
  },
  {
    id: '5',
    name: 'Lore Master Xen',
    xHandle: 'xen_lore',
    bio: 'Keeper of the ancient swamp scripts. If it happened in the marsh, I have it recorded.',
    avatar: 'https://picsum.photos/seed/plague5/200/200',
    role: 'Elder',
    isRecruiter: false,
    learningMode: false,
    workgroups: ['The Tower (Lore)'],
    skills: [
      { name: 'World Building', category: 'Lore', endorsements: 110 },
      { name: 'Copywriting', category: 'Marketing', endorsements: 45 }
    ]
  },
  {
    id: '6',
    name: 'Shadow Coder',
    xHandle: 'sh_coder',
    bio: 'Full stack wizard dwelling in the darkness. Building the tools for the next leap.',
    avatar: 'https://picsum.photos/seed/plague6/200/200',
    role: 'Representative',
    isRecruiter: true,
    learningMode: false,
    workgroups: ['The Lab (Dev)'],
    skills: [
      { name: 'React', category: 'Development', endorsements: 88 },
      { name: 'Node.js', category: 'Development', endorsements: 67 },
      { name: 'Rust', category: 'Development', endorsements: 22 }
    ]
  },
  {
    id: '7',
    name: 'Marsh Marketer',
    xHandle: 'marsh_mkt',
    bio: 'Spreading the contagion of growth. Community first, metrics second.',
    avatar: 'https://picsum.photos/seed/plague7/200/200',
    role: 'Citizen',
    isRecruiter: false,
    learningMode: false,
    workgroups: ['The Megaphone (Marketing)'],
    skills: [
      { name: 'SEO', category: 'Marketing', endorsements: 34 },
      { name: 'Growth Hacking', category: 'Marketing', endorsements: 56 }
    ]
  },
  {
    id: '8',
    name: 'Toxic Trader',
    xHandle: 'tox_trader',
    bio: 'Scalping the dips and longing the leaps. Swamp alpha only.',
    avatar: 'https://picsum.photos/seed/plague8/200/200',
    role: 'Army',
    isRecruiter: false,
    learningMode: true,
    workgroups: ['The Streets (Outreach)'],
    skills: [
      { name: 'Technical Analysis', category: 'Trading', endorsements: 120 },
      { name: 'DeFi Mastery', category: 'Trading', endorsements: 45 }
    ]
  },
  {
    id: '9',
    name: 'Glitch Artist',
    xHandle: 'glitch_art',
    bio: 'Corrupting the visual landscape of the metaverse. Every pixel is a spore.',
    avatar: 'https://picsum.photos/seed/plague9/200/200',
    role: 'Citizen',
    isRecruiter: false,
    learningMode: false,
    workgroups: ['The Studio (Art)'],
    skills: [
      { name: 'Photoshop', category: 'Design', endorsements: 94 },
      { name: '3D Modeling', category: 'Design', endorsements: 28 }
    ]
  },
  {
    id: '10',
    name: 'Legal Leaper',
    xHandle: 'leg_leap',
    bio: 'Navigating the regulatory fog. Protecting the collective from the authorities.',
    avatar: 'https://picsum.photos/seed/plague10/200/200',
    role: 'Representative',
    isRecruiter: false,
    learningMode: false,
    workgroups: ['The Lab (Dev)'],
    skills: [
      { name: 'IP Law', category: 'Legal', endorsements: 76 },
      { name: 'Governance', category: 'Legal', endorsements: 33 }
    ]
  },
  {
    id: '11',
    name: 'Sonic Spore',
    xHandle: 'sonic_spore',
    bio: 'Audio engineer crafting the soundtracks of the swamp.',
    avatar: 'https://picsum.photos/seed/plague11/200/200',
    role: 'Army',
    isRecruiter: false,
    learningMode: true,
    workgroups: ['The Airwaves (Podcast)'],
    skills: [
      { name: 'Sound Design', category: 'Music', endorsements: 42 },
      { name: 'Mixing', category: 'Music', endorsements: 19 }
    ]
  },
  {
    id: '12',
    name: 'Algorand Alchemist',
    xHandle: 'algo_alc',
    bio: 'Specializing in L1 integrations and cross-chain plague vectors.',
    avatar: 'https://picsum.photos/seed/plague12/200/200',
    role: 'Citizen',
    isRecruiter: false,
    learningMode: false,
    workgroups: ['The Lab (Dev)'],
    skills: [
      { name: 'Smart Contracts', category: 'Development', endorsements: 65 },
      { name: 'Golang', category: 'Development', endorsements: 31 }
    ]
  },
  {
    id: '13',
    name: 'Vibe Checker',
    xHandle: 'vibe_chk',
    bio: 'Community manager extraordinaire. Keeping the swamp toxicity levels at bay.',
    avatar: 'https://picsum.photos/seed/plague13/200/200',
    role: 'Army',
    isRecruiter: false,
    learningMode: false,
    workgroups: ['The Megaphone (Marketing)'],
    skills: [
      { name: 'Discord Mastery', category: 'Community', endorsements: 156 },
      { name: 'Moderation', category: 'Community', endorsements: 89 }
    ]
  },
  {
    id: '14',
    name: 'Outreach Operative',
    xHandle: 'out_op',
    bio: 'Infiltrating other communities to spread the Plague gospel.',
    avatar: 'https://picsum.photos/seed/plague14/200/200',
    role: 'Citizen',
    isRecruiter: true,
    learningMode: false,
    workgroups: ['The Streets (Outreach)'],
    skills: [
      { name: 'Sales', category: 'Sales', endorsements: 47 },
      { name: 'Partnerships', category: 'Outreach', endorsements: 62 }
    ]
  },
  {
    id: '15',
    name: 'Data Diver',
    xHandle: 'data_div',
    bio: 'Analyzing the chain to find the next big spore cluster.',
    avatar: 'https://picsum.photos/seed/plague15/200/200',
    role: 'Representative',
    isRecruiter: false,
    learningMode: false,
    workgroups: ['The Neural Net (AI)'],
    skills: [
      { name: 'Data Visualization', category: 'AI', endorsements: 38 },
      { name: 'SQL', category: 'Development', endorsements: 51 }
    ]
  },
  {
    id: '16',
    name: 'Narrative Navigator',
    xHandle: 'narr_nav',
    bio: 'Ensuring our story remains consistent across all dimensions.',
    avatar: 'https://picsum.photos/seed/plague16/200/200',
    role: 'Elder',
    isRecruiter: false,
    learningMode: false,
    workgroups: ['The Tower (Lore)'],
    skills: [
      { name: 'Creative Writing', category: 'Lore', endorsements: 93 },
      { name: 'Strategy', category: 'Marketing', endorsements: 71 }
    ]
  },
  {
    id: '17',
    name: 'Prompt Engineer P',
    xHandle: 'p_prompt',
    bio: 'Talking to the ghosts in the machine. AI is our greatest mutation.',
    avatar: 'https://picsum.photos/seed/plague17/200/200',
    role: 'Army',
    isRecruiter: false,
    learningMode: true,
    workgroups: ['The Neural Net (AI)'],
    skills: [
      { name: 'Midjourney', category: 'AI', endorsements: 55 },
      { name: 'Stable Diffusion', category: 'AI', endorsements: 32 }
    ]
  },
  {
    id: '18',
    name: 'Podcast Producer L',
    xHandle: 'prod_l',
    bio: 'Behind the scenes of the Frog Tank. Scripting the chaos.',
    avatar: 'https://picsum.photos/seed/plague18/200/200',
    role: 'Citizen',
    isRecruiter: false,
    learningMode: false,
    workgroups: ['The Airwaves (Podcast)'],
    skills: [
      { name: 'Scripting', category: 'Podcast', endorsements: 27 },
      { name: 'Distribution', category: 'Marketing', endorsements: 18 }
    ]
  },
  {
    id: '19',
    name: 'Vector Visionary',
    xHandle: 'vec_vis',
    bio: 'Graphic designer focused on scalable swamp iconography.',
    avatar: 'https://picsum.photos/seed/plague19/200/200',
    role: 'Army',
    isRecruiter: false,
    learningMode: true,
    workgroups: ['The Studio (Art)'],
    skills: [
      { name: 'Branding', category: 'Design', endorsements: 39 },
      { name: 'Typography', category: 'Design', endorsements: 24 }
    ]
  },
  {
    id: '20',
    name: 'Sales Spore',
    xHandle: 'sales_spore',
    bio: 'Closing deals in the dark. Monetizing the marsh.',
    avatar: 'https://picsum.photos/seed/plague20/200/200',
    role: 'Citizen',
    isRecruiter: true,
    learningMode: false,
    workgroups: ['The Streets (Outreach)'],
    skills: [
      { name: 'Direct Sales', category: 'Sales', endorsements: 61 },
      { name: 'Negotiation', category: 'Sales', endorsements: 42 }
    ]
  }
];

export const MOCK_PROJECTS: Project[] = [
  // --- LIVE OPERATIONS (5) ---
  {
    id: 'L1',
    title: 'Frog Tank Weekly Digest',
    description: 'Summarize the weekly podcast into bite-sized Twitter threads and newsletters.',
    elderId: '3',
    upvoterIds: ['1', '2', '4', '6', '13'],
    tags: ['Marketing', 'Content'],
    workgroup: 'The Megaphone (Marketing)',
    status: 'Live',
    applicants: 5,
    requirements: ['Social Media Coordinator', 'Content Creator'],
    enlistedIds: ['2', '4', '18'],
    startDate: '2024-01-01',
    isOngoing: true
  },
  {
    id: 'L2',
    title: 'AI Lore Generator v2',
    description: 'Build a tool that generates character backstories based on Plague NFT metadata with enhanced LLM integration.',
    elderId: '1',
    upvoterIds: ['3', '4', '15', '17', '5'],
    tags: ['AI', 'Dev', 'Lore'],
    workgroup: 'The Neural Net (AI)',
    status: 'Live',
    applicants: 15,
    requirements: ['Developer', 'AI Specialist'],
    enlistedIds: ['2', '6', '12'],
    startDate: '2024-02-15',
    endDate: '2024-06-30'
  },
  {
    id: 'L3',
    title: 'Swamp Dashboard',
    description: 'Real-time analytics for the Plague ecosystem including staking stats and floor prices.',
    elderId: '6',
    upvoterIds: ['1', '8', '12', '15', '20'],
    tags: ['Dev', 'Analytics'],
    workgroup: 'The Lab (Dev)',
    status: 'Live',
    applicants: 8,
    requirements: ['React Dev', 'Backend Engineer'],
    enlistedIds: ['4', '15'],
    startDate: '2024-03-01',
    isOngoing: true
  },
  {
    id: 'L4',
    title: 'Miasma Mural Project',
    description: 'Collaborative art piece involving 50+ artists from the community for the upcoming gallery.',
    elderId: '5',
    upvoterIds: ['2', '9', '11', '19', '16'],
    tags: ['Art', 'Community'],
    workgroup: 'The Studio (Art)',
    status: 'Live',
    applicants: 22,
    requirements: ['Digital Artist', 'Curator'],
    enlistedIds: ['2', '9', '19'],
    startDate: '2024-03-20',
    endDate: '2024-05-20'
  },
  {
    id: 'L5',
    title: 'Street Team Alpha',
    description: 'Guerrilla marketing campaign targeting major web3 conferences (ETH Denver, etc).',
    elderId: '14',
    upvoterIds: ['3', '7', '10', '13', '20'],
    tags: ['Outreach', 'IRL'],
    workgroup: 'The Streets (Outreach)',
    status: 'Live',
    applicants: 12,
    requirements: ['Event Coordinator', 'Ambassador'],
    enlistedIds: ['8', '14', '20'],
    startDate: '2024-02-01',
    isOngoing: true
  },

  // --- PROPOSALS (5) ---
  {
    id: 'P1',
    title: 'Proposal: Swamp OS',
    description: 'Concept for a decentralized operating system for frog-based communities.',
    elderId: '1',
    upvoterIds: ['1', '3', '6', '12'],
    tags: ['Dev', 'Concept'],
    workgroup: 'The Lab (Dev)',
    status: 'Proposal',
    applicants: 0,
    requirements: ['Team Member', 'Lead Architect'],
    enlistedIds: [],
    startDate: '2024-04-01',
    isOngoing: true
  },
  {
    id: 'P2',
    title: 'Proposal: Plague Merch Drop',
    description: 'Exclusive physical streetwear line for holders. Need help with manufacturing and logistics.',
    elderId: '14',
    upvoterIds: ['2', '7', '8', '19'],
    tags: ['Merch', 'Design'],
    workgroup: 'The Studio (Art)',
    status: 'Proposal',
    applicants: 0,
    requirements: ['Product Designer', 'Logistics Lead'],
    enlistedIds: [],
    startDate: '2024-05-15',
    endDate: '2024-08-15'
  },
  {
    id: 'P3',
    title: 'Proposal: Swamp Radio 24/7',
    description: 'Lofi beats to study/plague to. Looking for resident DJs and technical setup assistance.',
    elderId: '11',
    upvoterIds: ['3', '11', '18', '20'],
    tags: ['Music', 'Content'],
    workgroup: 'The Airwaves (Podcast)',
    status: 'Proposal',
    applicants: 0,
    requirements: ['Sound Engineer', 'Community DJ'],
    enlistedIds: [],
    startDate: '2024-06-01',
    isOngoing: true
  },
  {
    id: 'P4',
    title: 'Proposal: AI Moderation Bot',
    description: 'Advanced discord bot to handle complex moderation tasks using custom Plague personality.',
    elderId: '4',
    upvoterIds: ['1', '4', '13', '15', '17'],
    tags: ['AI', 'Community'],
    workgroup: 'The Neural Net (AI)',
    status: 'Proposal',
    applicants: 0,
    requirements: ['Python Dev', 'Discord API Expert'],
    enlistedIds: [],
    startDate: '2024-04-20',
    endDate: '2024-07-20'
  },
  {
    id: 'P5',
    title: 'Proposal: Swamp Wiki Expansion',
    description: 'Comprehensive lore and technical documentation hub for new community members.',
    elderId: '16',
    upvoterIds: ['5', '16', '10', '7'],
    tags: ['Lore', 'Education'],
    workgroup: 'The Tower (Lore)',
    status: 'Proposal',
    applicants: 0,
    requirements: ['Technical Writer', 'Lore Expert'],
    enlistedIds: [],
    startDate: '2024-05-01',
    isOngoing: true
  }
];
