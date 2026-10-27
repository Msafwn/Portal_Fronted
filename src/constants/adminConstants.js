export const INITIAL_ADMIN_PROFILE = {
  name: 'Muhammad Safwan',
  role: 'Super Administrator & Lead Auditor',
  email: 'safwanarshad782@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  department: 'System Architecture & Operations',
  accessLevel: 'Tier-1 Root Access',
};

export const INITIAL_ADMIN_KPIS = {
  totalCandidates: 0,
  studentsCount: 0,
  graduatesCount: 0,
  professionalsCount: 0,
  totalEmployers: 0,
  verifiedEmployersCount: 0,
  pendingEmployersCount: 0,
  totalJobs: 0,
  activeJobsCount: 0,
  flaggedJobsCount: 0,
  closedJobsCount: 0,
  totalAiMatches: 0,
  avgMatchScore: 0,
  systemUptime: '99.9%',
  apiLatencyMs: 18,
};

export const INITIAL_ADMIN_CHARTS = {
  registrationTrends: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    candidates: [0, 0, 0, 0, 0, 0],
    employers: [0, 0, 0, 0, 0, 0],
  },
  disciplineBreakdown: {
    labels: [
      'Computer Science & IT',
      'Medical & Healthcare',
      'Engineering & Construction',
      'Business & Finance',
    ],
    series: [0, 0, 0, 0],
  },
};

export const INITIAL_AI_ALGORITHM_SETTINGS = {
  skillWeight: 50,
  experienceWeight: 30,
  educationWeight: 20,
  minMatchThreshold: 45,
  vectorEmbeddingModel: 'all-MiniLM-L6-v2 (384-dimensional dense vectors)',
  similarityMetric: 'Normalized Cosine Similarity + TF-IDF Keyword Hybrid',
  lastCalibrated: 'Live Production Engine',
  calibrationVersion: 'v2.4-Production-Arid-FYP',
};

export const ALGORITHM_PRESETS = [
  {
    id: 'preset-fyp-default',
    name: 'Official FYP Proposal Standard (50 / 30 / 20)',
    skillWeight: 50,
    experienceWeight: 30,
    educationWeight: 20,
    description: 'Exact ratio documented on Page 3 of the approved Project Proposal for universal matching.',
    badge: 'Standard Baseline',
  },
  {
    id: 'preset-fresh-grads',
    name: 'Fresh Graduate Priority (Skill First 70 / 10 / 20)',
    skillWeight: 70,
    experienceWeight: 10,
    educationWeight: 20,
    description: 'Heavily discounts missing corporate tenure to help fresh graduates match based on core skills.',
    badge: 'Student Friendly',
  },
  {
    id: 'preset-executive',
    name: 'Executive & Senior Leadership (40 / 45 / 15)',
    skillWeight: 40,
    experienceWeight: 45,
    educationWeight: 15,
    description: 'Prioritizes verified years of domain experience and track record over educational credentials.',
    badge: 'Industry Veterans',
  },
  {
    id: 'preset-research',
    name: 'Academic & R&D Excellence (35 / 20 / 45)',
    skillWeight: 35,
    experienceWeight: 20,
    educationWeight: 45,
    description: 'Weighs terminal qualifications (MSc, MPhil, PhD), institution ranking, and CGPA honors.',
    badge: 'R&D / Academia',
  },
];

export const INITIAL_SKILLS_TAXONOMY = [
  // Computer Science & IT
  { id: 'sk-1', name: 'Python', category: 'Computer Science & IT', aliases: ['py', 'python3'], popularity: 98, weightMultiplier: 1.0 },
  { id: 'sk-2', name: 'React.js', category: 'Computer Science & IT', aliases: ['react', 'reactjs'], popularity: 95, weightMultiplier: 1.0 },
  { id: 'sk-3', name: 'Node.js', category: 'Computer Science & IT', aliases: ['nodejs', 'express'], popularity: 91, weightMultiplier: 1.0 },
  { id: 'sk-4', name: 'FastAPI', category: 'Computer Science & IT', aliases: ['fastapi', 'python-api'], popularity: 86, weightMultiplier: 1.1 },
  { id: 'sk-5', name: 'Docker', category: 'Computer Science & IT', aliases: ['containerization', 'docker-compose'], popularity: 89, weightMultiplier: 1.1 },
  { id: 'sk-6', name: 'Next.js', category: 'Computer Science & IT', aliases: ['nextjs', 'ssr-react'], popularity: 88, weightMultiplier: 1.1 },
  { id: 'sk-7', name: 'Flutter', category: 'Computer Science & IT', aliases: ['dart', 'flutter-mobile'], popularity: 82, weightMultiplier: 1.0 },
  { id: 'sk-8', name: 'Kubernetes', category: 'Computer Science & IT', aliases: ['k8s', 'cloud-orchestration'], popularity: 78, weightMultiplier: 1.2 },

  // Emerging AI & Data Science
  { id: 'sk-9', name: 'PyTorch', category: 'Emerging AI & Data', aliases: ['torch', 'deep-learning'], popularity: 94, weightMultiplier: 1.2 },
  { id: 'sk-10', name: 'Vector Embeddings', category: 'Emerging AI & Data', aliases: ['chroma', 'pinecone', 'pgvector'], popularity: 92, weightMultiplier: 1.3 },
  { id: 'sk-11', name: 'Hugging Face Transformers', category: 'Emerging AI & Data', aliases: ['huggingface', 'bert', 'llm'], popularity: 90, weightMultiplier: 1.3 },
  { id: 'sk-12', name: 'LangChain & RAG', category: 'Emerging AI & Data', aliases: ['rag', 'retrieval-augmented'], popularity: 89, weightMultiplier: 1.25 },
  { id: 'sk-13', name: 'Cosine Similarity Algorithms', category: 'Emerging AI & Data', aliases: ['vector-similarity', 'knn'], popularity: 85, weightMultiplier: 1.15 },

  // Medical & Healthcare
  { id: 'sk-14', name: 'Emergency Triage', category: 'Medical & Healthcare', aliases: ['triage', 'er-assessment'], popularity: 93, weightMultiplier: 1.0 },
  { id: 'sk-15', name: 'Critical Care (ICU)', category: 'Medical & Healthcare', aliases: ['icu', 'ventilator-management'], popularity: 91, weightMultiplier: 1.15 },
  { id: 'sk-16', name: 'BLS / ACLS Certification', category: 'Medical & Healthcare', aliases: ['cpr', 'life-support'], popularity: 96, weightMultiplier: 1.1 },
  { id: 'sk-17', name: 'Chemotherapy Compounding', category: 'Medical & Healthcare', aliases: ['oncology-pharmacy', 'sterile-compounding'], popularity: 84, weightMultiplier: 1.2 },
  { id: 'sk-18', name: 'Pharmacovigilance', category: 'Medical & Healthcare', aliases: ['drug-safety', 'adr-monitoring'], popularity: 80, weightMultiplier: 1.0 },

  // Engineering & Construction
  { id: 'sk-19', name: 'ETABS Modeling', category: 'Engineering & Construction', aliases: ['etabs', 'frame-analysis'], popularity: 95, weightMultiplier: 1.1 },
  { id: 'sk-20', name: 'SAP2000', category: 'Engineering & Construction', aliases: ['structural-sap', 'finite-element'], popularity: 90, weightMultiplier: 1.0 },
  { id: 'sk-21', name: 'AutoCAD & Civil 3D', category: 'Engineering & Construction', aliases: ['autocad', '2d-3d-drafting'], popularity: 97, weightMultiplier: 1.0 },
  { id: 'sk-22', name: 'Seismic Hazard Analysis', category: 'Engineering & Construction', aliases: ['earthquake-engineering', 'ubc-97'], popularity: 85, weightMultiplier: 1.2 },
  { id: 'sk-23', name: 'Primavera P6', category: 'Engineering & Construction', aliases: ['p6', 'project-scheduling'], popularity: 87, weightMultiplier: 1.05 },

  // Business & Finance
  { id: 'sk-24', name: 'Financial Modeling & DCF', category: 'Business & Finance', aliases: ['dcf', 'valuation', 'excel-models'], popularity: 94, weightMultiplier: 1.1 },
  { id: 'sk-25', name: 'Islamic Banking & Murabaha', category: 'Business & Finance', aliases: ['shariah-finance', 'ijara'], popularity: 92, weightMultiplier: 1.15 },
  { id: 'sk-26', name: 'Credit Risk Analysis', category: 'Business & Finance', aliases: ['basel-iii', 'loan-underwriting'], popularity: 89, weightMultiplier: 1.1 },
  { id: 'sk-27', name: 'Excel VBA & Macros', category: 'Business & Finance', aliases: ['vba', 'spreadsheet-automation'], popularity: 91, weightMultiplier: 1.0 },
  { id: 'sk-28', name: 'IFRS Compliance', category: 'Business & Finance', aliases: ['ifrs-9', 'ifrs-16', 'accounting-standards'], popularity: 86, weightMultiplier: 1.05 },
];
