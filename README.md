# 🚀 Smart Career AI — Intelligent Multi-Discipline Career & Recruitment Portal

> **Enterprise Final Year Project (FYP)**  
> An autonomous, AI-driven career matching, recruitment, and mock interview prep system designed across **4 distinct academic disciplines**: Computer Science & IT, Medical & Healthcare, Engineering & Construction, and Business & Finance.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-Query-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Project Overview

**Smart Career AI** bridges the gap between university graduates, experienced industry professionals, and corporate recruiters. Utilizing an intelligent **50-30-20 Weighted Match Engine** (*50% Technical Skills, 30% Verified Experience, 20% Academic Degree*), the portal automatically ranks applicants, uncovers actionable skill gaps, and prepares candidates for real technical interviews.

---

## 🌟 Key Features & Portals

### 1. 🎓 Candidate Portal
* **Live Role Feed:** Multi-tier filtering for **Students** (*internships & scholarships*), **Fresh Graduates** (*entry-level & traineeships*), and **Experienced Professionals** (*mid-to-senior level*).
* **AI Match Scorecard:** Instant breakdown computed against employer-specified mandatory and optional skills.
* **Skill Gap Roadmap:** Identifies missing competencies and suggests targeted, micro-learning resources with quantified score boost percentages.
* **Universal AI Mock Interview Prep:** Interactive 10-question technical mock test across all 4 disciplines with instant AI scorecards and performance analytics stored in MongoDB.
* **Application Tracker:** Live status tracking from `Under Review` to `Shortlisted`, `Interview Scheduled`, and `Accepted`.

### 2. 🏢 Employer Portal
* **Enterprise Job Posting Engine:** Rapid posting with automated skill taxonomy tagging, department allocation, and seat quota limits.
* **Applicant Pipeline & ATS:** Filter and rank candidates by weighted compatibility index with instant review tools.
* **Direct Interview Scheduling:** Schedule technical interviews with customized interview date, time, and room links, triggering automated Gmail SMTP email invitations.
* **Quota & Seat Telemetry:** Live seat allocation meters preventing over-hiring.

### 3. 🛡️ Super Admin Sentinel & Security Desk
* **Executive Dashboard:** Live telemetry including candidate counts, employer verification rates, active jobs, and system uptime.
* **User & Corporate Moderation:** Instant status toggles (Active / Suspended / Verified) with NTN and credential review.
* **Forensic Audit Logs:** Immutable timestamped record of administrative and system activities with one-click **PDF & Excel exports**.
* **Authentication Session Log:** Tracks IP addresses, browsers, geolocations, and MFA statuses.
* **Security Sentinel:** Real-time threat detection (e.g., automated registration floods, failed credential attacks) with mitigation workflows.
* **AI Weight Recalibrator:** Live adjustment of the 50-30-20 matching weights with FYP presets.

### 4. 🤖 24/7 AI Career Counselor
* Interactive chatbot embedded into the candidate layout providing resume review, portfolio critiques, and role guidance.

---

## 🏗️ Architecture & Tech Stack

* **Core Framework:** React 18 with Vite 8 (Hot Module Replacement)
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`) + RTK Query with cookie-based session persistence
* **Routing:** React Router v6 with strict role-based route guards (`ProtectedRoute`)
* **Styling & UI:** Tailwind CSS, Lucide React icons, React Hot Toast
* **Export Utilities:** `jsPDF`, `jspdf-autotable`, `xlsx`
* **HTTP Client:** Axios with centralized interceptors for automatic JWT refresh (`apiClient.js`)

---

## 📂 Project Directory Structure

```text
SMART_CAREE_ SYSTEM/
├── public/                 # Static assets & favicon
├── src/
│   ├── assets/             # Logos, badges, and illustrations
│   ├── components/
│   │   ├── applications/   # Candidate application tracking views
│   │   ├── chatbot/        # Autonomous AI Career Counselor widget
│   │   ├── contact/        # Support and inquiry panels
│   │   ├── dashboard/      # Candidate dashboard widgets (Stats, Roles, Feed)
│   │   ├── employer/       # Job post wizard, applicant reviews & tables
│   │   ├── interview/      # 10-Question AI mock test & scorecard modals
│   │   ├── jobFeed/        # Universal job search and discipline filters
│   │   ├── landing/        # Hero, role tracks, simulation, algorithm cards
│   │   ├── layout/         # Candidate, Employer, and Admin navigation shells
│   │   ├── matches/        # Ranked role matching views & skill gap visualizer
│   │   └── ui/             # Modals, buttons, dropdowns, SkillPicker
│   ├── constants/          # Clean UI constants (disciplines, algorithms, tracks)
│   ├── context/            # Candidate, Employer, Admin, and Chat context providers
│   ├── hooks/              # Custom React hooks (useUserPortal, useDebounce)
│   ├── pages/              # Portal page views (Dashboard, Jobs, Admin, etc.)
│   ├── services/           # REST API client, ATS scoring, and interview prep logic
│   ├── store/              # Redux slices (authSlice) & RTK Query APIs
│   ├── utils/              # PDF & Excel export engines, formatting helpers
│   ├── App.jsx             # Master route registry & authentication guards
│   ├── index.css           # Tailwind custom animations & styling rules
│   └── main.jsx            # Application root mounting
├── .env.example            # Environment variable template
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

---

## ⚡ Getting Started

### Prerequisites
* **Node.js:** v18.x or later
* **npm:** v9.x or later
* **Backend:** Express API running on `http://127.0.0.1:5000` (optional for local full-stack operation)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Msafwn/Portal_Fronted.git
cd Portal_Fronted
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory based on `.env.example`:
```bash
cp .env.example .env
```
Configure your environment variables:
```env
# Backend REST API
VITE_API_URL=http://localhost:5000/api

# Autonomous AI Counselor Webhook (Optional)
VITE_AI_AGENT_WEBHOOK_URL=http://localhost:5678/webhook/career-agent
VITE_PYTHON_AI_URL=http://localhost:5678/webhook/career-agent
```

### 3. Run Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

### 4. Build for Production
To create an optimized production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🔑 Viva & Demo Accounts

| Role | Email | Password | Discipline / Scope |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `safwanarshad782@gmail.com` | `admin123` | System Architecture & Operations |
| **Employer (Tech)** | `recruiter@techlogix.io` | `employer123` | Software Engineering & AI |
| **Employer (Health)** | `hr@shifa.pk` | `employer123` | Medical & Healthcare |
| **Candidate (IT)** | `hamza.ali@example.com` | `candidate123` | Computer Science / MERN Stack |
| **Candidate (Medical)** | `ayesha.noor@example.com` | `candidate123` | Clinical Pharmacy & Diagnostics |

---

## 📄 Academic Attribution & License

This project was engineered as a comprehensive **Final Year Project (FYP)**.  
Released under the **MIT License**.
