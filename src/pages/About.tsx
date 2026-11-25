import React, { useState } from 'react';
import { Calendar, Award, Rocket, Target, Users } from 'lucide-react';
import { ThreeDCard } from '../components/ThreeDCard';

export const About: React.FC = () => {
  const timelineData = [
    {
      year: '2021',
      title: 'Phoniex Genesis',
      icon: <Rocket size={18} />,
      desc: 'Three cloud architects merge forces in a physical lab to build scalable, microservices infrastructure solutions.',
    },
    {
      year: '2023',
      title: 'AI Paradigm Shift',
      icon: <Award size={18} />,
      desc: 'Integrating real-time neural cognitive pipelines and automated workflow bots, doubling product efficiency pipelines.',
    },
    {
      year: '2025',
      title: 'Hyper-Scale Horizon',
      icon: <Users size={18} />,
      desc: 'Reaching 50+ enterprise integrations. Our server networks process peak operational counts of 4.2 billion requests monthly.',
    },
    {
      year: '2026',
      title: 'Quantum Portal Release',
      icon: <Target size={18} />,
      desc: 'Introducing our advanced, highly protected HRMS platform portal, securing team operations on zero-trust architectures.',
    },
  ];

  const [activeYearIndex, setActiveYearIndex] = useState(3); // Default to current year

  const teamMembers = [
    {
      name: 'Saim Raza',
      role: 'CEO And Founder',
      bio: 'Ex-DeepMind core researcher. Evelyn designs our high-concurrency neural processing networks and learning structures.',
      avatar: '/evelyn_avatar.png',
    },
    {
      name: 'XYZ',
      role: 'Manager',
      bio: 'Loves building hyper-concurrent Rust service layers. Marcus hardens our multi-cloud deployment clusters.',
      avatar: '/marcus_avatar.png',
    },
    {
      name: 'QZZ',
      role: 'Senior Technical Consultant',
      bio: 'Aria believes that software should look state-of-the-art. She governs all visual layouts and glassmorphic designs.',
      avatar: '/aria_avatar.png',
    },
  ];

  return (
    <div className="fade-in-section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="glow-orb" style={{ top: '10%', right: '5%', background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.12) 0%, transparent 65%)' }} />
      <div className="glow-orb" style={{ bottom: '15%', left: '5%' }} />

      {/* 1. Page Header */}
      <section style={{ textAlign: 'center', padding: '40px 0 60px 0' }}>
        <h1 style={{ fontFamily: 'var(--font-title)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.04em' }}>
          Forging the Future <br />
          <span className="gradient-text">Of Software Architecture</span>
        </h1>
        <p style={{ color: 'var(--theme-text-muted)', fontSize: '1.15rem', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0 auto' }}>
          We are a team of visionary engineers, digital artists, and systems architects dedicated to crafting hyper-scalable tools.
        </p>
      </section>

      {/* 2. Interactive Chronological 3D Timeline */}
      <section style={{ padding: '40px 0 80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.02em' }}>
            Interactive Company <span className="gradient-text">Timeline</span>
          </h2>
          <p style={{ color: 'var(--theme-text-muted)', fontSize: '0.95rem', marginTop: '5px' }}>
            Click on the chronometers to traverse our key milestone achievements.
          </p>
        </div>

        {/* Timeline selector bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto 60px auto',
            padding: '0 20px',
          }}
        >
          {/* Horizontal Connector Line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '40px',
              right: '40px',
              height: '3px',
              background: 'rgba(255,255,255,0.06)',
              zIndex: 1,
            }}
          />
          {/* Active indicator progress fill */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '40px',
              width: `${(activeYearIndex / (timelineData.length - 1)) * 90}%`,
              height: '3px',
              background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
              zIndex: 1,
              transition: 'var(--transition-smooth)',
            }}
          />

          {timelineData.map((data, idx) => {
            const isActive = activeYearIndex === idx;
            return (
              <button
                key={idx}
                className="timeline-btn"
                onClick={() => setActiveYearIndex(idx)}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--theme-primary)' : 'var(--theme-solid-bg)',
                  border: isActive ? '3px solid var(--theme-secondary)' : '2px solid var(--theme-border)',
                  color: isActive ? '#ffffff' : 'var(--theme-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2,
                  boxShadow: isActive ? 'var(--theme-glow)' : 'none',
                  transition: 'var(--transition-smooth)',
                  position: 'relative',
                }}
              >
                {data.icon}
                <span
                  className="timeline-year"
                  style={{
                    position: 'absolute',
                    top: '65px',
                    fontFamily: 'var(--font-title)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: isActive ? 'var(--theme-secondary)' : 'var(--theme-text-muted)',
                  }}
                >
                  {data.year}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Interactive Panel Card */}
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <ThreeDCard className="milestone-card" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--theme-secondary)' }}>
                <Calendar size={18} />
                <span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.9rem' }}>
                  Milestone - {timelineData[activeYearIndex].year}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-title)',
                  fontWeight: 800,
                  fontSize: '1.6rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {timelineData[activeYearIndex].title}
              </h3>
              <p style={{ color: 'var(--theme-text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                {timelineData[activeYearIndex].desc}
              </p>
            </div>
          </ThreeDCard>
        </div>
      </section>

      {/* 3. Team Member Interactive Grid */}
      <section style={{ padding: '40px 0 80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.02em' }}>
            Visionary <span className="gradient-text">Leadership</span>
          </h2>
          <p style={{ color: 'var(--theme-text-muted)', fontSize: '0.95rem', marginTop: '5px' }}>
            The senior innovators pioneering Phoniex products.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {teamMembers.map((member, i) => (
            <ThreeDCard key={i} style={{ padding: '30px', height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Visual Bio Avatar */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--theme-border)',
                    width: '75px',
                    height: '75px',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.2rem',
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                  }}
                >
                  {member.avatar.startsWith('/') ? (
                    <img src={member.avatar} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    member.avatar
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.01em' }}>
                    {member.name}
                  </h3>
                  <span style={{ color: 'var(--theme-secondary)', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'monospace' }}>
                    {member.role.toUpperCase()}
                  </span>
                </div>

                <p style={{ color: 'var(--theme-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {member.bio}
                </p>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .timeline-btn {
            width: 44px !important;
            height: 44px !important;
          }
          .timeline-year {
            top: 50px !important;
            font-size: 0.85rem !important;
          }
          .milestone-card {
            padding: 22px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};
