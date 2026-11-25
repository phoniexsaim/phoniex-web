import React, { useState } from 'react';
import { Layers, Cpu, Network, Smartphone, Eye, CheckCircle } from 'lucide-react';
import { ThreeDCard } from '../components/ThreeDCard';

export const Portfolio: React.FC = () => {
  const projects = [
    {
      id: 'quantum-db',
      title: 'Quantum Ledger Cloud',
      category: 'cloud',
      tech: 'Go, Kubernetes, AWS',
      summary: 'Re-engineering backend datastores to guarantee micro-second concurrent ledger records.',
      client: 'Vanguard Systems',
      metrics: '4.2B requests/mo capacity',
      icon: <Network size={20} />,
      details: 'We designed a custom micro-ledger engine utilizing distributed raft-consensus layers, reducing transaction write latencies by 62% across international bank nodes.',
    },
    {
      id: 'neural-flow',
      title: 'Neural Flow Automations',
      category: 'ai',
      tech: 'Python, PyTorch, FastAPI',
      summary: 'Deep-learning visual model pipeline that automatically tracks assembly faults.',
      client: 'Apex Manufactures',
      metrics: '99.8% precision rate',
      icon: <Cpu size={20} />,
      details: 'By training custom vision transformer networks to isolate surface fractures under high speed conveyor cameras, we eliminated manual inspections for over 800 operational product lines.',
    },
    {
      id: 'aether-core-hrms',
      title: 'Intelligent HRMS Hub',
      category: 'web',
      tech: 'React, TypeScript, HSL',
      summary: 'A secure glassmorphic workspace dashboard monitoring organizational KPI indicators.',
      client: 'Phoniex Internal Systems',
      metrics: 'Zero security breaches',
      icon: <Layers size={20} />,
      details: 'Creating a high-fidelity workspace dashboard equipped with clock trackers, interactive leaves panels, and custom SVG line KPIs.',
    },
    {
      id: 'aurora-pay',
      title: 'Aurora Payment App',
      category: 'mobile',
      tech: 'React Native, Node, TLS',
      summary: 'A fully animated biometrically protected mobile ledger wallet.',
      client: 'Aurora Finance',
      metrics: '1.2M active wallets',
      icon: <Smartphone size={20} />,
      details: 'We built a secure biometric verification flow with multi-party signature protocols. The application provides smooth visual micro-charts.',
    },
    {
      id: 'solaris-iot',
      title: 'Solaris IoT Grid',
      category: 'cloud',
      tech: 'Rust, WebSockets, Docker',
      summary: 'Hyper-concurrent data aggregator reading solar output sensors.',
      client: 'Helios Power Corp',
      metrics: '1.5M events/sec ingestion',
      icon: <Network size={20} />,
      details: 'A Rust-based event streaming server executing directly on solar array hubs, providing real-time tracking of battery temperatures and currents.',
    },
  ];

  const [filter, setFilter] = useState<'all' | 'ai' | 'web' | 'cloud' | 'mobile'>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="fade-in-section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="glow-orb" style={{ top: '15%', right: '-10%' }} />
      <div className="glow-orb" style={{ bottom: '15%', left: '-10%', background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.12) 0%, transparent 60%)' }} />

      {/* Page Header */}
      <section style={{ textAlign: 'center', padding: '40px 0 60px 0' }}>
        <h1 style={{ fontFamily: 'var(--font-title)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.04em' }}>
          Our Engineering <br />
          <span className="gradient-text">Case Studies Portfolio</span>
        </h1>
        <p style={{ color: 'var(--theme-text-muted)', fontSize: '1.15rem', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0 auto' }}>
          Explore our real-world custom implementations engineered to solve complex operational limits.
        </p>
      </section>

      {/* Interactive Category Filters */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '40px',
          background: 'rgba(0,0,0,0.12)',
          padding: '6px',
          borderRadius: '16px',
          width: 'fit-content',
          margin: '0 auto 40px auto',
          border: '1px solid var(--theme-border)',
        }}
      >
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'ai', label: 'AI Products' },
          { id: 'web', label: 'Web Systems' },
          { id: 'cloud', label: 'Cloud Systems' },
          { id: 'mobile', label: 'Mobile Apps' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id as any)}
            style={{
              background: filter === btn.id ? 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' : 'transparent',
              border: filter === btn.id ? '1px solid rgba(255, 220, 150, 0.4)' : '1px solid transparent',
              padding: '8px 18px',
              borderRadius: '12px',
              fontWeight: 600,
              color: filter === btn.id ? '#ffffff' : 'var(--theme-text-muted)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: filter === btn.id ? '0 4px 16px rgba(var(--theme-primary-rgb), 0.45)' : 'none',
              transition: 'var(--transition-fast)',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Case Studies Grid Layout */}
      <section className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '26px', paddingBottom: '60px' }}>
        {filteredProjects.map((project) => (
          <ThreeDCard
            key={project.id}
            onClick={() => setSelectedProjectId(project.id)}
            style={{ padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--theme-border)',
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--theme-secondary)',
                  }}
                >
                  {project.icon}
                </div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--theme-text-muted)' }}>
                  {project.category.toUpperCase()}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.01em' }}>
                {project.title}
              </h3>

              <p style={{ color: 'var(--theme-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {project.summary}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '25px' }}>
              <div style={{ height: '1px', background: 'var(--theme-border)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--theme-text-muted)' }}>{project.tech}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--theme-primary)', fontWeight: 600 }}>
                  <span>View Case</span>
                  <Eye size={12} />
                </div>
              </div>
            </div>
          </ThreeDCard>
        ))}
      </section>

      {/* Selected Case Preview Interactive Overlay */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px',
            animation: 'fadeIn 0.3s forwards',
          }}
          onClick={() => setSelectedProjectId(null)}
        >
          <div
            className="glass-panel portfolio-modal"
            style={{
              width: '100%',
              maxWidth: '650px',
              padding: '36px',
              border: '1px solid var(--theme-border-active)',
              boxShadow: 'var(--theme-glow), 0 25px 50px rgba(0,0,0,0.4)',
              transformStyle: 'preserve-3d',
              position: 'relative',
              animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProjectId(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--theme-border)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Eye size={16} />
            </button>

            {/* Case Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--theme-border)',
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--theme-secondary)',
                  }}
                >
                  {selectedProject.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.45rem', letterSpacing: '-0.02em' }}>
                    {selectedProject.title}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)', fontFamily: 'monospace' }}>
                    CASE_BREAKDOWN // CLIENT: {selectedProject.client.toUpperCase()}
                  </span>
                </div>
              </div>

              <div style={{ color: 'var(--theme-text-muted)', fontSize: '0.98rem', lineHeight: '1.6' }}>
                <h4 style={{ fontFamily: 'var(--font-title)', color: '#fff', fontSize: '1.1rem', marginBottom: '8px' }}>
                  Operational Impact
                </h4>
                {selectedProject.details}
              </div>

              {/* Verified Metrics Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid var(--theme-border)',
                  borderRadius: '12px',
                  padding: '12px 20px',
                }}
              >
                <CheckCircle size={20} style={{ color: 'var(--theme-primary)' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)' }}>Verified Outcome</span>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                    {selectedProject.metrics}
                  </span>
                </div>
              </div>

              {/* Systems Tech list */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--theme-text-muted)' }}>
                  Technologies Integrated: <strong style={{ color: 'var(--theme-accent)' }}>{selectedProject.tech}</strong>
                </span>
                <span style={{ fontFamily: 'monospace', color: 'var(--theme-secondary)', fontSize: '0.8rem' }}>
                  Phoniex_SECURE_VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          .portfolio-modal {
            padding: 24px 16px !important;
            max-height: 88vh !important;
            overflow-y: auto !important;
          }
        }
      `}</style>
    </div>
  );
};
