import React, { useState } from 'react';
import { Cpu, Terminal, Shield, Network, Zap, X, Globe, BarChart2 } from 'lucide-react';
import { ThreeDCard } from '../components/ThreeDCard';

export const Services: React.FC = () => {
  const serviceList = [
    {
      id: 'software',
      icon: <Terminal size={32} style={{ color: 'var(--theme-primary)' }} />,
      title: 'Custom Software Development',
      short: 'Hyper-performance engineering in Rust, Go, and TypeScript, tailoring secure microservice backends and interfaces.',
      features: [
        'Robust Event-Driven Microservices',
        'Secure REST, GraphQL & gRPC Aggregators',
        'Memory-optimized Systems (Rust/Go)',
        'Fluid, High-Fidelity Custom Web Interfaces',
      ],
      metric: '99.999% Service Uptime',
      tech: 'Go, Rust, TypeScript, gRPC',
    },
    {
      id: 'ai',
      icon: <Cpu size={32} style={{ color: 'var(--theme-secondary)' }} />,
      title: 'Artificial Intelligence Systems',
      short: 'Deploying neural cognitive automation networks, natural language processors, and predictive vision structures.',
      features: [
        'Cognitive LLM Aggregations',
        'Real-time Computer Vision Pipelines',
        'Predictive Asset & Load Analysis',
        'Deep Learning Model Training & Deployment',
      ],
      metric: '10x Faster Process Flow',
      tech: 'Python, PyTorch, HuggingFace',
    },
    {
      id: 'cloud',
      icon: <Network size={32} style={{ color: 'var(--theme-accent)' }} />,
      title: 'Cloud Infrastructure Scaling',
      short: 'Hardening resilient multi-cloud container hubs, orchestrating auto-scaling rules and zero-latency pipelines.',
      features: [
        'Kubernetes Cluster Orchestrations',
        'Infrastructure as Code (Terraform)',
        'CI/CD Lightning-Fast Deployment Pipelines',
        'Edge Network Cache Delivery Routing',
      ],
      metric: '4.2B Monthly Peak Requests',
      tech: 'AWS, GCP, Docker, K8s, Terraform',
    },
    {
      id: 'cyber',
      icon: <Shield size={32} style={{ color: 'var(--theme-accent)' }} />,
      title: 'Zero-Trust Cyber Defense',
      short: 'Securing structural assets under zero-trust authorization systems and strict token-encryption pipelines.',
      features: [
        'Continuous Intrusion Audits',
        'End-to-End Cryptography Schemes',
        'OAuth2 & OpenID Identity Governance',
        'Vulnerability Isolation Containments',
      ],
      metric: 'Zero Security Breaches',
      tech: 'OAuth, TLS 1.3, WireGuard',
    },
  ];

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const selectedService = serviceList.find((s) => s.id === selectedServiceId);

  return (
    <div className="fade-in-section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="glow-orb" style={{ top: '25%', left: '-10%' }} />
      <div className="glow-orb" style={{ bottom: '10%', right: '-10%', background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.12) 0%, transparent 60%)' }} />

      {/* Page Header */}
      <section style={{ textAlign: 'center', padding: '40px 0 60px 0' }}>
        <h1 style={{ fontFamily: 'var(--font-title)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.04em' }}>
          Intelligent Enterprise <br />
          <span className="gradient-text">Architectural Services</span>
        </h1>
        <p style={{ color: 'var(--theme-text-muted)', fontSize: '1.15rem', marginTop: '12px', maxWidth: '650px', margin: '12px auto 0 auto' }}>
          Explore our expert engineering practices designed to scale modern company networks smoothly.
        </p>
      </section>

      {/* Services Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', paddingBottom: '60px' }}>
        {serviceList.map((service) => (
          <ThreeDCard
            key={service.id}
            onClick={() => setSelectedServiceId(service.id)}
            style={{ padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--theme-border)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {service.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.01em' }}>
                {service.title}
              </h3>
              <p style={{ color: 'var(--theme-text-muted)', fontSize: '0.92rem', lineHeight: '1.5' }}>
                {service.short}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--theme-primary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                marginTop: '25px',
                cursor: 'pointer',
              }}
            >
              <span>Analyze Architecture</span>
              <Zap size={12} />
            </div>
          </ThreeDCard>
        ))}
      </section>

      {/* Deep-Dive Animated Interactive 3D Modal Overlay */}
      {selectedService && (
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
          onClick={() => setSelectedServiceId(null)}
        >
          <div
            className="glass-panel service-modal"
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
            onClick={(e) => e.stopPropagation()} // Stop closing on panel click
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedServiceId(null)}
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
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--theme-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--theme-border)')}
            >
              <X size={16} />
            </button>

            {/* Modal Contents */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--theme-border)',
                    width: '64px',
                    height: '64px',
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedService.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
                    {selectedService.title}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)', fontFamily: 'monospace' }}>
                    SERVICE_CLUSTER_ANALYSIS
                  </span>
                </div>
              </div>

              <p style={{ color: 'var(--theme-text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
                {selectedService.short}
              </p>

              {/* Bullet Features */}
              <div>
                <h4 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '12px' }}>
                  Architecture Deliverables:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {selectedService.features.map((feat, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                      <Globe size={14} style={{ color: 'var(--theme-secondary)' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra visual metadata and metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
                  gap: '16px',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid var(--theme-border)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  marginTop: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <BarChart2 size={24} style={{ color: 'var(--theme-primary)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)' }}>Target Outcome</span>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{selectedService.metric}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)' }}>Utilized Technologies</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.85rem', color: 'var(--theme-accent)' }}>
                    {selectedService.tech}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          .service-modal {
            padding: 24px 16px !important;
            max-height: 88vh !important;
            overflow-y: auto !important;
          }
        }
      `}</style>
    </div>
  );
};
