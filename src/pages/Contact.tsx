import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, SendToBack, Check, AlertCircle } from 'lucide-react';
import { ThreeDCard } from '../components/ThreeDCard';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'folding' | 'flying' | 'submitted'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setErrorMessage('');
    // Start envelope folding animation
    setFormState('folding');

    try {
      const response = await fetch('https://formsubmit.co/ajax/phoniexsaim@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Transmission from ${formData.name} - Phoniex Website`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== 'false') {
        // Transition to flying animation
        setTimeout(() => {
          setFormState('flying');
          setTimeout(() => {
            setFormState('submitted');
          }, 900);
        }, 800);
      } else {
        throw new Error(data.message || 'Delivery service returned an unexpected response.');
      }
    } catch (err: any) {
      console.warn('Direct email API error, activating fallback:', err);
      setFormState('idle');
      setErrorMessage(
        'Direct stream encountered a network restriction. You can dispatch directly via your email client below.'
      );
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setFormState('idle');
    setErrorMessage('');
  };

  return (
    <div className="fade-in-section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="glow-orb" style={{ top: '20%', left: '5%' }} />
      <div
        className="glow-orb"
        style={{
          bottom: '10%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(var(--theme-primary-rgb), 0.12) 0%, transparent 60%)',
        }}
      />

      {/* Header */}
      <section style={{ textAlign: 'center', padding: '40px 0 50px 0' }}>
        <h1
          style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 900,
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            letterSpacing: '-0.04em',
          }}
        >
          Initiate Next <br />
          <span className="gradient-text">Systems Integration</span>
        </h1>
        <p
          style={{
            color: 'var(--theme-text-muted)',
            fontSize: '1.15rem',
            marginTop: '12px',
            maxWidth: '600px',
            margin: '12px auto 0 auto',
          }}
        >
          Connect with our core software engineering architects to discuss your platform project.
        </p>
      </section>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '35px',
          alignItems: 'start',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Left Side: Contact Information Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <ThreeDCard className="contact-info-card" style={{ padding: '30px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 700,
                fontSize: '1.25rem',
                marginBottom: '20px',
              }}
            >
              System Coordinate Hubs
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--theme-border)',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--theme-primary)',
                    justifyContent: 'center',
                  }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)', display: 'block' }}>
                    HQ Location
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Garden West, Karachi</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--theme-border)',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--theme-secondary)',
                    justifyContent: 'center',
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)', display: 'block' }}>
                    Email Access
                  </span>
                  <a
                    href="mailto:phoniexsaim@gmail.com"
                    style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--theme-text)' }}
                  >
                    phoniexsaim@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--theme-border)',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--theme-accent)',
                    justifyContent: 'center',
                  }}
                >
                  <Phone size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)', display: 'block' }}>
                    Direct Link
                  </span>
                  <a
                    href="tel:+923021020720"
                    style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--theme-text)' }}
                  >
                    +92 3021020720
                  </a>
                </div>
              </div>
            </div>
          </ThreeDCard>

          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--theme-text-muted)',
              textAlign: 'center',
              display: 'block',
            }}
          >
            Average architect response time:{' '}
            <strong style={{ color: 'var(--theme-primary)' }}>&lt; 90 minutes</strong>
          </span>
        </div>

        {/* Right Side: Animated Contact Form */}
        <div style={{ position: 'relative', perspective: '1000px' }}>
          {formState === 'submitted' ? (
            /* Submission Success View */
            <ThreeDCard
              style={{
                padding: '40px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(var(--theme-primary-rgb), 0.2)',
                  border: '2px solid var(--theme-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--theme-secondary)',
                  boxShadow: 'var(--theme-glow)',
                  animation: 'pulseGlow 2s infinite',
                }}
              >
                <Check size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.4rem' }}>
                Transmission Delivered
              </h3>
              <p
                style={{
                  color: 'var(--theme-text-muted)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  maxWidth: '340px',
                }}
              >
                Your payload was securely transmitted directly to{' '}
                <strong style={{ color: 'var(--theme-secondary)' }}>phoniexsaim@gmail.com</strong>. Our lead
                architect will respond shortly.
              </p>
              <button className="btn-secondary" style={{ marginTop: '10px' }} onClick={resetForm}>
                Send New Message
              </button>
            </ThreeDCard>
          ) : (
            /* Contact Form & Airplane Flight Animation Container */
            <div
              className={`glass-panel contact-form-panel ${formState === 'folding' ? 'form-folding' : ''} ${
                formState === 'flying' ? 'form-flying' : ''
              }`}
              style={{
                padding: '40px',
                borderRadius: '24px',
                border: '1px solid var(--theme-border)',
                transition: 'all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
                transformStyle: 'preserve-3d',
                position: 'relative',
              }}
            >
              {/* Submission State Overlays */}
              {formState === 'folding' && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.65)',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    zIndex: 10,
                  }}
                >
                  <SendToBack
                    size={36}
                    style={{ color: 'var(--theme-primary)', animation: 'spin-slow 2s linear infinite' }}
                  />
                  <span style={{ fontSize: '0.95rem', color: 'var(--theme-secondary)', fontWeight: 600 }}>
                    Encrypting & Dispatching to phoniexsaim@gmail.com...
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.3rem' }}>
                    Secure Message Stream
                  </h3>
                  <span className="fire-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                    DIRECT INBOX
                  </span>
                </div>

                {errorMessage && (
                  <div
                    style={{
                      background: 'rgba(255, 60, 60, 0.15)',
                      border: '1px solid rgba(255, 80, 80, 0.35)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      fontSize: '0.85rem',
                      color: '#ffaaaa',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} style={{ color: '#ff5555' }} />
                      <span>{errorMessage}</span>
                    </div>
                    <a
                      href={`mailto:phoniexsaim@gmail.com?subject=Project Inquiry from ${encodeURIComponent(
                        formData.name
                      )}&body=${encodeURIComponent(formData.message)}`}
                      className="btn-secondary"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.8rem',
                        alignSelf: 'flex-start',
                        marginTop: '4px',
                      }}
                    >
                      <Mail size={14} /> Open in Mail App
                    </a>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)', fontWeight: 600 }}>
                    Your Identity
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                    required
                    placeholder="Enter name"
                    className="glass-input"
                    disabled={formState !== 'idle'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)', fontWeight: 600 }}>
                    Return Endpoint (Email)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInput}
                    required
                    placeholder="architect@domain.com"
                    className="glass-input"
                    disabled={formState !== 'idle'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)', fontWeight: 600 }}>
                    Message Payload
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInput}
                    required
                    rows={4}
                    placeholder="Detail your system requirements..."
                    className="glass-input"
                    style={{ resize: 'none' }}
                    disabled={formState !== 'idle'}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}
                  disabled={formState !== 'idle'}
                >
                  <span>Launch Payload to Email</span>
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* Envelope Folding & Flying Keyframe Animations */
        .form-folding {
          transform: rotateX(85deg) scale3d(0.4, 0.4, 0.4) translateY(-100px);
          opacity: 0.8;
          border-color: var(--theme-secondary) !important;
          box-shadow: var(--theme-glow);
        }
        
        .form-flying {
          transform: rotateX(85deg) scale3d(0.05, 0.05, 0.05) translateY(-1200px) translateX(800px);
          opacity: 0;
        }

        @media (max-width: 600px) {
          .contact-form-panel {
            padding: 22px 16px !important;
          }
          .contact-info-card {
            padding: 22px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};
