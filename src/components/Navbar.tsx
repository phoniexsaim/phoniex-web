import React, { useState, useEffect } from 'react';
import { Menu, X, Flame, Zap, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'inferno-core' | 'solar-flare' | 'molten-ember'>('inferno-core');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeTheme = (theme: 'inferno-core' | 'solar-flare' | 'molten-ember') => {
    setActiveTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
    { id: 'hrms', label: 'HRMS Platform' },
  ];

  return (
    <nav
      className="glass-panel"
      style={{
        position: 'fixed',
        top: scrolled ? '15px' : '25px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: scrolled ? '92%' : '95%',
        maxWidth: '1200px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '8px 24px' : '12px 28px',
        borderRadius: '24px',
        transition: 'var(--transition-smooth)',
        border: scrolled ? '1px solid var(--theme-border-active)' : '1px solid var(--theme-border)',
        boxShadow: scrolled ? 'var(--theme-glow), 0 10px 30px rgba(0,0,0,0.45)' : '0 8px 30px rgba(0,0,0,0.35)',
      }}
    >
      {/* Dynamic Brand Logo */}
      <div
        className="brand-logo"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          fontFamily: 'var(--font-title)',
          fontWeight: 800,
          fontSize: '1.45rem',
          letterSpacing: '-0.03em',
        }}
        onClick={() => setTab('home')}
      >
        <img
          src="/phoniex-logo-transparent.png"
          alt="Phoniex Logo"
          style={{
            height: scrolled ? '50px' : '58px',
            width: 'auto',
            maxHeight: '62px',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 0 16px rgba(var(--theme-primary-rgb), 0.65)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))',
            transition: 'var(--transition-fast)',
          }}
        />
      </div>

      {/* Desktop Navigation Links with sliding background element */}
      <div
        className="desktop-links"
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '4px',
          position: 'relative',
          background: 'rgba(0,0,0,0.25)',
          padding: '4px',
          borderRadius: '14px',
          border: '1px solid rgba(255, 87, 34, 0.15)',
        }}
      >
        {navLinks.map((link) => {
          const isActive = currentTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setTab(link.id)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '10px',
                color: isActive ? '#ffffff' : 'var(--theme-text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {link.label}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(var(--theme-primary-rgb), 0.35) 0%, rgba(255, 170, 0, 0.2) 100%)',
                    border: '1px solid var(--theme-border-active)',
                    borderRadius: '10px',
                    zIndex: -1,
                    boxShadow: 'inset 0 0 15px rgba(var(--theme-primary-rgb), 0.25), 0 0 15px rgba(var(--theme-primary-rgb), 0.2)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Theme Switcher and Burger Button controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* Sleek Fire Theme Selector */}
        <div
          className="theme-selector"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0,0,0,0.3)',
            padding: '5px 10px',
            borderRadius: '16px',
            border: '1px solid var(--theme-border)',
          }}
        >
          <button
            onClick={() => changeTheme('inferno-core')}
            title="Inferno Core (Dark Fire Flagship)"
            style={{
              background: activeTheme === 'inferno-core' ? 'linear-gradient(135deg, #ff4d15, #ff9900)' : 'transparent',
              border: activeTheme === 'inferno-core' ? '1px solid rgba(255, 200, 100, 0.5)' : 'none',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: activeTheme === 'inferno-core' ? '0 0 12px rgba(255, 77, 21, 0.65)' : 'none',
              transition: 'var(--transition-fast)',
            }}
          >
            <Flame size={13} />
          </button>
          <button
            onClick={() => changeTheme('solar-flare')}
            title="Solar Flare (High-Energy Magma)"
            style={{
              background: activeTheme === 'solar-flare' ? 'linear-gradient(135deg, #ff7300, #ffc400)' : 'transparent',
              border: activeTheme === 'solar-flare' ? '1px solid rgba(255, 220, 120, 0.5)' : 'none',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: activeTheme === 'solar-flare' ? '0 0 12px rgba(255, 115, 0, 0.65)' : 'none',
              transition: 'var(--transition-fast)',
            }}
          >
            <Zap size={13} />
          </button>
          <button
            onClick={() => changeTheme('molten-ember')}
            title="Molten Ember (Deep Volcanic Crimson)"
            style={{
              background: activeTheme === 'molten-ember' ? 'linear-gradient(135deg, #ff284d, #ff8800)' : 'transparent',
              border: activeTheme === 'molten-ember' ? '1px solid rgba(255, 150, 150, 0.5)' : 'none',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: activeTheme === 'molten-ember' ? '0 0 12px rgba(255, 40, 77, 0.65)' : 'none',
              transition: 'var(--transition-fast)',
            }}
          >
            <Sparkles size={13} />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--theme-border)',
            borderRadius: '10px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Styled Responsive Overlay Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: 'calc(100% + 15px)',
            left: 0,
            width: '100%',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            zIndex: 90,
            borderRadius: '24px',
            border: '1px solid var(--theme-border-active)',
            animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setTab(link.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(var(--theme-primary-rgb), 0.25) 0%, rgba(255, 170, 0, 0.15) 100%)' : 'transparent',
                  border: isActive ? '1px solid var(--theme-border-active)' : 'none',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  color: isActive ? '#ffffff' : 'var(--theme-text-muted)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'var(--transition-fast)',
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Inject styling rules directly to handle responsive CSS query rules simply */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-links {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }

        @media (max-width: 600px) {
          nav.glass-panel {
            padding: 8px 12px !important;
            width: 95% !important;
            top: 10px !important;
            border-radius: 18px !important;
          }
          .brand-logo img {
            height: 40px !important;
            max-height: 42px !important;
          }
          .theme-selector {
            padding: 3px 6px !important;
            gap: 4px !important;
          }
          .theme-selector button {
            width: 22px !important;
            height: 22px !important;
          }
          .mobile-toggle {
            width: 36px !important;
            height: 36px !important;
          }
        }
      `}</style>
    </nav>
  );
};
