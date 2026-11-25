import React from 'react';
import { Shield, Globe, Terminal, Zap, Flame } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setTab }) => {
  return (
    <footer
      className="glass-panel"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '60px auto 0 auto',
        padding: '40px 30px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
        gap: '40px',
        border: '1px solid var(--theme-border)',
        borderRadius: '24px',
        backdropFilter: 'var(--glass-blur)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Brand Profile Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
          onClick={() => setTab('home')}
        >
          <img
            src="/phoniex-logo-transparent.png"
            alt="Phoniex Logo"
            style={{
              height: '52px',
              width: 'auto',
              maxHeight: '56px',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 0 16px rgba(var(--theme-primary-rgb), 0.6))',
              transition: 'all 0.2s ease',
            }}
          />
        </div>
        <p style={{ color: 'var(--theme-text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
          Forging high-performance digital ecosystems, artificial intelligence, and cloud scaling tools that propel global platforms forward.
        </p>
        {/* Dynamic Social Badges */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          {[
            { icon: <Globe size={16} />, label: 'Web Hub' },
            { icon: <Terminal size={16} />, label: 'Dev Stream' },
            { icon: <Zap size={16} />, label: 'Updates' },
          ].map((social, i) => (
            <button
              key={i}
              title={social.label}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--theme-border)',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--theme-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--theme-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--theme-border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {social.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Pages Shortcuts Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
          Explore System
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About Us' },
            { id: 'services', label: 'Our Services' },
            { id: 'portfolio', label: 'Project Portfolio' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => setTab(link.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--theme-text-muted)',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'var(--transition-fast)',
                width: 'fit-content',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--theme-secondary)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--theme-text-muted)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Security & Access Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
          Enterprise Area
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => setTab('hrms')}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--theme-border)',
              padding: '12px 18px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              width: '100%',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--theme-primary)';
              e.currentTarget.style.background = 'rgba(var(--theme-primary-rgb), 0.12)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(var(--theme-primary-rgb), 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--theme-border)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Shield size={16} style={{ color: 'var(--theme-secondary)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>HRMS Login Portal</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)' }}>Secure Employee Workspace</span>
            </div>
          </button>
          <span style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)' }}>
            System protected by enterprise end-to-end encryption pipelines.
          </span>
        </div>
      </div>

      {/* Full horizontal line & legal signature */}
      <div
        style={{
          gridColumn: '1 / -1',
          borderTop: '1px solid var(--theme-border)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          fontSize: '0.8rem',
          color: 'var(--theme-text-muted)',
        }}
      >
        <span>&copy; {new Date().getFullYear()} Phoniex Technologies. All rights reserved.</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Flame size={12} style={{ color: 'var(--theme-primary)' }} />
          <span>Ignite Core Architecture v4.2</span>
        </div>
      </div>
    </footer>
  );
};
