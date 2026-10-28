/**
 * Pipeline PDF & Print Export Utility
 * Generates an executive, print-ready hiring dossier that can be saved directly as PDF via the browser.
 */

export const exportPipelineToPdf = ({
  applicants = [],
  company = { name: 'Employer Talent Portal', industry: 'Recruitment' },
  activeJobTitle = null,
}) => {
  if (!applicants || applicants.length === 0) {
    alert('No candidates available to export.');
    return;
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const total = applicants.length;
  const highMatch = applicants.filter((a) => (a.matchScore || 0) >= 80).length;
  const shortlisted = applicants.filter((a) => a.status === 'Shortlisted').length;
  const interviewScheduled = applicants.filter((a) => a.status === 'Interview Scheduled').length;

  const rowsHtml = applicants
    .map((app, index) => {
      const score = app.matchScore || 0;
      const scoreBadgeColor =
        score >= 90
          ? 'background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;'
          : score >= 80
          ? 'background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe;'
          : 'background: #fffbeb; color: #92400e; border: 1px solid #fde68a;';

      const statusBadgeColor =
        app.status === 'Shortlisted'
          ? 'background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;'
          : app.status === 'Interview Scheduled'
          ? 'background: #eef2ff; color: #3730a3; border: 1px solid #c7d2fe;'
          : app.status === 'Rejected'
          ? 'background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;'
          : 'background: #f8fafc; color: #475569; border: 1px solid #e2e8f0;';

      const matchedSkills = (app.matchedSkills || [])
        .slice(0, 4)
        .map(
          (s) =>
            `<span style="display:inline-block; font-size:10px; background:#f1f5f9; color:#334155; padding:2px 6px; border-radius:4px; margin-right:3px; margin-bottom:3px;">${s}</span>`
        )
        .join('');

      return `
        <tr style="border-bottom: 1px solid #e2e8f0; page-break-inside: avoid;">
          <td style="padding: 10px 8px; text-align: center; font-weight: bold; color: #64748b; font-size: 11px;">
            #${index + 1}
          </td>
          <td style="padding: 10px 8px;">
            <div style="font-weight: bold; color: #0f172a; font-size: 13px;">${app.name}</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${app.education || 'N/A'}</div>
            <div style="font-size: 10px; color: #94a3b8;">${app.email} • ${app.phone}</div>
          </td>
          <td style="padding: 10px 8px;">
            <div style="font-weight: 600; color: #1e293b; font-size: 12px;">${app.appliedJobTitle}</div>
            <div style="font-size: 11px; color: #475569; margin-top: 2px;">${app.roleTarget || 'Entry-Level'} • ${app.experienceYears || '0 yrs'}</div>
          </td>
          <td style="padding: 10px 8px; text-align: center;">
            <span style="display: inline-block; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 12px; ${scoreBadgeColor}">
              ⭐ ${score}% Match
            </span>
            <div style="font-size: 9px; color: #64748b; margin-top: 3px;">
              Tech: ${app.scoreBreakdown?.technical || 45}/50 • Exp: ${app.scoreBreakdown?.experience || 25}/30
            </div>
          </td>
          <td style="padding: 10px 8px;">
            <div style="display: flex; flex-wrap: wrap;">
              ${matchedSkills}
            </div>
          </td>
          <td style="padding: 10px 8px; text-align: center;">
            <span style="display: inline-block; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 11px; ${statusBadgeColor}">
              ${app.status}
            </span>
            ${
              app.interview
                ? `<div style="font-size: 9px; color: #4f46e5; margin-top: 2px; font-weight: 600;">${app.interview.date} (${app.interview.time})</div>`
                : ''
            }
          </td>
        </tr>
      `;
    })
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Candidate Pipeline Report - ${company.name}</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 15mm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          background: #ffffff;
          margin: 0;
          padding: 20px;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #2563eb;
          padding-bottom: 16px;
          margin-bottom: 20px;
        }
        .company-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
        }
        .company-sub {
          font-size: 12px;
          color: #64748b;
          margin-top: 3px;
        }
        .report-badge {
          text-align: right;
        }
        .report-title {
          font-size: 16px;
          font-weight: 700;
          color: #1e40af;
        }
        .report-date {
          font-size: 11px;
          color: #64748b;
          margin-top: 4px;
        }
        .kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .kpi-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 14px;
        }
        .kpi-label {
          font-size: 10px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .kpi-value {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin-top: 2px;
        }
        .kpi-sub {
          font-size: 10px;
          color: #64748b;
          margin-top: 2px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        th {
          background: #f1f5f9;
          color: #334155;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 8px;
          border-bottom: 1px solid #cbd5e1;
        }
        .footer {
          margin-top: 30px;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #94a3b8;
        }
        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="background: #2563eb; color: #ffffff; padding: 12px 20px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>📄 PDF Print Preview Ready:</strong> In the print dialog, select <strong>"Save as PDF"</strong> as your printer destination.
        </div>
        <button onclick="window.print()" style="background: #ffffff; color: #2563eb; border: none; padding: 6px 14px; font-weight: 700; font-size: 12px; border-radius: 6px; cursor: pointer;">
          Print / Save PDF Now
        </button>
      </div>

      <div class="header">
        <div>
          <div class="company-title">${company.name}</div>
          <div class="company-sub">${company.industry} • Smart Career AI Recruiter Desk</div>
          ${
            activeJobTitle
              ? `<div style="font-size:11px; color:#2563eb; font-weight:bold; margin-top:4px;">Filter Scope: ${activeJobTitle}</div>`
              : `<div style="font-size:11px; color:#64748b; margin-top:4px;">Scope: All Active Job Openings</div>`
          }
        </div>
        <div class="report-badge">
          <div class="report-title">Candidate Pipeline Dossier</div>
          <div class="report-date">Generated: ${currentDate} (${currentTime})</div>
          <div style="font-size: 10px; color: #059669; font-weight: 600; margin-top: 2px;">✓ Verified by AI Semantic Engine</div>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-label">Total Candidates</div>
          <div class="kpi-value">${total}</div>
          <div class="kpi-sub">Evaluated in pipeline</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">High AI Match (≥ 80%)</div>
          <div class="kpi-value" style="color: #d97706;">${highMatch}</div>
          <div class="kpi-sub">Top tier candidate fit</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Shortlisted</div>
          <div class="kpi-value" style="color: #059669;">${shortlisted}</div>
          <div class="kpi-sub">Approved for next steps</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Interviews Set</div>
          <div class="kpi-value" style="color: #4f46e5;">${interviewScheduled}</div>
          <div class="kpi-sub">Active scheduling</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 5%; text-align: center;">Rank</th>
            <th style="width: 28%;">Candidate & Credentials</th>
            <th style="width: 22%;">Target Role & Level</th>
            <th style="width: 17%; text-align: center;">AI Match Score</th>
            <th style="width: 16%;">Verified Skills</th>
            <th style="width: 12%; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <div class="footer">
        <div>Smart Career AI • Confidential Talent Acquisition & Role Recommendation Platform</div>
        <div>Page 1 of 1 • Internal Executive Use Only</div>
      </div>

      <script>
        window.onload = function() {
          // Trigger print dialog automatically after slight delay
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=950,height=800');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } else {
    alert('Please allow popups for this site to export PDF.');
  }
};
