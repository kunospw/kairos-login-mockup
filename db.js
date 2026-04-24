/**
 * db.js — Kairos Time Entry Local Database
 * Provides a localStorage-backed JSON store for jobs and submissions.
 */

const KairosDB = (function () {

    const JOBS_KEY = 'kairos_jobs';
    const SUBMISSIONS_KEY = 'kairos_submissions';
    const SESSION_KEY = 'kairos_active_session';

    /* ─── Seed Data ─────────────────────────────────────────────── */
    const SEED_JOBS = [
        {
            id: 'JOB001',
            jobNumber: '70014S25100801',
            projectName: 'Tuas Power Station',
            status: 'new', // new | in-progress | completed
            type: 'MFG',
            phase: 'TC1-SVC',
            operation: '10',
            employee: 'ARIF .',
            userId: '01074115',
            supervisorId: '1013404',
            supervisorName: 'ANNIE',
            company: '[THIRD] TIONG WOON PROJECT & CONTRACTING PTE. LTD.',
            location: 'No Bin Location',
            startDate: '08-10-2025',
            endDate: '08-10-2025',
            laborHours: 0,
            icon: 'zap',
            startDateTime: '08/10/2025 | 08:30 AM',
        },
        {
            id: 'JOB002',
            jobNumber: '70014S25100802',
            projectName: 'Keppel Shipyard Overhaul',
            status: 'new',
            type: 'MFG',
            phase: 'TC2-MNT',
            operation: '20',
            employee: 'ARIF .',
            userId: '01074115',
            supervisorId: '1013405',
            supervisorName: 'RAYMOND',
            company: '[THIRD] TIONG WOON PROJECT & CONTRACTING PTE. LTD.',
            location: 'Berth 7 - Dry Dock',
            startDate: '08-10-2025',
            endDate: '08-10-2025',
            laborHours: 0,
            icon: 'ship',
            startDateTime: '08/10/2025 | 09:15 AM',
        },
        {
            id: 'JOB003',
            jobNumber: '70014S25100803',
            projectName: 'Jurong Island Refinery',
            status: 'new',
            type: 'MAINT',
            phase: 'TC1-OPS',
            operation: '05',
            employee: 'ARIF .',
            userId: '01074115',
            supervisorId: '1013406',
            supervisorName: 'SITI',
            company: '[THIRD] TIONG WOON PROJECT & CONTRACTING PTE. LTD.',
            location: 'Block C, Level 3',
            startDate: '08-10-2025',
            endDate: '08-10-2025',
            laborHours: 0,
            icon: 'wrench',
            startDateTime: '08/10/2025 | 10:00 AM',
        },
    ];

    /* ─── Init ───────────────────────────────────────────────────── */
    function init() {
        if (!localStorage.getItem(JOBS_KEY)) {
            localStorage.setItem(JOBS_KEY, JSON.stringify(SEED_JOBS));
        }
        if (!localStorage.getItem(SUBMISSIONS_KEY)) {
            localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify([]));
        }
    }

    /* ─── Jobs ───────────────────────────────────────────────────── */
    function getJobs() {
        return JSON.parse(localStorage.getItem(JOBS_KEY) || '[]');
    }

    function getJobById(id) {
        return getJobs().find(j => j.id === id) || null;
    }

    function updateJob(id, fields) {
        const jobs = getJobs();
        const idx = jobs.findIndex(j => j.id === id);
        if (idx === -1) return false;
        jobs[idx] = { ...jobs[idx], ...fields };
        localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
        return true;
    }

    /* ─── Active Session ─────────────────────────────────────────── */
    function saveSession(sessionData) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    }

    function getSession() {
        return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    }

    function clearSession() {
        localStorage.removeItem(SESSION_KEY);
    }

    /* ─── Submissions ────────────────────────────────────────────── */
    function saveSubmission(submission) {
        const subs = getSubmissions();
        // Replace existing submission for same job, or push new
        const idx = subs.findIndex(s => s.jobId === submission.jobId);
        if (idx !== -1) {
            subs[idx] = submission;
        } else {
            subs.push(submission);
        }
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(subs));
    }

    function getSubmissions() {
        return JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
    }

    function getSubmissionByJobId(jobId) {
        return getSubmissions().find(s => s.jobId === jobId) || null;
    }

    /* ─── Reset (dev utility) ────────────────────────────────────── */
    function resetAll() {
        localStorage.removeItem(JOBS_KEY);
        localStorage.removeItem(SUBMISSIONS_KEY);
        localStorage.removeItem(SESSION_KEY);
        init();
    }

    /* ─── Expose ─────────────────────────────────────────────────── */
    init();

    return {
        getJobs,
        getJobById,
        updateJob,
        saveSession,
        getSession,
        clearSession,
        saveSubmission,
        getSubmissions,
        getSubmissionByJobId,
        resetAll,
    };
})();