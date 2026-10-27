/**
 * Utility to export system audit data and login histories to Excel/CSV
 * Formatted with UTF-8 BOM so Microsoft Excel and Google Sheets open flawlessly.
 */

export const exportAuditLogsToCsv = (logs, filename = 'SmartCareerAI_System_Audit_Logs.csv') => {
  if (!logs || logs.length === 0) return;

  const headers = [
    'Log ID',
    'Timestamp',
    'Actor Name',
    'Actor Role',
    'Event Action',
    'Category',
    'Event Details',
    'IP Address',
    'Location',
    'Device / Browser',
    'Severity',
    'Status',
  ];

  const rows = logs.map((log) => [
    log.id || '',
    log.timestamp || '',
    log.actor || '',
    log.actorRole || 'System',
    log.action || '',
    log.category || 'General',
    `"${(log.detail || '').replace(/"/g, '""')}"`,
    log.ipAddress || '127.0.0.1',
    log.location || 'Localhost',
    `"${(log.device || '').replace(/"/g, '""')}"`,
    log.severity || log.type || 'Info',
    log.status || 'Success',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\r\n');

  // \uFEFF is UTF-8 Byte Order Mark for Excel compatibility
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportLoginHistoryToCsv = (history, filename = 'SmartCareerAI_Login_History.csv') => {
  if (!history || history.length === 0) return;

  const headers = [
    'Session ID',
    'User Name & Email',
    'User Role',
    'Login Timestamp',
    'Session Duration',
    'Authentication Status',
    'IP Address',
    'Location',
    'Device / Browser',
    'MFA Verification',
  ];

  const rows = history.map((h) => [
    h.id || '',
    `"${(h.user || '').replace(/"/g, '""')}"`,
    h.role || '',
    h.loginTime || '',
    h.duration || '',
    h.status || '',
    h.ipAddress || '',
    h.location || '',
    `"${(h.device || '').replace(/"/g, '""')}"`,
    h.mfaStatus || 'Verified',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\r\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default {
  exportAuditLogsToCsv,
  exportLoginHistoryToCsv,
};
