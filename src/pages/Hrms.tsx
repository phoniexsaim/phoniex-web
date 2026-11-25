import React, { useState, useEffect } from 'react';
import { User, Calendar, Clock, BarChart2, Check, AlertCircle, Play, Square, Send } from 'lucide-react';

interface AttendanceLog {
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'incomplete';
}

interface LeaveRequest {
  id: string;
  type: string;
  start: string;
  end: string;
  days: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export const Hrms: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'attendance' | 'leave' | 'performance'>('dashboard');

  // --- Attendance Clock Logic & State ---
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  // Time state update for the interactive 3D clock hands
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSeconds(now.getSeconds());
      setMinutes(now.getMinutes());
      setHours(now.getHours());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([
    { date: '2026-05-29', checkIn: '08:54 AM', checkOut: '05:02 PM', status: 'present' },
    { date: '2026-05-30', checkIn: '08:58 AM', checkOut: '05:10 PM', status: 'present' },
    { date: '2026-05-31', checkIn: '09:02 AM', checkOut: '04:55 PM', status: 'present' },
  ]);

  const handleCheckInToggle = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toISOString().split('T')[0];

    if (!isCheckedIn) {
      setClockInTime(timeString);
      setIsCheckedIn(true);
      setAttendanceLogs([
        { date: dateString, checkIn: timeString, checkOut: '--:--', status: 'incomplete' },
        ...attendanceLogs,
      ]);
    } else {
      setIsCheckedIn(false);
      setClockInTime(null);
      const updated = [...attendanceLogs];
      if (updated.length > 0 && updated[0].date === dateString) {
        updated[0].checkOut = timeString;
        updated[0].status = 'present';
      }
      setAttendanceLogs(updated);
    }
  };

  // --- Leave Logic & State ---
  const [leaveDaysLeft, setLeaveDaysLeft] = useState(14);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: '1', type: 'Annual Leave', start: '2026-06-15', end: '2026-06-18', days: 4, reason: 'Family integration retreat', status: 'APPROVED' },
    { id: '2', type: 'Medical Leave', start: '2026-05-12', end: '2026-05-13', days: 1, reason: 'System ocular checkup', status: 'APPROVED' },
  ]);

  const [newLeave, setNewLeave] = useState({ type: 'Annual Leave', start: '', end: '', reason: '' });

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeave.start || !newLeave.end || !newLeave.reason) return;

    const sDate = new Date(newLeave.start);
    const eDate = new Date(newLeave.end);
    const timeDiff = eDate.getTime() - sDate.getTime();
    const daysCount = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1);

    const reqId = (leaveRequests.length + 1).toString();
    const submission: LeaveRequest = {
      id: reqId,
      type: newLeave.type,
      start: newLeave.start,
      end: newLeave.end,
      days: daysCount,
      reason: newLeave.reason,
      status: 'PENDING',
    };

    setLeaveRequests([submission, ...leaveRequests]);
    setLeaveDaysLeft((prev) => Math.max(0, prev - daysCount));
    setNewLeave({ type: 'Annual Leave', start: '', end: '', reason: '' });

    setTimeout(() => {
      setLeaveRequests((curr) =>
        curr.map((r) => (r.id === reqId ? { ...r, status: 'APPROVED' } : r))
      );
    }, 3000);
  };

  return (
    <div className="fade-in-section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="glow-orb" style={{ top: '10%', right: '5%', background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.12) 0%, transparent 65%)' }} />
      <div className="glow-orb" style={{ bottom: '10%', left: '5%' }} />

      {/* HRMS Platform Panel Container */}
      <div className="glass-panel hrms-container">
        {/* Sidebar / Mobile Header Navigation Area */}
        <aside className="hrms-sidebar">
          <div className="hrms-sidebar-inner">
            {/* Identity Profile preview header */}
            <div className="hrms-profile-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    flexShrink: 0,
                    boxShadow: '0 0 12px rgba(var(--theme-primary-rgb), 0.35)',
                  }}
                >
                  AS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Saim Raza</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)' }}>Technical Consultant</span>
                </div>
              </div>

              {/* Status Indicator for mobile layout */}
              <div className="hrms-mobile-status">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff00', boxShadow: '0 0 8px #00ff00' }} />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Sub-navigation controls */}
            <nav className="hrms-nav-list">
              <button
                className={`hrms-nav-item ${activeSubTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('dashboard')}
              >
                <User size={16} />
                <span>Dashboard</span>
              </button>

              <button
                className={`hrms-nav-item ${activeSubTab === 'attendance' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('attendance')}
              >
                <Clock size={16} />
                <span>Attendance Logs</span>
              </button>

              <button
                className={`hrms-nav-item ${activeSubTab === 'leave' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('leave')}
              >
                <Calendar size={16} />
                <span>Leave Planner</span>
              </button>

              <button
                className={`hrms-nav-item ${activeSubTab === 'performance' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('performance')}
              >
                <BarChart2 size={16} />
                <span>Performance Hub</span>
              </button>
            </nav>
          </div>

          <div className="hrms-desktop-status">
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff00', boxShadow: '0 0 8px #00ff00' }} />
            <span>SECURE_CONNECTION_STABLE</span>
          </div>
        </aside>

        {/* Tab Panel Main Content */}
        <main className="hrms-main-content">
          {activeSubTab === 'dashboard' && (
            /* --- DASHBOARD TAB VIEW --- */
            <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.6rem)' }}>
                  Platform Overview
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)', fontFamily: 'monospace' }}>
                  Phoniex_HRMS_CORE
                </span>
              </div>

              {/* Dynamic Key Performance Indicators (Progress Rings) */}
              <div className="hrms-kpi-grid">
                {/* 1. Performance Ring */}
                <div className="glass-panel hrms-kpi-card">
                  <div className="hrms-kpi-ring-wrapper">
                    <svg width="68" height="68" viewBox="0 0 76 76" className="circular-progress-svg">
                      <circle cx="38" cy="38" r="32" strokeWidth="5" className="circular-progress-bg" />
                      <circle
                        cx="38"
                        cy="38"
                        r="32"
                        strokeWidth="5"
                        strokeDasharray={`${2 * Math.PI * 32}`}
                        strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.96)}`}
                        className="circular-progress-fg"
                      />
                    </svg>
                  </div>
                  <div className="hrms-kpi-info">
                    <span className="hrms-kpi-value">96%</span>
                    <span className="hrms-kpi-label">KPI Score Rating</span>
                  </div>
                </div>

                {/* 2. Attendance Ring */}
                <div className="glass-panel hrms-kpi-card">
                  <div className="hrms-kpi-ring-wrapper">
                    <svg width="68" height="68" viewBox="0 0 76 76" className="circular-progress-svg">
                      <circle cx="38" cy="38" r="32" strokeWidth="5" className="circular-progress-bg" />
                      <circle
                        cx="38"
                        cy="38"
                        r="32"
                        strokeWidth="5"
                        strokeDasharray={`${2 * Math.PI * 32}`}
                        strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.984)}`}
                        className="circular-progress-fg"
                        style={{ stroke: 'var(--theme-secondary)' }}
                      />
                    </svg>
                  </div>
                  <div className="hrms-kpi-info">
                    <span className="hrms-kpi-value">98.4%</span>
                    <span className="hrms-kpi-label">Monthly Attendance</span>
                  </div>
                </div>

                {/* 3. Leave Allowance Ring */}
                <div className="glass-panel hrms-kpi-card">
                  <div className="hrms-kpi-ring-wrapper">
                    <svg width="68" height="68" viewBox="0 0 76 76" className="circular-progress-svg">
                      <circle cx="38" cy="38" r="32" strokeWidth="5" className="circular-progress-bg" />
                      <circle
                        cx="38"
                        cy="38"
                        r="32"
                        strokeWidth="5"
                        strokeDasharray={`${2 * Math.PI * 32}`}
                        strokeDashoffset={`${2 * Math.PI * 32 * (1 - leaveDaysLeft / 20)}`}
                        className="circular-progress-fg"
                        style={{ stroke: 'var(--theme-accent)' }}
                      />
                    </svg>
                  </div>
                  <div className="hrms-kpi-info">
                    <span className="hrms-kpi-value">{leaveDaysLeft} Days</span>
                    <span className="hrms-kpi-label">Leave Balance Left</span>
                  </div>
                </div>
              </div>

              {/* Operational Audit Log */}
              <div className="glass-panel hrms-card-panel">
                <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px' }}>
                  Operational Audit Log
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { text: 'Saim Raza submitted Annual Leave request (approved by system automatically).', time: 'Just now', icon: <Check size={14} style={{ color: 'var(--theme-secondary)' }} /> },
                    { text: 'Daily attendance session verified successfully at 09:02 AM.', time: '2 hours ago', icon: <Check size={14} style={{ color: '#00ff00' }} /> },
                    { text: 'Review performance metric update: target threshold exceeded.', time: 'Yesterday', icon: <BarChart2 size={14} style={{ color: 'var(--theme-accent)' }} /> },
                  ].map((act, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.85rem' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          background: 'rgba(255,255,255,0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {act.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ color: 'var(--theme-text)', lineHeight: '1.4', display: 'block' }}>{act.text}</span>
                        <span style={{ color: 'var(--theme-text-muted)', fontSize: '0.72rem', marginTop: '2px', display: 'block' }}>{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'attendance' && (
            /* --- ATTENDANCE TRACKER TAB VIEW --- */
            <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.6rem)' }}>
                  Attendance Tracker
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)', fontFamily: 'monospace' }}>
                  ATTENDANCE_STREAM
                </span>
              </div>

              <div className="hrms-attendance-layout">
                {/* 3D Clock Interface card */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  <div className="clock-body">
                    <div className="clock-hand-hour" style={{ transform: `rotate(${(hours % 12) * 30 + minutes * 0.5}deg)` }} />
                    <div className="clock-hand-minute" style={{ transform: `rotate(${minutes * 6}deg)` }} />
                    <div className="clock-hand-second" style={{ transform: `rotate(${seconds * 6}deg)` }} />
                    <div className="clock-pin" />
                  </div>

                  {isCheckedIn && clockInTime && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--theme-secondary)', fontWeight: 600, fontFamily: 'monospace' }}>
                      ACTIVE SESSION SINCE {clockInTime}
                    </span>
                  )}

                  <button
                    onClick={handleCheckInToggle}
                    className="btn-primary"
                    style={{
                      background: isCheckedIn ? 'linear-gradient(135deg, #e03b3b 0%, #a82020 100%)' : undefined,
                      boxShadow: isCheckedIn ? '0 0 20px rgba(224, 59, 59, 0.4)' : undefined,
                      padding: '12px 28px',
                      fontSize: '0.92rem',
                    }}
                  >
                    {isCheckedIn ? (
                      <>
                        <Square size={16} /> Check Out Session
                      </>
                    ) : (
                      <>
                        <Play size={16} /> Check In Session
                      </>
                    )}
                  </button>
                </div>

                {/* Log display listing */}
                <div className="glass-panel hrms-card-panel" style={{ minHeight: '260px' }}>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px' }}>
                    Attendance History
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {attendanceLogs.map((log, i) => (
                      <div
                        key={i}
                        className="hrms-log-row"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 14px',
                          background: 'rgba(0,0,0,0.22)',
                          border: '1px solid var(--theme-border)',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          flexWrap: 'wrap',
                          gap: '8px',
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{log.date}</span>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.82rem' }}>
                          <span>In: <strong style={{ color: 'var(--theme-secondary)' }}>{log.checkIn}</strong></span>
                          <span>Out: <strong style={{ color: 'var(--theme-primary)' }}>{log.checkOut}</strong></span>
                        </div>
                        <span
                          style={{
                            background: log.status === 'present' ? 'rgba(0,255,0,0.15)' : 'rgba(255,255,0,0.15)',
                            color: log.status === 'present' ? '#55ff55' : '#ffff55',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                          }}
                        >
                          {log.status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'leave' && (
            /* --- LEAVE PORTAL TAB VIEW --- */
            <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.6rem)' }}>
                  Leave Management
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)', fontFamily: 'monospace' }}>
                  LEAVE_STREAM
                </span>
              </div>

              {/* 1. Quick Stats Overview Bar */}
              <div className="hrms-leave-stats-grid">
                <div className="glass-panel hrms-leave-stat-card">
                  <div className="hrms-leave-stat-icon" style={{ background: 'rgba(var(--theme-primary-rgb), 0.15)', color: 'var(--theme-primary)' }}>
                    <Calendar size={18} />
                  </div>
                  <div className="hrms-leave-stat-details">
                    <span className="hrms-leave-stat-val">{leaveDaysLeft} Days</span>
                    <span className="hrms-leave-stat-lbl">Days Available</span>
                  </div>
                </div>

                <div className="glass-panel hrms-leave-stat-card">
                  <div className="hrms-leave-stat-icon" style={{ background: 'rgba(255, 153, 0, 0.15)', color: 'var(--theme-secondary)' }}>
                    <Clock size={18} />
                  </div>
                  <div className="hrms-leave-stat-details">
                    <span className="hrms-leave-stat-val" style={{ color: 'var(--theme-secondary)' }}>
                      {leaveRequests.filter(r => r.status === 'APPROVED').reduce((acc, curr) => acc + curr.days, 0)} Days
                    </span>
                    <span className="hrms-leave-stat-lbl">Utilized This Term</span>
                  </div>
                </div>

                <div className="glass-panel hrms-leave-stat-card">
                  <div className="hrms-leave-stat-icon" style={{ background: 'rgba(255, 42, 75, 0.15)', color: 'var(--theme-accent)' }}>
                    <AlertCircle size={18} />
                  </div>
                  <div className="hrms-leave-stat-details">
                    <span className="hrms-leave-stat-val" style={{ color: 'var(--theme-accent)' }}>
                      {leaveRequests.filter(r => r.status === 'PENDING').length}
                    </span>
                    <span className="hrms-leave-stat-lbl">Pending Review</span>
                  </div>
                </div>
              </div>

              {/* 2. Responsive Dual Layout (Form + Active Records) */}
              <div className="hrms-leave-layout">
                {/* Leave planner submit form */}
                <div className="glass-panel hrms-card-panel">
                  <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px' }}>
                    File Request
                  </h3>
                  <form onSubmit={handleLeaveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.78rem', color: 'var(--theme-text-muted)', fontWeight: 600 }}>Leave Classification</label>
                      <select
                        value={newLeave.type}
                        onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                        className="glass-input"
                      >
                        <option value="Annual Leave">Annual Leave (Paid Vacation)</option>
                        <option value="Medical Leave">Medical Leave (Sick Time)</option>
                        <option value="Casual Leave">Casual Leave (Short Personal)</option>
                      </select>
                    </div>

                    <div className="hrms-date-inputs">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: 'var(--theme-text-muted)', fontWeight: 600 }}>From Date</label>
                        <input
                          type="date"
                          value={newLeave.start}
                          onChange={(e) => setNewLeave({ ...newLeave, start: e.target.value })}
                          className="glass-input"
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                        <label style={{ fontSize: '0.78rem', color: 'var(--theme-text-muted)', fontWeight: 600 }}>To Date</label>
                        <input
                          type="date"
                          value={newLeave.end}
                          onChange={(e) => setNewLeave({ ...newLeave, end: e.target.value })}
                          className="glass-input"
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '0.78rem', color: 'var(--theme-text-muted)', fontWeight: 600 }}>Reason for Absence</label>
                      <input
                        type="text"
                        value={newLeave.reason}
                        onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                        className="glass-input"
                        placeholder="State reason or coverage details..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '13px',
                        width: '100%',
                        marginTop: '4px',
                      }}
                    >
                      <Send size={15} />
                      <span>Submit Leave Request</span>
                    </button>
                  </form>
                </div>

                {/* Leaves Table view */}
                <div className="glass-panel hrms-card-panel">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '6px' }}>
                    <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.1rem' }}>
                      Active Records
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '8px' }}>
                      {leaveRequests.length} Total Logs
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {leaveRequests.map((req) => (
                      <div key={req.id} className="hrms-record-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#ffffff' }}>{req.type}</span>
                          <span
                            style={{
                              background:
                                req.status === 'APPROVED'
                                  ? 'rgba(0,255,0,0.15)'
                                  : req.status === 'PENDING'
                                  ? 'rgba(255,170,0,0.18)'
                                  : 'rgba(255,0,0,0.15)',
                              color:
                                req.status === 'APPROVED'
                                  ? '#55ff55'
                                  : req.status === 'PENDING'
                                  ? '#ffc400'
                                  : '#ff5555',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              letterSpacing: '0.02em',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            {req.status === 'APPROVED' && <Check size={11} />}
                            {req.status === 'PENDING' && <Clock size={11} />}
                            {req.status}
                          </span>
                        </div>
                        <div style={{ color: 'var(--theme-text-muted)', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={13} style={{ opacity: 0.8 }} />
                          <span>
                            {req.start} &rarr; {req.end} ({req.days} {req.days === 1 ? 'day' : 'days'})
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--theme-text)', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '8px', marginTop: '2px' }}>
                          <span style={{ color: 'var(--theme-secondary)', fontWeight: 600, marginRight: '4px' }}>Reason:</span>
                          {req.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'performance' && (
            /* --- PERFORMANCE CENTER VIEW (SVG CHARTS) --- */
            <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.6rem)' }}>
                  Performance Ratings
                </h2>
                <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)', fontFamily: 'monospace' }}>
                  PERFORMANCE_ANALYTICS
                </span>
              </div>

              {/* Custom SVG Line Chart */}
              <div className="glass-panel hrms-card-panel">
                <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '20px' }}>
                  Monthly Review Rating Trend (Jan - Jun)
                </h3>

                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                  <svg viewBox="0 0 500 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                    <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                    <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                    <path
                      d="M 10,140 Q 110,120 210,70 T 410,20 L 490,40"
                      fill="none"
                      stroke="var(--theme-primary)"
                      strokeWidth="3"
                      style={{ filter: 'drop-shadow(var(--theme-glow))' }}
                    />

                    {[
                      { x: 10, y: 140, label: 'Jan' },
                      { x: 110, y: 120, label: 'Feb' },
                      { x: 210, y: 70, label: 'Mar' },
                      { x: 310, y: 30, label: 'Apr' },
                      { x: 410, y: 20, label: 'May' },
                      { x: 490, y: 40, label: 'Jun' },
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="5" fill="var(--theme-secondary)" />
                        <text x={pt.x} y={pt.y - 12} fill="var(--theme-text-muted)" fontSize="8" textAnchor="middle" fontFamily="monospace">
                          {pt.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Reviews Summary */}
              <div className="glass-panel hrms-card-panel">
                <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '14px' }}>
                  Review Comments
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--theme-primary)',
                        flexShrink: 0,
                      }}
                    >
                      <AlertCircle size={14} />
                    </div>
                    <div>
                      <span style={{ fontWeight: 700, display: 'block' }}>Q2 Executive Review Outcome</span>
                      <p style={{ color: 'var(--theme-text-muted)', marginTop: '4px', lineHeight: '1.5' }}>
                        Saim Raza's leadership of the intelligent product portfolio expanded operational pipelines successfully. Her zero-defect milestone scores represent high stability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
