import {
  GraduationCap,
  Award,
  Briefcase,
  Building2,
  Code2,
  Clock,
} from 'lucide-react';

export const SIMULATION_ROLES = {
  fullstack: {
    id: 'fullstack',
    tabLabel: 'Software & IT',
    title: 'Full Stack MERN Developer',
    company: 'TechLogix Global • Islamabad / Hybrid',
    matchPercentage: 94,
    matchedSkills: ['React', 'Node.js', 'MongoDB', 'REST API', 'JavaScript'],
    missingSkills: ['Docker'],
    breakdown: {
      skills: 48,
      experience: 28,
      education: 18,
    },
  },
  healthcare: {
    id: 'healthcare',
    tabLabel: 'Medical & Healthcare',
    title: 'Clinical Pharmacist & Care Specialist',
    company: 'Shifa International Hospital • Islamabad',
    matchPercentage: 92,
    matchedSkills: ['Pharmacology', 'Patient Care', 'Drug Dispensing', 'Medical Records'],
    missingSkills: ['Clinical Oncology'],
    breakdown: {
      skills: 46,
      experience: 27,
      education: 19,
    },
  },
  engineering: {
    id: 'engineering',
    tabLabel: 'Civil & Engineering',
    title: 'Civil Infrastructure Engineer',
    company: 'NESPAK • Lahore / On-site',
    matchPercentage: 95,
    matchedSkills: ['AutoCAD', 'Structural Analysis', 'Civil 3D', 'Project Planning'],
    missingSkills: ['BIM Modeling'],
    breakdown: {
      skills: 49,
      experience: 28,
      education: 18,
    },
  },
};

export const ROLE_TRACKS = [
  {
    role: 'Student',
    icon: GraduationCap,
    badge: 'Internship Focus',
    title: 'Internships & Foundation',
    desc: 'Tailored for university students. Discover verified semester internships, practical project roles, and entry mentorships across all fields.',
    features: [
      'No 3+ years experience barrier',
      'Internship stipend filters',
      'Faculty & degree alignment',
    ],
  },
  {
    role: 'Fresh Graduate',
    icon: Award,
    badge: 'Entry-Level Fast Track',
    title: 'Graduate Kickstart',
    desc: 'Designed for recent university and college graduates. Filter entry-level roles across Engineering, Healthcare, Business, and IT.',
    features: [
      'Graduate trainee & junior tracks',
      'Skill gap roadmaps',
      'Direct recruiter matching',
    ],
  },
  {
    role: 'Professional',
    icon: Briefcase,
    badge: 'Mid to Senior Tier',
    title: 'Career Advancement',
    desc: 'For experienced professionals seeking competitive roles, salary benchmarks, and remote or leadership opportunities.',
    features: [
      'Domain-specific recommendations',
      'Role seniority filters',
      'Confidential application status',
    ],
  },
  {
    role: 'Employer',
    icon: Building2,
    badge: 'Hiring Management',
    title: 'Intelligent Recruitment',
    desc: 'For modern enterprises, healthcare institutions, engineering firms, and HR teams. Post roles and receive candidates pre-ranked by compatibility.',
    features: [
      'Automated candidate ranking',
      'Role posting dashboard',
      'Direct applicant pipeline',
    ],
  },
];

export const ALGORITHM_CRITERIA = [
  {
    percentage: '50%',
    numericValue: 50,
    title: 'Skill Match Engine',
    subtitle: 'Primary Compatibility Core',
    desc: 'Matches your registered skills and professional tools against employer-specified mandatory and weighted requirements.',
    badge: 'Primary Factor',
    gradientText: 'from-blue-400 via-cyan-300 to-blue-200',
    barGradient: 'from-blue-500 to-cyan-400',
    glowColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30 hover:border-blue-400/60',
    badgeStyle: 'bg-blue-500/20 text-cyan-300 border-blue-500/30',
    icon: Code2,
    points: [
      'Cross-department skill taxonomy matching',
      'Mandatory qualification compliance checks',
      'Dynamic weight scores (1 to 5 stars)',
    ],
  },
  {
    percentage: '30%',
    numericValue: 30,
    title: 'Experience Verification',
    subtitle: 'Role Seniority Filter',
    desc: 'Compares your professional history, past projects, and total years against job level requirements.',
    badge: 'Seniority Filter',
    gradientText: 'from-indigo-300 via-purple-300 to-indigo-200',
    barGradient: 'from-indigo-500 to-purple-400',
    glowColor: 'bg-indigo-500/20',
    borderColor: 'border-indigo-500/30 hover:border-indigo-400/60',
    badgeStyle: 'bg-indigo-500/20 text-purple-300 border-indigo-500/30',
    icon: Clock,
    points: [
      'Total years vs minimum required',
      'Past role titles & industry track record',
      'Hands-on portfolio and project verification',
    ],
  },
  {
    percentage: '20%',
    numericValue: 20,
    title: 'Education & Degree',
    subtitle: 'Academic Baseline',
    desc: "Validates degree level (Bachelor's, Master's, or Diploma), graduation timeline, and relevant institutional background.",
    badge: 'Academic Baseline',
    gradientText: 'from-teal-300 via-emerald-300 to-teal-200',
    barGradient: 'from-teal-500 to-emerald-400',
    glowColor: 'bg-teal-500/20',
    borderColor: 'border-teal-500/30 hover:border-teal-400/60',
    badgeStyle: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    icon: GraduationCap,
    points: [
      'Degree alignment with target role',
      'Graduation timeline & student status',
      'Accredited educational credentials',
    ],
  },
];

export const NAV_LINKS = [
  { id: 'demo', label: 'Live Simulation', href: '#demo' },
  { id: 'roles', label: 'Role Tracks', href: '#roles' },
  { id: 'algorithm', label: 'Match Algorithm', href: '#algorithm' },
  { id: 'employers', label: 'For Employers', href: '#employers' },
];
