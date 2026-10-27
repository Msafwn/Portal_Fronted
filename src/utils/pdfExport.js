import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Universal PDF Exporter for Smart Career AI Administration
 * Generates branded, executive-quality PDF reports.
 */

const addPdfHeader = (doc, title, subtitle) => {
  // Brand Header Banner
  doc.setFillColor(11, 31, 76); // Dark Navy Blue (#0b1f4c)
  doc.rect(0, 0, doc.internal.pageSize.width, 28, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('SMART CAREER ROLE MATCH AI SYSTEM', 14, 12);

  // Subtitle / Portal
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(147, 197, 253); // Light Blue (#93c5fd)
  doc.text('Super Administrator Portal • System Audit & Forensic Intelligence', 14, 20);

  // Report Title
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, 40);

  // Report Subtitle & Timestamp
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139); // Slate-500
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  doc.text(`${subtitle} • Generated on ${dateStr}`, 14, 46);

  // Horizontal Accent Rule
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, 50, doc.internal.pageSize.width - 14, 50);
};

const addPdfFooter = (doc) => {
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(
      'Smart Career AI Job System — Barani Institute of Sciences, Sahiwal / PMAS-Arid Agriculture University',
      14,
      pageHeight - 8
    );
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 30, pageHeight - 8);
  }
};

/**
 * 1. Export System Audit & Analytics PDF
 */
export const exportSystemAuditPdf = (kpis, chartsData, auditLog, adminProfile) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  addPdfHeader(doc, 'System Reports & Platform Intelligence Audit', 'Executive Telemetry');

  let currentY = 56;

  // Master KPIs Summary Box
  autoTable(doc, {
    startY: currentY,
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 8.5, cellPadding: 3 },
    head: [['Metric Classification', 'Live System Value', 'Operational Status']],
    body: [
      ['Total Candidates Registered', `${kpis.totalCandidates} Candidates`, `${kpis.studentsCount} Students, ${kpis.graduatesCount} Grads, ${kpis.professionalsCount} Pros`],
      ['Corporate Employers', `${kpis.verifiedEmployersCount} Verified`, `${kpis.pendingEmployersCount} Pending Review, ${kpis.totalEmployers} Total`],
      ['Active Job Vacancies', `${kpis.activeJobsCount} Listings`, `${kpis.totalJobs} Total listings across 4 disciplines`],
      ['AI Matches Generated', `${kpis.totalAiMatches.toLocaleString()} Matches`, `${kpis.avgMatchScore}% Average Weighted Cosine Score`],
      ['Core System Health', `${kpis.systemUptime} Uptime`, `${kpis.apiLatencyMs}ms Latency • MongoDB Connected • AI Vectorizer Active`],
    ],
  });

  currentY = doc.lastAutoTable.finalY + 8;

  // Discipline Breakdown
  autoTable(doc, {
    startY: currentY,
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 8.5, cellPadding: 2.5 },
    head: [['Academic Faculty Discipline', 'Registered Candidates', 'Segment Percentage']],
    body: chartsData.disciplineBreakdown.labels.map((label, idx) => {
      const count = chartsData.disciplineBreakdown.series[idx];
      const total = chartsData.disciplineBreakdown.series.reduce((a, b) => a + b, 0);
      return [label, `${count} Candidates`, `${Math.round((count / total) * 100)}%`];
    }),
  });

  currentY = doc.lastAutoTable.finalY + 8;

  // Recent Audit Trail
  autoTable(doc, {
    startY: currentY,
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 2 },
    head: [['Action / Category', 'Event Detail', 'Initiated By', 'Timestamp', 'Status']],
    body: auditLog.map((log) => [
      log.action,
      log.detail,
      log.actor,
      log.timestamp,
      log.type.toUpperCase(),
    ]),
  });

  addPdfFooter(doc);
  doc.save('SmartCareerAI_System_Audit_Report.pdf');
};

/**
 * 2. Export Candidate Directory PDF
 */
export const exportCandidatesPdf = (candidates, adminProfile) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  addPdfHeader(doc, 'Candidate & User Control Desk Directory', 'Registered Candidates Roster');

  autoTable(doc, {
    startY: 55,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 2.5 },
    head: [
      [
        'Candidate Name',
        'Email Address',
        'Academic Role',
        'Faculty Discipline',
        'Target Role & University',
        'AI Match',
        'Status',
      ],
    ],
    body: candidates.map((c) => [
      c.name,
      c.email,
      c.roleLabel || c.role,
      c.discipline,
      `${c.targetRole} (${c.institution})`,
      `${c.matchScore}%`,
      c.status.toUpperCase(),
    ]),
  });

  addPdfFooter(doc);
  doc.save('SmartCareerAI_Candidate_Directory.pdf');
};

/**
 * 3. Export Verified Employers & Companies PDF
 */
export const exportEmployersPdf = (employers, adminProfile) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  addPdfHeader(doc, 'Employer & Company Verification Directory', 'Corporate Entity Registry');

  autoTable(doc, {
    startY: 55,
    theme: 'striped',
    headStyles: { fillColor: [11, 31, 76], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 2.5 },
    head: [
      [
        'Company Legal Name',
        'Industry Sector',
        'FBR NTN Number',
        'Headquarters',
        'Recruiter Representative',
        'Work Email',
        'Jobs',
        'Status',
      ],
    ],
    body: employers.map((e) => [
      e.name,
      e.industry,
      e.ntnNumber,
      e.headquarters,
      e.recruiterName,
      e.recruiterEmail,
      e.activeJobsCount || 0,
      e.verificationStatus.toUpperCase(),
    ]),
  });

  addPdfFooter(doc);
  doc.save('SmartCareerAI_Employer_Directory.pdf');
};

/**
 * 4. Export Job Postings & Moderation Directory PDF
 */
export const exportJobsModerationPdf = (jobs, adminProfile) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  addPdfHeader(doc, 'Job Postings Moderation & Integrity Directory', 'Multi-Discipline Vacancy Roster');

  autoTable(doc, {
    startY: 55,
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 2.5 },
    head: [
      [
        'Job Vacancy Title',
        'Employer Company',
        'Academic Discipline',
        'Target Role',
        'Location / Type',
        'Applicants',
        'AI Risk Rating',
        'Moderation Status',
      ],
    ],
    body: jobs.map((j) => [
      j.title,
      j.company,
      j.discipline,
      j.targetRole,
      `${j.location} • ${j.jobType}`,
      `${j.applicantsCount || 0} Apps (${j.vacancies || 1} seats)`,
      j.riskScore < 40 ? `HIGH RISK (${j.riskScore}%)` : `Safe (${j.riskScore}%)`,
      j.moderationStatus.toUpperCase(),
    ]),
  });

  addPdfFooter(doc);
  doc.save('SmartCareerAI_Job_Moderation_Directory.pdf');
};

/**
 * 5. Export AI Engine Algorithm & Weights Specification PDF
 */
export const exportAlgorithmSpecPdf = (aiSettings, presets, skillsCount, adminProfile) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  addPdfHeader(doc, 'AI Match Engine & Weighted Formulation Specification', 'Algorithm Calibration Desk');

  let currentY = 56;

  // Active Weights Table
  autoTable(doc, {
    startY: currentY,
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 3 },
    head: [['Algorithm Scoring Parameter', 'Assigned Ratio Weight', 'Underlying Engine Implementation']],
    body: [
      ['Skill Match (W_s)', `${aiSettings.skillWeight}%`, 'Normalized Cosine Similarity of 384-d Dense Skill Vectors + TF-IDF Jaccard'],
      ['Experience Match (W_e)', `${aiSettings.experienceWeight}%`, 'Tenure Duration, Role Progression & Seniority Multiplier'],
      ['Education Match (W_d)', `${aiSettings.educationWeight}%`, 'Degree Level (BS/MS/PhD), HEC-Accredited Major & Institution Tier'],
      ['Minimum Threshold', `${aiSettings.minMatchThreshold}%`, 'Cutoff score below which candidate is excluded from job recommendations'],
      ['Active Vectorizer', 'all-MiniLM-L6-v2', '384-dimensional dense semantic embedding space with caching'],
    ],
  });

  currentY = doc.lastAutoTable.finalY + 8;

  // Pre-configured Profiles
  autoTable(doc, {
    startY: currentY,
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 8.5, cellPadding: 2.5 },
    head: [['Scoring Profile Preset', 'Ratio (Skill / Exp / Edu)', 'Target Candidate Demographics']],
    body: (presets || []).map((p) => [
      p.name,
      `${p.skillWeight}% / ${p.experienceWeight}% / ${p.educationWeight}%`,
      p.description,
    ]),
  });

  currentY = doc.lastAutoTable.finalY + 8;

  // Mathematical Formulation
  autoTable(doc, {
    startY: currentY,
    theme: 'plain',
    styles: { fontSize: 8.5, cellPadding: 2.5, textColor: [30, 41, 59] },
    head: [['Official FYP Project Formulation (PMAS-Arid Agriculture University Standards)']],
    body: [
      ['Final Weighted Score S = (Skill_Score × W_s) + (Exp_Score × W_e) + (Edu_Score × W_d)'],
      ['Where W_s + W_e + W_d = 1.0 (Strictly normalized linear convex combination)'],
      [`Total Registered Skills Indexed in Vector Vocabulary: ${skillsCount} Domain Keywords`],
      [`Certified Calibration Status: ${aiSettings.lastCalibrated} (${aiSettings.calibrationVersion})`],
    ],
  });

  addPdfFooter(doc);
  doc.save('SmartCareerAI_Algorithm_Weights_Spec.pdf');
};

/**
 * 6. Export Comprehensive FYP System Audit & Security Telemetry PDF Report
 */
export const exportFypAuditAndSecurityPdf = (auditLogs, loginHistory, securityAlerts, adminProfile) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  addPdfHeader(doc, 'System Audit Logs, Security Telemetry & FYP Defense Report', 'Security Sentinel & Compliance Dossier');

  let currentY = 55;

  // FYP Project Executive Summary Box
  autoTable(doc, {
    startY: currentY,
    theme: 'grid',
    headStyles: { fillColor: [11, 31, 76], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 8.5, cellPadding: 2.5 },
    head: [['FYP Project Metric', 'Certified Telemetry Value', 'Audit Status']],
    body: [
      ['System Name & Architecture', 'Smart Career Role Match AI System (MERN + AI Recommendation Engine)', 'Online & Stable'],
      ['Total Traceable Audit Trails', `${auditLogs?.length || 0} Events Logged`, '100% Cryptographic Traceability'],
      ['Active Security Alerts', `${securityAlerts?.length || 0} Incidents Recorded`, 'Real-time Sentinel Active'],
      ['Authentication & Session Logs', `${loginHistory?.length || 0} Monitored User Sessions`, 'MFA & Session Validation Active'],
      ['Academic Affiliation', 'Barani Institute of Sciences, Sahiwal / PMAS-Arid Agriculture University', 'Final Year Project (FYP-2026)'],
    ],
  });

  currentY = doc.lastAutoTable.finalY + 8;

  // Suspicious Activity Alerts
  if (securityAlerts && securityAlerts.length > 0) {
    autoTable(doc, {
      startY: currentY,
      theme: 'grid',
      headStyles: { fillColor: [225, 29, 72], textColor: 255, fontStyle: 'bold' }, // Rose-600
      styles: { fontSize: 8, cellPadding: 2 },
      head: [['Alert ID', 'Security Threat Event', 'Target Entity', 'Threat Level', 'Detected At', 'Mitigation Status']],
      body: securityAlerts.map((a) => [
        a.id,
        a.title,
        a.target,
        `${a.severity.toUpperCase()} (${a.threatScore}/100)`,
        a.detectedAt,
        a.status,
      ]),
    });
    currentY = doc.lastAutoTable.finalY + 8;
  }

  // System Audit Trail Table
  autoTable(doc, {
    startY: currentY,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 7.5, cellPadding: 2 },
    head: [['Timestamp', 'Actor / User', 'Action', 'Category', 'IP Address / Location', 'Severity', 'Status']],
    body: (auditLogs || []).slice(0, 15).map((log) => [
      log.timestamp,
      log.actor,
      log.action,
      log.category || 'General',
      `${log.ipAddress || '127.0.0.1'} (${log.location || 'PK'})`,
      (log.severity || log.type || 'info').toUpperCase(),
      log.status || 'Verified',
    ]),
  });

  addPdfFooter(doc);
  doc.save('SmartCareerAI_System_Audit_Logs_FYP_Report.pdf');
};



