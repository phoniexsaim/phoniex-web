import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Sparkles, Layers, ArrowUpRight, Flame } from 'lucide-react';
import { ThreeDCard } from '../components/ThreeDCard';

interface HomeProps {
  setTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setTab }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Custom Software. Intelligent AI. Cloud Scaling.';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 85);
    return () => clearInterval(interval);
  }, []);

  const coreValues = [
    {
      icon: <Layers size={32} style={{ color: 'var(--theme-primary)' }} />,
      title: 'Scale-First Design',
      description: 'Engineering resilient, highly concurrent systems capable of processing millions of requests without friction.',
    },
    {
      icon: <Sparkles size={32} style={{ color: 'var(--theme-secondary)' }} />,
      title: 'Artificial Intelligence',
      description: 'Integrating deep learning, computer vision, and cognitive automation straight into core workflow processes.',
    },
    {
      icon: <Shield size={32} style={{ color: 'var(--theme-accent)' }} />,
      title: 'Cyber Immunity',
      description: 'Hardening cloud networks with zero-trust architectural systems, keeping sensitive intellectual assets secure.',
    },
  ];

  const technologies = [
    { name: 'TypeScript', cat: 'lang', desc: 'Secure web typing workflows.' },
    { name: 'Rust', cat: 'lang', desc: 'Hyper-performance memory systems.' },
    { name: 'Go', cat: 'lang', desc: 'Highly concurrent service backbones.' },
    { name: 'Python', cat: 'lang', desc: 'Advanced artificial intellect models.' },
    { name: 'React', cat: 'framework', desc: 'Immersive dynamic frontend systems.' },
    { name: 'Next.js', cat: 'framework', desc: 'Premium SEO server compilation.' },
    { name: 'GraphQL', cat: 'framework', desc: 'Sleek query aggregation layers.' },
    { name: 'Docker', cat: 'cloud', desc: 'Microservice modular containers.' },
    { name: 'Kubernetes', cat: 'cloud', desc: 'Orchestrating auto-scaling clusters.' },
    { name: 'AWS & GCP', cat: 'cloud', desc: 'Resilient multi-cloud grids.' },
    { name: 'PostgreSQL', cat: 'data', desc: 'Relational data stability.' },
    { name: 'PyTorch', cat: 'data', desc: 'Neural network model development.' },
  ];

  const [techFilter, setTechFilter] = useState<'all' | 'lang' | 'framework' | 'cloud' | 'data'>('all');

  const filteredTechs = techFilter === 'all'
    ? technologies
    : technologies.filter((t) => t.cat === techFilter);

  return (
    <div className="fade-in-section" style={{ position: 'relative', zIndex: 2 }}>
      {/* 1. Large Ambient Glow Orbs */}
      <div className="glow-orb" style={{ top: '-10%', left: '5%' }} />
      <div
        className="glow-orb"
        style={{
          top: '35%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.16) 0%, transparent 60%)',
        }}
      />

      {/* 2. Hero Interactive Module with Balanced Responsive Grid */}
      <section
        className="hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: '40px',
          alignItems: 'center',
          minHeight: 'calc(100vh - 170px)',
          padding: '15px 0 50px 0',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Top glowing tech pill tag */}
          <div
            style={{
              alignSelf: 'flex-start',
              background: 'linear-gradient(135deg, rgba(var(--theme-primary-rgb), 0.16) 0%, rgba(255,170,0,0.08) 100%)',
              border: '1px solid var(--theme-border-active)',
              borderRadius: '30px',
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              boxShadow: '0 0 15px rgba(var(--theme-primary-rgb), 0.2)',
            }}
          >
            <Flame size={14} style={{ color: 'var(--theme-primary)' }} className="fire-icon-pulse" />
            <span style={{ color: 'var(--theme-secondary)', letterSpacing: '0.02em' }}>
              Ignite Core v4.2 • Fire Architecture Active
            </span>
          </div>

          {/* Main header title with calibrated typography */}
          <h1
            style={{
              fontFamily: 'var(--font-title)',
              fontWeight: 900,
              fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            Architecting <br />
            <span className="gradient-text">Next-Generation</span> <br />
            Digital Ecosystems
          </h1>

          {/* Typewriter Hook text */}
          <p
            style={{
              fontSize: '1.15rem',
              fontFamily: 'var(--font-title)',
              color: 'var(--theme-text)',
              minHeight: '26px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              margin: 0,
            }}
          >
            <span>{typedText}</span>
            <span
              style={{
                width: '2px',
                height: '20px',
                background: 'var(--theme-secondary)',
                animation: 'pulseGlow 1s infinite',
              }}
            />
          </p>

          <p
            style={{
              color: 'var(--theme-text-muted)',
              fontSize: '1.02rem',
              lineHeight: '1.6',
              maxWidth: '540px',
              margin: 0,
            }}
          >
            We forge hyper-scalable enterprise tools, artificial intelligence modules, and integrated cloud infrastructures that empower business platforms globally.
          </p>

          {/* Core Call to Actions */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '6px' }}>
            <button className="btn-primary" onClick={() => setTab('contact')}>
              <Flame size={18} /> Initiate Project <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => setTab('services')}>
              Explore Services
            </button>
          </div>
        </div>

        {/* Hero Interactive 3D Graphic with Matching Fire Theme Image */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ThreeDCard
            className="animate-float"
            style={{
              width: '100%',
              maxWidth: '440px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--theme-glow)',
            }}
          >
            {/* Holographic grid visual card header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'var(--theme-primary)',
                    boxShadow: '0 0 10px var(--theme-primary)',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    color: 'var(--theme-secondary)',
                  }}
                >
                  PHONIEX_NEXUS_ONLINE
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  color: 'var(--theme-text-muted)',
                }}
              >
                0.8ms LATENCY
              </span>
            </div>

            {/* Generated Fiery Phoenix Hero Image */}
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--theme-border-active)',
                height: '240px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
              }}
            >
              <img
                src="/phoniex_hero_core.png"
                alt="Phoniex Fire Core"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Overlay visual glass fire scanner */}
              <div className="fire-scanner" />
            </div>

            {/* Card Footer status info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-title)',
                  }}
                >
                  Phoniex Engine v4.0
                </span>
                <span className="fire-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  ZERO-TRUST
                </span>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--theme-text-muted)', lineHeight: '1.4' }}>
                Integrated zero-latency cloud neural aggregations.
              </span>
            </div>
          </ThreeDCard>
        </div>
      </section>

      {/* 3. Core Values Grid with Balanced Alignment */}
      <section style={{ padding: '60px 0 80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div className="fire-badge" style={{ marginBottom: '12px' }}>
            Operational Pillars
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-title)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
              letterSpacing: '-0.03em',
              margin: '0 0 10px 0',
            }}
          >
            Our Operational <span className="gradient-text">Core Values</span>
          </h2>
          <p
            style={{
              color: 'var(--theme-text-muted)',
              fontSize: '1.02rem',
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            The structural pillars that govern how we formulate software architecture.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {coreValues.map((value, idx) => (
            <ThreeDCard key={idx} style={{ padding: '30px', height: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                  height: '100%',
                  justifyContent: 'flex-start',
                }}
              >
                <div
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--theme-border-active)',
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(var(--theme-primary-rgb), 0.15)',
                  }}
                >
                  {value.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-title)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    margin: 0,
                  }}
                >
                  {value.title}
                </h3>
                <p
                  style={{
                    color: 'var(--theme-text-muted)',
                    fontSize: '0.94rem',
                    lineHeight: '1.6',
                    margin: 0,
                  }}
                >
                  {value.description}
                </p>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </section>

      {/* 4. Tech Stack Showcase Section with Uniform Grid */}
      <section style={{ padding: '20px 0 80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div className="fire-badge" style={{ marginBottom: '12px' }}>
            Technology Matrix
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-title)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
              letterSpacing: '-0.03em',
              margin: '0 0 10px 0',
            }}
          >
            Our Intelligent <span className="gradient-text">Tech Stack</span>
          </h2>
          <p
            style={{
              color: 'var(--theme-text-muted)',
              fontSize: '1.02rem',
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            Utilizing reliable, next-generation frameworks to power secure systems.
          </p>
        </div>

        {/* Tech Stack Filters controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            background: 'rgba(0,0,0,0.25)',
            padding: '6px',
            borderRadius: '16px',
            width: 'fit-content',
            margin: '0 auto 35px auto',
            border: '1px solid var(--theme-border)',
          }}
        >
          {[
            { id: 'all', label: 'All Stack' },
            { id: 'lang', label: 'Languages' },
            { id: 'framework', label: 'Frameworks' },
            { id: 'cloud', label: 'Cloud Clusters' },
            { id: 'data', label: 'Data & AI' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setTechFilter(btn.id as any)}
              style={{
                background:
                  techFilter === btn.id
                    ? 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))'
                    : 'transparent',
                border:
                  techFilter === btn.id
                    ? '1px solid rgba(255, 220, 150, 0.4)'
                    : '1px solid transparent',
                padding: '8px 18px',
                borderRadius: '12px',
                fontWeight: 600,
                color: techFilter === btn.id ? '#ffffff' : 'var(--theme-text-muted)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow:
                  techFilter === btn.id
                    ? '0 4px 16px rgba(var(--theme-primary-rgb), 0.45)'
                    : 'none',
                transition: 'var(--transition-fast)',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Technologies Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))',
            gap: '20px',
          }}
        >
          {filteredTechs.map((tech, i) => (
            <div
              key={i}
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: '16px',
                transition: 'var(--transition-fast)',
                border: '1px solid var(--theme-border)',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '140px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--theme-border-active)';
                e.currentTarget.style.boxShadow = 'var(--theme-glow)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--theme-border)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-title)',
                  }}
                >
                  {tech.name}
                </span>
                <ArrowUpRight
                  size={16}
                  style={{ color: 'var(--theme-secondary)', opacity: 0.8 }}
                />
              </div>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--theme-text-muted)',
                  lineHeight: '1.4',
                }}
              >
                {tech.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding-top: 10px !important;
          }
        }
      `}</style>
    </div>
  );
};
