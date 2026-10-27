// ============================================================================
// AI Interview Preparation Service (All Departments + 10 Questions + Scoring)
// Supports:
// 1. 💻 IT & Software
// 2. 🩺 Medical & Healthcare
// 3. 🏗️ Engineering & Construction
// 4. 📊 Business & Finance
// Ready for Google Generative AI (Gemini) / FastAPI Python microservice
// Backend endpoint: POST /api/ai/interview-prep
// ============================================================================

import axios from 'axios';
import { axiosPrivate } from './apiClient';

export const DEPARTMENTS = [
  { key: 'all', label: 'All Fields', icon: '🌐' },
  { key: 'it', label: 'IT & Software', icon: '💻' },
  { key: 'medical', label: 'Medical & Health', icon: '🩺' },
  { key: 'engineering', label: 'Engineering', icon: '🏗️' },
  { key: 'business', label: 'Business & Finance', icon: '📊' },
];

// Preset roles categorized across all 4 departments
export const PRESET_ROLES = [
  // ================= 💻 IT & SOFTWARE =================
  {
    id: 'frontend-react',
    department: 'it',
    departmentLabel: 'IT & Software',
    title: 'Frontend React Developer',
    icon: '⚛️',
    experienceLevel: 'Entry to Mid',
    skills: ['React', 'JavaScript (ES6+)', 'Redux / Zustand', 'TailwindCSS', 'REST APIs'],
  },
  {
    id: 'python-backend',
    department: 'it',
    departmentLabel: 'IT & Software',
    title: 'Python / Django Backend Engineer',
    icon: '🐍',
    experienceLevel: 'Mid-Level',
    skills: ['Python', 'FastAPI / Django', 'PostgreSQL', 'Docker', 'RESTful APIs'],
  },
  {
    id: 'fullstack-mern',
    department: 'it',
    departmentLabel: 'IT & Software',
    title: 'Full Stack MERN Developer',
    icon: '🚀',
    experienceLevel: 'Associate / Mid',
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT Auth'],
  },
  {
    id: 'data-ai',
    department: 'it',
    departmentLabel: 'IT & Software',
    title: 'Data Analyst & ML Specialist',
    icon: '🤖',
    experienceLevel: 'Junior to Mid',
    skills: ['Python', 'Pandas & NumPy', 'SQL', 'Scikit-Learn', 'Data Visualization'],
  },
  {
    id: 'devops-cloud',
    department: 'it',
    departmentLabel: 'IT & Software',
    title: 'DevOps & Cloud Engineer',
    icon: '☁️',
    experienceLevel: 'Mid-Level',
    skills: ['Docker & K8s', 'AWS / GCP', 'CI/CD Pipelines', 'Linux', 'Terraform'],
  },

  // ================= 🩺 MEDICAL & HEALTHCARE =================
  {
    id: 'clinical-officer',
    department: 'medical',
    departmentLabel: 'Medical & Healthcare',
    title: 'Medical Officer / Resident Physician',
    icon: '🩺',
    experienceLevel: 'MBBS / Resident',
    skills: ['Clinical Diagnosis', 'Emergency Triage', 'Patient Care', 'BLS / ACLS', 'Medical Records'],
  },
  {
    id: 'clinical-pharmacist',
    department: 'medical',
    departmentLabel: 'Medical & Healthcare',
    title: 'Clinical Pharmacist & Drug Safety Specialist',
    icon: '💊',
    experienceLevel: 'Pharm.D / Licensed',
    skills: ['Clinical Pharmacology', 'Pharmacovigilance', 'Dosage Calculations', 'EHR Systems', 'Drug Interactions'],
  },
  {
    id: 'staff-nurse-icu',
    department: 'medical',
    departmentLabel: 'Medical & Healthcare',
    title: 'Critical Care / ICU Staff Nurse',
    icon: '💉',
    experienceLevel: 'BSN / Registered Nurse',
    skills: ['Vital Telemetry', 'ICU Protocol', 'Medication Administration', 'Patient Assessment', 'Infection Control'],
  },
  {
    id: 'biomedical-technologist',
    department: 'medical',
    departmentLabel: 'Medical & Healthcare',
    title: 'Biomedical & Lab Technologist',
    icon: '🔬',
    experienceLevel: 'Associate to Mid',
    skills: ['Hematology', 'Microbiology', 'Pathology Instrumentation', 'Quality Control', 'Biohazard Safety'],
  },

  // ================= 🏗️ ENGINEERING & CONSTRUCTION =================
  {
    id: 'civil-structural',
    department: 'engineering',
    departmentLabel: 'Engineering & Construction',
    title: 'Civil & Structural Site Engineer',
    icon: '🏗️',
    experienceLevel: 'BE Civil / Associate',
    skills: ['AutoCAD', 'Structural Analysis (ETABS)', 'Concrete Technology', 'Site Supervision', 'Quantity Surveying'],
  },
  {
    id: 'mechanical-design',
    department: 'engineering',
    departmentLabel: 'Engineering & Construction',
    title: 'Mechanical Design & HVAC Engineer',
    icon: '⚙️',
    experienceLevel: 'BE Mechanical',
    skills: ['SolidWorks', 'HVAC Design', 'Thermodynamics', 'Fluid Mechanics', 'Manufacturing Tolerances'],
  },
  {
    id: 'electrical-power',
    department: 'engineering',
    departmentLabel: 'Engineering & Construction',
    title: 'Electrical & Power Systems Engineer',
    icon: '⚡',
    experienceLevel: 'BE Electrical',
    skills: ['Power Distribution', 'PLC / Automation', 'Circuit Simulation', 'Substation Safety', 'MATLAB'],
  },
  {
    id: 'geotech-safety',
    department: 'engineering',
    departmentLabel: 'Engineering & Construction',
    title: 'Geotechnical & Project Safety Engineer',
    icon: '🦺',
    experienceLevel: 'Mid-Level',
    skills: ['Soil Mechanics', 'OSHA Safety Standards', 'Foundation Engineering', 'Hazard Assessment', 'Site Logistics'],
  },

  // ================= 📊 BUSINESS & FINANCE =================
  {
    id: 'financial-analyst',
    department: 'business',
    departmentLabel: 'Business & Finance',
    title: 'Corporate Financial Analyst',
    icon: '📈',
    experienceLevel: 'BBA / BS Finance',
    skills: ['Financial Modeling', 'DCF Valuation', 'Advanced Excel', 'Financial Reporting', 'Budget Variance'],
  },
  {
    id: 'accountant-auditor',
    department: 'business',
    departmentLabel: 'Business & Finance',
    title: 'Senior Accountant & Internal Auditor',
    icon: '📑',
    experienceLevel: 'ACCA / CA / M.Com',
    skills: ['IFRS & GAAP', 'General Ledger', 'Tax Compliance', 'Internal Controls', 'ERP (SAP/Oracle)'],
  },
  {
    id: 'digital-marketing',
    department: 'business',
    departmentLabel: 'Business & Finance',
    title: 'Growth Marketing & Campaign Strategist',
    icon: '🎯',
    experienceLevel: 'Associate to Mid',
    skills: ['SEO / SEM', 'Google Analytics', 'CAC / LTV Analysis', 'Paid Social Ad Spend', 'Funnel Optimization'],
  },
  {
    id: 'hr-talent',
    department: 'business',
    departmentLabel: 'Business & Finance',
    title: 'Talent Acquisition & HR Operations Lead',
    icon: '🤝',
    experienceLevel: 'MBA / BBA HR',
    skills: ['Applicant Tracking (ATS)', 'Labor Laws', 'Employee Engagement', 'KPI Performance Appraisals', 'Conflict Resolution'],
  },
];

// Curated 10-Question Templates for High-Frequency Roles
const DEFAULT_QUESTIONS_DATABASE = {
  // --- IT: Frontend React Developer ---
  'frontend-react': [
    {
      id: 1,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'Explain how React\'s Virtual DOM and Reconciliation algorithm work. Why is updating the Virtual DOM faster than direct DOM manipulation?',
      sampleHints: 'Mention Virtual DOM as a lightweight in-memory representation, Diffing algorithm (O(n)), and batching updates.',
      idealAnswer: 'React maintains an in-memory representation of the real DOM called the Virtual DOM. When state changes occur, React creates a new Virtual DOM tree and diffs it with the previous snapshot (Reconciliation). It computes the minimal set of required mutations and batches updates to the real DOM, avoiding expensive browser layout recalculations and repaints.',
    },
    {
      id: 2,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'What is the difference between useEffect with an empty dependency array vs no dependency array vs specific dependencies? What causes infinite re-renders?',
      sampleHints: 'Explain mount-only vs every-render vs dependency change, and state updates inside useEffect without correct deps.',
      idealAnswer: 'Without dependencies, useEffect runs on every render. With an empty array [], it executes only once after initial mount. With specific dependencies, it triggers only when those values change by reference. Infinite re-renders occur when state is updated inside useEffect without proper dependency guarding.',
    },
    {
      id: 3,
      type: 'Technical',
      difficulty: 'Hard',
      question: 'How do you optimize render performance in a large React list rendering 10,000+ items? Compare windowing/virtualization with React.memo.',
      sampleHints: 'Discuss react-window/react-virtualized, DOM node reduction, useMemo, and useCallback for referential equality.',
      idealAnswer: 'For large lists, the best technique is DOM virtualization (e.g. react-window) which only mounts items visible in the current viewport. React.memo prevents re-rendering unchanged children, while useCallback and useMemo prevent function/object reference recreation across parent re-renders.',
    },
    {
      id: 4,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'What is Prop Drilling and what are the best ways to solve it in a modern scalable application?',
      sampleHints: 'Mention Context API, State Management libraries (Redux Toolkit, Zustand), and Component Composition.',
      idealAnswer: 'Prop drilling occurs when props are passed down through multiple intermediate components that do not need them. Solutions include React Context API for lightweight global state, modern stores like Zustand or Redux Toolkit for complex asynchronous data, and Component Composition (passing children directly).',
    },
    {
      id: 5,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'Explain the critical differences between Server-Side Rendering (SSR), Client-Side Rendering (CSR), and Static Site Generation (SSG).',
      sampleHints: 'Compare TTFB, SEO friendliness, server resource usage, and build-time generation.',
      idealAnswer: 'CSR renders HTML in the browser via JavaScript, giving rich interactivity but slower initial load and weaker SEO. SSR generates HTML on the server per request, ensuring fresh dynamic content and strong SEO at the cost of server computation. SSG pre-builds HTML files at compile time, delivering top-tier CDN caching and instant TTFB.',
    },
    {
      id: 6,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'Tell me about a time when you received harsh or critical feedback on a Pull Request. How did you handle it and what was the outcome?',
      sampleHints: 'Use STAR method (Situation, Task, Action, Result). Focus on emotional maturity, objective code improvement, and team collaboration.',
      idealAnswer: 'I follow the STAR approach: Focus on the code rather than taking it personally. I scheduled a quick 10-minute huddle to understand the senior engineer\'s architectural concern, implemented the suggested refactoring with added unit tests, and documented the design pattern for the rest of the team.',
    },
    {
      id: 7,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'Describe a situation where you had a tight deadline and requirements changed midway through the sprint. How did you prioritize?',
      sampleHints: 'Mention open communication with Product Owner, breaking tasks into MVP vs nice-to-have, and managing expectations.',
      idealAnswer: 'When scope changed two days before deadline, I immediately met with the Product Manager to renegotiate priorities. We isolated the core business-critical user flow into an MVP release and scheduled secondary animations and analytics for the subsequent patch, successfully deploying without downtime.',
    },
    {
      id: 8,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'How do you keep your technical skills up-to-date with fast-paced web ecosystems and emerging libraries?',
      sampleHints: 'Highlight official release notes, RFCs, open-source contributions, engineering blogs, and pet prototype projects.',
      idealAnswer: 'I regularly read official GitHub release notes and React RFCs, follow engineering blogs like Overreacted and Vercel Blog, and build sandbox proof-of-concept mini-apps to test new paradigms before proposing them in production.',
    },
    {
      id: 9,
      type: 'Situational',
      difficulty: 'Hard',
      question: 'A critical production bug causes white screen of death for 15% of users right after a Friday release. What is your step-by-step triage protocol?',
      sampleHints: 'Mention Rollback first, Sentry/Datadog error logs, reproduction in staging, hotfix branch, and post-mortem.',
      idealAnswer: '1. Rollback or toggle the feature flag immediately to restore 100% uptime. 2. Inspect error aggregation tools (Sentry/LogRocket) to identify the stack trace and user browser/device segmentation. 3. Reproduce locally with exact payload. 4. Write regression tests, craft a hotfix, verify in staging, and publish a blameless post-mortem.',
    },
    {
      id: 10,
      type: 'Situational',
      difficulty: 'Hard',
      question: 'You and a backend teammate disagree on the structure of a core JSON API endpoint. How do you resolve this dispute to avoid blocking sprint delivery?',
      sampleHints: 'Suggest OpenAPI/Swagger contract-first design, mock endpoints, and alignment with frontend consumption efficiency.',
      idealAnswer: 'I advocate for API contract-first design. We write down an OpenAPI / JSON schema specification agreed upon together. If consensus is needed, we evaluate client-side performance, network payload size, and backend query efficiency. In the meantime, I mock the contract locally so frontend development proceeds unblocked.',
    },
  ],

  // --- 🩺 MEDICAL: Clinical Officer / Resident ---
  'clinical-officer': [
    {
      id: 1,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'A 55-year-old male presents with acute retrosternal crushing chest pain radiating to the left arm. Walk through your initial 10-minute diagnostic and pharmacological protocol.',
      sampleHints: 'Mention MONA protocol (Morphine, Oxygen, Nitroglycerin, Aspirin), immediate 12-lead ECG, cardiac troponin biomarkers, and establishing IV lines.',
      idealAnswer: 'Immediately activate STEMI protocol: 1. Order emergent 12-lead ECG within 10 minutes. 2. Administer chewable Aspirin (300mg) and sublingual Nitroglycerin (if blood pressure > 90 systolic and no PDE-5 inhibitor use). 3. Provide supplemental O2 if SpO2 < 90%. 4. Draw stat troponin, CBC, and electrolytes. 5. Notify interventional cardiology for urgent catheterization if ST elevation is confirmed.',
    },
    {
      id: 2,
      type: 'Technical',
      difficulty: 'Hard',
      question: 'How do you differentiate between Diabetic Ketoacidosis (DKA) and Hyperosmolar Hyperglycemic State (HHS)? What are the distinct fluid resuscitation guidelines?',
      sampleHints: 'Compare serum ketones, blood glucose (>250 vs >600), arterial pH (<7.3 vs >7.3), effective serum osmolality, and insulin timing.',
      idealAnswer: 'DKA features severe metabolic acidosis (pH < 7.3, bicarb < 18) with positive serum/urine ketones and blood glucose typically 250-500 mg/dL. HHS features profound hyperglycemia (>600 mg/dL), high serum osmolality (>320 mOsm/kg), and minimal/absent ketosis. Both require aggressive isotonic saline rehydration, with potassium checked prior to initiating continuous IV regular insulin.',
    },
    {
      id: 3,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'Explain the principles of antibiotic stewardship when treating community-acquired pneumonia (CAP) versus hospital-acquired pneumonia (HAP).',
      sampleHints: 'Discuss CURB-65 scoring, covering atypical pathogens vs Pseudomonas and MRSA coverage in HAP, and de-escalation based on sputum culture.',
      idealAnswer: 'For outpatient CAP with low CURB-65, use narrow-spectrum beta-lactam + macrolide or respiratory fluoroquinolone. In HAP (>48 hours post-admission), empirically cover resistant hospital pathogens (Pseudomonas aeruginosa, MRSA) using agents like Piperacillin-Tazobactam plus Vancomycin, followed by strict culture-guided de-escalation at 48-72 hours to prevent antimicrobial resistance.',
    },
    {
      id: 4,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'What are the classic clinical signs of raised intracranial pressure (Cushing\'s Triad) and what immediate medical interventions must be initiated?',
      sampleHints: 'Identify hypertension with widened pulse pressure, bradycardia, irregular respirations (Cheyne-Stokes), plus head elevation and Mannitol/hypertonic saline.',
      idealAnswer: 'Cushing\'s Triad consists of progressive hypertension with widened pulse pressure, bradycardia, and irregular respirations. Immediate management includes elevating the head of the bed to 30 degrees to promote venous drainage, maintaining normocapnia through controlled ventilation, and administering osmotic agents such as 20% Mannitol or 3% hypertonic saline.',
    },
    {
      id: 5,
      type: 'Technical',
      difficulty: 'Hard',
      question: 'Explain the differential diagnosis and emergency management of acute anaphylactic shock in a clinical setting.',
      sampleHints: 'Emphasize immediate intramuscular Epinephrine (1:1000) 0.5mg in the anterolateral thigh, high-flow oxygen, IV fluid bolus, and secondary antihistamines/corticosteroids.',
      idealAnswer: 'Anaphylaxis is a life-threatening systemic hypersensitivity reaction affecting airway, breathing, circulation, and/or skin. First-line therapy is intramuscular Epinephrine 0.5mg (1:1000) in the mid-anterolateral thigh immediately—do not delay for IV access. Lay patient supine with legs elevated, administer high-flow oxygen, rapid IV crystalloid bolus, and follow with H1-blockers and hydrocortisone as adjunctive therapy.',
    },
    {
      id: 6,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'Describe an instance where you had to break bad news (a terminal diagnosis or sudden demise) to a patient\'s family. How did you structure your conversation?',
      sampleHints: 'Apply the SPIKES protocol (Setting, Perception, Invitation, Knowledge, Empathy, Strategy). Highlight compassionate body language and active silence.',
      idealAnswer: 'I used the SPIKES framework: chose a private, quiet room without interruptions, verified what the family already understood, provided a gentle warning shot, delivered clear and honest information without medical jargon, paused to allow emotional expression with validated empathy, and formulated next supportive care steps together.',
    },
    {
      id: 7,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'How do you handle a situation where a senior consultant or department head prescribes a dosage that you suspect is contra-indicated for that patient?',
      sampleHints: 'Emphasize patient safety first, professional respectful questioning, double-checking clinical literature, and using closed-loop communication.',
      idealAnswer: 'Patient safety is non-negotiable. I double-checked the patient\'s kidney function and drug database contraindications, then approached the consultant privately and respectfully: "Doctor, I noticed the creatinine clearance is 25 mL/min; given this, could we consider adjusting this dosage to prevent nephrotoxicity?" This framed it as collaborative patient protection.',
    },
    {
      id: 8,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'Working in high-stress hospital rotations often leads to burnout and fatigue. How do you maintain mental clarity and high clinical attention during back-to-back 24-hour shifts?',
      sampleHints: 'Discuss structured handovers (SBAR), clinical checklists, adequate hydration, peer support, and recognizing cognitive fatigue limits.',
      idealAnswer: 'I rely on standardized SBAR handover checklists to eliminate cognitive omission errors during fatigue. I take deliberate 15-minute mental micro-breaks, stay hydrated, maintain clear peer communication, and promptly escalate when patient acuity exceeds safe individual bandwidth.',
    },
    {
      id: 9,
      type: 'Situational',
      difficulty: 'Hard',
      question: 'During a night shift, a multi-vehicle highway accident brings 12 critical trauma patients into a 4-bed emergency ward simultaneously. How do you direct triage?',
      sampleHints: 'Implement START trauma triage (Simple Triage and Rapid Treatment: Red, Yellow, Green, Black). Mobilize hospital disaster codes and allocate resources to salvageable patients.',
      idealAnswer: 'Activate hospital Code Black (Mass Casualty Incident). Immediately institute START triage at the ER doors: assign primary triage colors (Red = immediate life threat, Yellow = delayed, Green = walking wounded, Black = expectant). Prioritize airway interventions and external hemorrhage control, and clear elective beds for emergency surgery transfers.',
    },
    {
      id: 10,
      type: 'Situational',
      difficulty: 'Hard',
      question: 'A conscious adult patient with severe internal bleeding refuses a life-saving blood transfusion due to religious beliefs. What is your ethical and legal course of action?',
      sampleHints: 'Assess mental capacity, verify informed refusal, explore blood-sparing alternatives (cell salvage, IV iron, tranexamic acid), and document thorough informed consent.',
      idealAnswer: 'If the adult patient possesses full decision-making capacity, their autonomy and informed refusal must be respected under medical ethics and law. I discuss the fatal risks openly, ensure no coercion exists, explore non-blood volume expanders and cell-salvage or tranexamic acid alternatives, involve hospital ethics/legal counsel, and document informed refusal with signatures.',
    },
  ],

  // --- 🏗️ ENGINEERING: Civil & Structural Site Engineer ---
  'civil-structural': [
    {
      id: 1,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'Explain how you calculate dead loads, live loads, and lateral wind/seismic load combinations for a G+8 commercial building in ETABS.',
      sampleHints: 'Reference building codes (ACI 318, ASCE 7, UBC 97), explain load factors (e.g. 1.2D + 1.6L, 1.2D + 1.0E + 1.0L), and diaphragm stiffness.',
      idealAnswer: 'Dead loads include self-weight calculated from member dimensions and material densities (concrete 24-25 kN/m3) plus floor finishes and partitions. Live loads adhere to occupancy standards (e.g. 2.5-4.0 kN/m2 for commercial offices). Lateral seismic loads are generated via Equivalent Static or Response Spectrum Analysis based on soil profile and seismic zone factors, analyzed under standard governing load combinations.',
    },
    {
      id: 2,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'What are the main causes of honeycombing and segregation in poured concrete, and how do you rectify and prevent them on an active site?',
      sampleHints: 'Discuss high free-fall pouring height, excessive water-cement ratio, congested rebar spacing, proper needle vibration, and non-shrink repair grouts.',
      idealAnswer: 'Segregation and honeycombing occur from excessive water-cement ratio, pouring concrete from heights greater than 1.5 meters, congested rebar impeding aggregate passage, or inadequate/over-vibration. Prevention requires proper formwork spacing, maximum 1.5m drop chutes, and systematic needle immersion. Rectification involves chipping unsound aggregate down to sound concrete and applying high-strength non-shrink structural epoxy grout.',
    },
    {
      id: 3,
      type: 'Technical',
      difficulty: 'Hard',
      question: 'Describe the differences between Shallow Isolated Footings, Raft (Mat) Foundations, and Deep Pile Foundations. When is each dictated by the geotechnical report?',
      sampleHints: 'Relate to soil allowable bearing capacity (SBC), differential settlement limits, high water tables, and multi-story structural loads.',
      idealAnswer: 'Isolated footings are economical when soil bearing capacity is high (>150 kPa) and column loads are modest. Raft/Mat foundations are mandated when soil capacity is moderate-to-low or when isolated footing footprints exceed 50% of building area to prevent differential settlement. Pile foundations are required when upper soil strata are weak, compressible, or liquefiable, transferring loads down to dense bedrock.',
    },
    {
      id: 4,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'Explain the purpose and execution of a Concrete Slump Test and 28-Day Compressive Strength Cube/Cylinder Test.',
      sampleHints: 'Slump measures workability and water-cement compliance on site. Compression testing verifies characteristic strength (f\'c) against design specs.',
      idealAnswer: 'The slump test evaluates fresh concrete workability and consistency on delivery before pouring; deviations indicate improper water additions. Cube/cylinder specimens are cast in 3 layers, cured in water tanks at standard temperature, and crushed in a calibrated compressive testing machine at 7 and 28 days to verify that 95% of specimens achieve or exceed specified characteristic strength (f\'c).',
    },
    {
      id: 5,
      type: 'Technical',
      difficulty: 'Hard',
      question: 'How do you inspect reinforcement steel (rebar) on site before concrete pouring? What key parameters on the BBS (Bar Bending Schedule) must be checked?',
      sampleHints: 'Check rebar diameter, clear concrete cover blocks, lap length (e.g. 40d-50d), stirrup spacing in shear zones, and rust/oil contamination.',
      idealAnswer: 'Inspection protocol verifies: 1. Bar diameters and grade matching structural drawings. 2. Clear cover blocks (e.g. 40mm for beams, 50-75mm for foundations) securely tied. 3. Development/lap lengths (typically 40-50 x diameter) staggered away from maximum moment zones. 4. Stirrup spacing closely spaced near support shear zones. 5. Cleanliness free of loose rust, grease, or mud.',
    },
    {
      id: 6,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'A contractor tries to convince you to proceed with concrete pouring despite rebar cover blocks being absent, arguing that the readymix trucks are already on site. How do you respond?',
      sampleHints: 'Highlight uncompromising structural integrity, professional assertiveness, liability, and finding rapid compliant solutions.',
      idealAnswer: 'I do not allow concrete to be poured without verified cover blocks. Inadequate cover causes premature carbonation, steel corrosion, and structural failure. I calmly explain the engineering mandate to the contractor, refuse pouring clearance, and direct the site team to immediately install prefabricated concrete cover spacers from site stock before discharging the batch.',
    },
    {
      id: 7,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'Tell me about a time when you discovered a discrepancy between architectural drawings and structural engineering drawings. How did you resolve it?',
      sampleHints: 'Explain issuing a formal Request for Information (RFI), coordinating between architect and structural consultant without halting works.',
      idealAnswer: 'During ground floor layout, I identified that an architectural plumbing shaft conflicted with a primary transfer girder. Rather than guessing, I issued an immediate formal RFI with marked up drawings, convened a 20-minute site meeting with both consultants, and agreed on a sleeved opening with rebar trimming that satisfied both aesthetic and structural codes.',
    },
    {
      id: 8,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'Site environments involve diverse subcontractors, laborers, and safety inspectors. How do you enforce strict PPE and OSHA safety compliance?',
      sampleHints: 'Discuss daily toolbox talks, leading by personal example, hazard recognition, and positive reinforcement alongside zero-tolerance stop-work authority.',
      idealAnswer: 'I lead by personal example by always wearing full PPE. I conduct mandatory morning 5-minute toolbox talks focusing on daily hazard identification (scaffolding tags, edge protection, crane swing radii). I empower all workers with stop-work authority for imminent danger and combine positive safety awards with firm warnings for non-compliance.',
    },
    {
      id: 9,
      type: 'Situational',
      difficulty: 'Hard',
      question: 'During deep basement excavation (8 meters depth), heavy unexpected monsoon rain causes the perimeter sheet pile wall to show signs of lateral deflection and soil cracking. What is your emergency protocol?',
      sampleHints: 'Immediate site evacuation, stop surcharge loads near trench, install emergency diagonal struts/rakers, dewatering pumps, and geotechnical monitoring.',
      idealAnswer: '1. Sound emergency alarm and evacuate all personnel and heavy machinery immediately from the excavation zone. 2. Barricade the perimeter to eliminate surcharge traffic loads. 3. Deploy high-capacity dewatering pumps to lower hydrostatic pressure. 4. Mobilize structural steel rakers/struts and soil berms to brace the deflecting wall. 5. Establish hourly optical prism survey monitoring.',
    },
    {
      id: 10,
      type: 'Situational',
      difficulty: 'Hard',
      question: 'Concrete compression test results for 3 major columns arrive at 28 days showing only 70% of design characteristic strength. What is your step-by-step engineering response?',
      sampleHints: 'Do not panic or demolish immediately. Conduct non-destructive rebound hammer & ultrasonic pulse velocity tests, core sampling, load capacity re-check, and structural retrofitting if necessary.',
      idealAnswer: '1. Immediately halt all vertical loading construction on floors above those columns. 2. Perform non-destructive testing (Schmidt Rebound Hammer and Ultrasonic Pulse Velocity). 3. Extract core samples according to ASTM C42 for laboratory testing. 4. Re-run structural models to verify if existing capacity meets load factors with actual f\'c. 5. If deficient, engineer structural retrofitting (RC jacketing or carbon fiber FRP wrapping).',
    },
  ],

  // --- 📊 BUSINESS: Corporate Financial Analyst ---
  'financial-analyst': [
    {
      id: 1,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'Walk me through the three financial statements (Income Statement, Balance Sheet, Cash Flow) and explain how a $100 increase in depreciation flows through all three.',
      sampleHints: 'Start with Income Statement (pre-tax vs post-tax assuming 20% or 30% tax), then Cash Flow Statement (operating activities), then Balance Sheet (PP&E and cash).',
      idealAnswer: 'Assuming 20% tax: 1. Income Statement: Operating income falls by $100; net income decreases by $80 (due to $20 tax shield). 2. Cash Flow Statement: Net income starts at -$80; depreciation is added back as a non-cash expense (+$100); cash from operations increases by +$20. 3. Balance Sheet: PP&E decreases by -$100 (depreciation), Cash is up +$20 (net change), balancing the -$80 drop in Retained Earnings under Shareholders Equity.',
    },
    {
      id: 2,
      type: 'Technical',
      difficulty: 'Hard',
      question: 'How do you calculate Weighted Average Cost of Capital (WACC) and Free Cash Flow to Firm (FCFF) when building a multi-stage Discounted Cash Flow (DCF) model?',
      sampleHints: 'WACC = (E/V * Re) + (D/V * Rd * (1 - T)). FCFF = EBIT*(1-T) + D&A - CapEx - Change in Net Working Capital. Discuss terminal value via Gordon Growth.',
      idealAnswer: 'WACC represents blended hurdle rate weighting Cost of Equity (CAPM: Risk-Free + Beta * Equity Risk Premium) and after-tax Cost of Debt. FCFF equals Operating Profit after tax (NOPAT) plus Depreciation & Amortization minus Capital Expenditures minus Net Working Capital additions. Enterprise value is the sum of discounted projected FCFF plus discounted Terminal Value using Gordon Growth or Exit Multiple methods.',
    },
    {
      id: 3,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'What is the difference between Net Present Value (NPV) and Internal Rate of Return (IRR)? When might IRR give a misleading decision compared to NPV?',
      sampleHints: 'NPV provides absolute dollar value addition. IRR assumes reinvestment at IRR rate rather than WACC, and fails when cash flows alternate signs (multiple IRRs).',
      idealAnswer: 'NPV measures absolute dollar value added to the firm discounted at cost of capital, whereas IRR is the discount rate at which NPV equals zero. IRR can be misleading for mutually exclusive projects of differing scales (a 50% return on $1,000 adds less value than a 20% return on $1,000,000) or when non-conventional cash flows generate multiple IRRs.',
    },
    {
      id: 4,
      type: 'Technical',
      difficulty: 'Medium',
      question: 'How do you assess working capital health and liquidity? Explain the Cash Conversion Cycle (CCC).',
      sampleHints: 'CCC = Days Sales Outstanding (DSO) + Days Inventory Outstanding (DIO) - Days Payable Outstanding (DPO). Relate to operational cash lockup.',
      idealAnswer: 'The Cash Conversion Cycle measures the time required to convert inventory investments into cash inflows from sales: CCC = DIO + DSO - DPO. A shorter or negative CCC indicates superior operational efficiency where the business effectively funds operations using supplier credit rather than borrowing working capital.',
    },
    {
      id: 5,
      type: 'Technical',
      difficulty: 'Hard',
      question: 'Explain the core leverage and coverage ratios you examine when assessing credit risk for a corporate loan or bond issuance.',
      sampleHints: 'Examine Debt/EBITDA, Interest Coverage Ratio (EBIT / Interest Expense), Debt-to-Equity, and Debt Service Coverage Ratio (DSCR).',
      idealAnswer: 'Key solvency and credit metrics include Debt-to-EBITDA (quantifying years required to repay debt via operating profits), Interest Coverage Ratio (EBIT divided by Interest Expense, indicating safety buffer against rate hikes), and Debt Service Coverage Ratio (DSCR = Net Operating Income divided by Principal + Interest payments).',
    },
    {
      id: 6,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'Tell me about a scenario where your financial forecasting model predicted revenue figures significantly lower than executive leadership\'s optimistic targets. How did you present your findings?',
      sampleHints: 'Highlight objective data-backed sensitivity tables, scenario analysis (Bull, Base, Bear), emotional composure, and strategic partnership.',
      idealAnswer: 'Rather than challenging optimism directly, I presented a multi-scenario sensitivity table (Base, Bull, and Conservative). I walked through macroeconomic headwinds, customer acquisition churn rates, and historical variance. By letting the empirical inputs speak for themselves, leadership adopted the conservative forecast for baseline budgeting while setting the optimistic target as a performance bonus goal.',
    },
    {
      id: 7,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'Describe an instance where you identified an error in an audit reconciliation or financial model right before a board or stakeholder meeting.',
      sampleHints: 'Honesty, rapid notification of stakeholders, correcting root formula, and implementing error-checking checksums in Excel.',
      idealAnswer: 'While running final checks two hours before the board review, I discovered an unlinked formula in working capital that overstated free cash flow by 8%. I immediately alerted my finance director, corrected the dynamic link, verified the reconciliation with checksum balance lines, and provided updated summary slides with transparent explanations.',
    },
    {
      id: 8,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'Financial modeling often involves ambiguous assumptions and missing historical data. How do you construct credible estimates under high uncertainty?',
      sampleHints: 'Use triangulation: comparable industry peer multiples, historical run-rates, bottom-up cost driver decomposition, and management interviews.',
      idealAnswer: 'I triangulate assumptions through three lenses: bottom-up driver analysis (unit volumes x price points), top-down market share benchmarks, and historical run-rates. I explicitly document all underlying assumptions in a dedicated model assumptions tab and build dynamic scenario toggles so stakeholders can stress-test outcomes.',
    },
    {
      id: 9,
      type: 'Situational',
      difficulty: 'Hard',
      question: 'The central bank unexpectedly raises interest rates by 250 basis points. How do you evaluate the immediate and medium-term balance sheet impact for a leveraged manufacturing firm?',
      sampleHints: 'Assess floating vs fixed rate debt exposure, interest coverage covenant breach risk, customer demand contraction, and capital expenditure deferrals.',
      idealAnswer: '1. Conduct an immediate debt audit to categorize floating vs fixed-rate debt exposure. 2. Calculate projected annual interest expense increases and stress-test Debt Service Coverage Ratios against bank covenant thresholds. 3. Re-evaluate customer credit terms and potential receivable delays. 4. Propose interest rate hedging swaps and recommend postponing discretionary CapEx to preserve liquid cash reserves.',
    },
    {
      id: 10,
      type: 'Situational',
      difficulty: 'Hard',
      question: 'Your company is evaluating an acquisition of a competitor at $50M. The CEO is pushing hard to close, but your preliminary due diligence reveals deteriorating quality of earnings and customer churn. How do you advise?',
      sampleHints: 'Quantify normalized EBITDA (adjusting for one-off gains and capitalized expenses), highlight customer concentration risks, and propose valuation adjustments or earn-outs.',
      idealAnswer: 'I prepare a rigorous Quality of Earnings (QofE) bridge showing normalized EBITDA after removing non-recurring gains and capitalizing expenses. I highlight customer retention decay and illustrate how current cash flows do not support the $50M valuation. Rather than saying an outright "no", I advise structuring the deal with a reduced base valuation and an earn-out contingent on post-closing customer retention metrics.',
    },
  ],
};

// Generic Fallback Question Generator for arbitrary or custom roles in any department
const generateGeneric10Questions = (roleTitle, skills = [], department = 'it') => {
  const skillsStr = skills.length ? skills.join(', ') : 'professional standards';
  return [
    {
      id: 1,
      type: 'Technical',
      difficulty: 'Medium',
      question: `What are the core operating principles, standards, and workflow lifecycles in ${roleTitle}? How do you ensure high quality?`,
      sampleHints: `Discuss industry best practices, standard methodologies, and verified frameworks relevant to ${skillsStr}.`,
      idealAnswer: `A robust professional workflow enforces structured methodologies: clear preliminary analysis, rigorous standard operating procedures, continuous verification, and documentation aligned with regulatory or industry codes.`,
    },
    {
      id: 2,
      type: 'Technical',
      difficulty: 'Medium',
      question: `How do you diagnose and resolve critical errors or performance bottlenecks in your daily work as a ${roleTitle}?`,
      sampleHints: `Mention root-cause analysis, metrics monitoring, industry tools, and preventive protocols.`,
      idealAnswer: `Apply systematic root-cause analysis: isolate the symptoms, gather baseline data, test hypotheses systematically, and institute permanent preventive controls to eliminate recurrence.`,
    },
    {
      id: 3,
      type: 'Technical',
      difficulty: 'Hard',
      question: `What regulatory, compliance, and safety/security standards govern your responsibilities in ${roleTitle}? How do you ensure compliance?`,
      sampleHints: `Cover regulatory audits, standard codes of conduct, data/physical safety, and documentation accuracy.`,
      idealAnswer: `Adhere strictly to official regulatory guidelines, conduct scheduled compliance reviews, enforce standardized checklists, and maintain auditable records with clear accountability.`,
    },
    {
      id: 4,
      type: 'Technical',
      difficulty: 'Medium',
      question: `How do you evaluate and optimize resource utilization, accuracy, and operational efficiency in ${roleTitle}?`,
      sampleHints: `Describe key performance indicators (KPIs), quantitative evaluation, and continuous improvement processes.`,
      idealAnswer: `Monitor quantitative KPIs continuously, benchmark output against industry averages, eliminate non-value-adding waste, and implement automated or standardized tools.`,
    },
    {
      id: 5,
      type: 'Technical',
      difficulty: 'Medium',
      question: `Explain how you stay compliant with evolving industry technologies, tools, and methodologies in ${roleTitle}.`,
      sampleHints: `Discuss accredited certifications, trade publications, peer review seminars, and practical sandbox pilots.`,
      idealAnswer: `Maintain active participation in accredited professional bodies, review peer-reviewed industry publications, complete continuing education, and pilot new proven methodologies systematically.`,
    },
    {
      id: 6,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'Tell me about a high-stakes challenge you encountered in a recent project. How did you overcome it?',
      sampleHints: 'Apply STAR method: clear problem statement, options evaluated, decisive action, measurable impact.',
      idealAnswer: 'Explain the specific obstacle, research conducted across options, decisive leadership taken, and the positive measurable outcome delivered.',
    },
    {
      id: 7,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'Describe an instance where you guided a colleague or junior peer through a complex operational hurdle.',
      sampleHints: 'Emphasize empathy, active listening, structured guidance, and fostering independent problem-solving skills.',
      idealAnswer: 'Instead of simply solving the problem for them, I walked them through the foundational principles, reviewed the problem together, and built their confidence for future autonomy.',
    },
    {
      id: 8,
      type: 'Behavioral',
      difficulty: 'Medium',
      question: 'How do you handle disagreement with senior leadership when asked to proceed with a decision that compromises professional standards?',
      sampleHints: 'Frame the issue as measurable risk to the organization, propose constructive alternatives, and maintain composure.',
      idealAnswer: 'I quantify the organizational and regulatory risks objectively. I present data-backed alternatives that satisfy strategic goals without violating compliance or safety standards.',
    },
    {
      id: 9,
      type: 'Situational',
      difficulty: 'Hard',
      question: 'Your organization experiences an unexpected operational emergency with multiple urgent demands. How do you triage under pressure?',
      sampleHints: 'Mention emergency triage protocols, stakeholder communication, containment, and transparent post-incident analysis.',
      idealAnswer: 'Activate emergency containment protocols, communicate clearly with critical stakeholders, delegate responsibilities based on priority, and document all actions for a post-incident review.',
    },
    {
      id: 10,
      type: 'Situational',
      difficulty: 'Hard',
      question: 'You discover that an established protocol has an overlooked flaw that could cause serious failure down the line. How do you address it?',
      sampleHints: 'Discuss data collection, risk assessment, notifying management with a solution, and rolling out updated standard operating procedures.',
      idealAnswer: 'Gather empirical evidence verifying the vulnerability, draft an updated standard operating procedure with a corrective roadmap, and present it constructively to leadership for immediate implementation.',
    },
  ];
};

/**
 * Fetch or Generate 10 Structured Interview Questions for a Target Role
 */
export async function getInterviewQuestions(roleData) {
  const roleId = typeof roleData === 'string' ? roleData : roleData?.id;
  const roleTitle = typeof roleData === 'string' ? roleData : roleData?.title || 'Professional Role';
  const skills = roleData?.skills || [];
  const department = roleData?.department || 'it';

  try {
    const pythonUrl = import.meta.env.VITE_PYTHON_AI_URL || 'http://127.0.0.1:8000';
    const response = await axios.post(
      `${pythonUrl}/api/interview-prep/questions`,
      { role: roleTitle, skills, department },
      { timeout: 15000 }
    );

    if (response.data) {
      const data = response.data;
      if (Array.isArray(data.questions) && data.questions.length >= 5) {
        return data.questions;
      }
    }
  } catch (err) {
    console.info('Using local intelligent interview questions engine:', err.message);
  }

  // Fallback to high-quality preset or dynamic 10 questions
  if (DEFAULT_QUESTIONS_DATABASE[roleId]) {
    return DEFAULT_QUESTIONS_DATABASE[roleId];
  }

  return generateGeneric10Questions(roleTitle, skills, department);
}

/**
 * Real-time AI Answer Evaluation & Scoring Engine (0 to 10 points)
 * Analyzes candidate answers across all 4 departments with field-specific terminology
 */
export async function evaluateCandidateAnswer({ role, question, answer, category = 'Technical', department = 'it' }) {
  if (!answer || answer.trim().length < 15) {
    return {
      score: 2,
      percentage: 20,
      verdict: 'Needs Expansion',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      strengths: ['Attempted the question'],
      improvements: [
        'Answer is too brief (less than 2-3 sentences).',
        'Add professional terminology, specific methodology, and concrete real-world context.',
        'Structure your answer clearly (Core Principle, Action/Workflow, Measurable Outcome).',
      ],
      idealTakeaways: question.idealAnswer || 'Provide a structured explanation with field-specific terminology.',
    };
  }

  try {
    const pythonUrl = import.meta.env.VITE_PYTHON_AI_URL || 'http://127.0.0.1:8000';
    const res = await axios.post(
      `${pythonUrl}/api/interview-prep/evaluate`,
      {
        role,
        department,
        question: question.question,
        category,
        answer,
        idealAnswer: question.idealAnswer,
      },
      { timeout: 20000 }
    );

    if (res.data) {
      const data = res.data;
      if (typeof data.score === 'number') {
        return data;
      }
    }
  } catch (err) {
    // Client-side heuristics
  }

  const text = answer.toLowerCase();
  const wordCount = answer.trim().split(/\s+/).length;

  let calculatedScore = 5;
  const strengths = [];
  const improvements = [];

  // Depth & length evaluation
  if (wordCount >= 60) {
    calculatedScore += 2;
    strengths.push('Comprehensive depth, technical nuance, and detailed articulation.');
  } else if (wordCount >= 30) {
    calculatedScore += 1;
    strengths.push('Good concise explanation covering the core fundamentals.');
  } else {
    improvements.push('Consider elaborating with practical contextual examples.');
  }

  // Department-specific terminology detection
  if (category === 'Technical') {
    let domainKeywords = [];
    if (department === 'medical') {
      domainKeywords = [
        'diagnosis', 'patient', 'vitals', 'clinical', 'protocol', 'dosage',
        'contraindication', 'triage', 'ecg', 'medication', 'emergency', 'symptoms',
        'guidelines', 'blood', 'treatment', 'assessment',
      ];
    } else if (department === 'engineering') {
      domainKeywords = [
        'structural', 'load', 'stress', 'cad', 'concrete', 'safety',
        'tolerance', 'drawing', 'standards', 'inspection', 'bearing', 'design',
        'factor', 'analysis', 'foundation', 'code',
      ];
    } else if (department === 'business') {
      domainKeywords = [
        'valuation', 'dcf', 'ebitda', 'cash flow', 'ratio', 'balance sheet',
        'income', 'audit', 'financial', 'margin', 'model', 'wacc',
        'npv', 'irr', 'risk', 'statement',
      ];
    } else {
      // IT
      domainKeywords = [
        'dom', 'state', 'render', 'reconciliation', 'component', 'props', 'hook',
        'async', 'await', 'api', 'database', 'cache', 'query', 'scale', 'architecture',
        'optimize', 'performance', 'latency', 'memory',
      ];
    }

    const matchCount = domainKeywords.filter((kw) => text.includes(kw)).length;
    if (matchCount >= 4) {
      calculatedScore += 2;
      strengths.push(`Demonstrated commanding grasp of ${department ? department.toUpperCase() : 'professional'} terminology.`);
    } else if (matchCount >= 2) {
      calculatedScore += 1;
      strengths.push('Included relevant subject matter vocabulary.');
    } else {
      improvements.push('Incorporate specific professional terminology (e.g. standards, analytical drivers, verified protocols).');
    }
  } else if (category === 'Behavioral') {
    const behavioralKeywords = [
      'team', 'conflict', 'communication', 'deadline', 'priority', 'feedback',
      'solution', 'star', 'learned', 'outcome', 'result', 'collaborate', 'agreed',
    ];
    const matchCount = behavioralKeywords.filter((kw) => text.includes(kw)).length;
    if (matchCount >= 3) {
      calculatedScore += 2;
      strengths.push('Applied STAR framework principles with clear focus on outcome.');
    } else {
      improvements.push('Explicitly highlight the Action you took and the measurable Result achieved.');
    }
  } else {
    // Situational
    const situationalKeywords = [
      'emergency', 'triage', 'protocol', 'isolate', 'mitigate', 'root cause',
      'stakeholder', 'procedure', 'safety', 'verify', 'contingency', 'postmortem',
    ];
    const matchCount = situationalKeywords.filter((kw) => text.includes(kw)).length;
    if (matchCount >= 3) {
      calculatedScore += 2;
      strengths.push('Structured incident management and root-cause mitigation protocol.');
    } else {
      improvements.push('Outline a systematic step-by-step triage protocol (Contain -> Isolate -> Resolve -> Verify).');
    }
  }

  // Cap score between 3 and 10
  calculatedScore = Math.min(Math.max(calculatedScore, 3), 10);

  let verdict = 'Satisfactory';
  let badgeColor = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
  if (calculatedScore >= 8) {
    verdict = 'Excellent Answer';
    badgeColor = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  } else if (calculatedScore >= 6) {
    verdict = 'Good Concept';
    badgeColor = 'bg-blue-500/15 text-blue-300 border-blue-500/30';
  } else {
    verdict = 'Needs Refinement';
    badgeColor = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
  }

  return {
    score: calculatedScore,
    percentage: calculatedScore * 10,
    verdict,
    badgeColor,
    strengths: strengths.length ? strengths : ['Understood the fundamental premise of the question.'],
    improvements: improvements.length
      ? improvements
      : ['Add a quantifiable metric or industry reference standard to elevate this to senior level.'],
    idealTakeaways: question.idealAnswer,
  };
}

/**
 * ============================================================================
 * MONGODB PERSISTENCE INTEGRATION
 * ============================================================================
 */

export const saveInterviewToDb = async ({ sessionId, role, questions, answers, status }) => {
  try {
    const response = await axiosPrivate.post('/interviews/save', {
      sessionId,
      role,
      questions,
      answers,
      status,
    });
    return response.data?.data;
  } catch (error) {
    console.warn('Failed to save interview session to MongoDB:', error);
    return null;
  }
};

export const fetchMyInterviewHistory = async () => {
  try {
    const response = await axiosPrivate.get('/interviews/my-history');
    return response.data?.data || [];
  } catch (error) {
    console.warn('Failed to fetch interview history from MongoDB:', error);
    return [];
  }
};

export const deleteInterviewFromDb = async (id) => {
  try {
    await axiosPrivate.delete(`/interviews/${id}`);
    return true;
  } catch (error) {
    console.warn('Failed to delete interview session:', error);
    return false;
  }
};
