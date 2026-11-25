import React, { useRef, useState } from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  style?: React.CSSProperties;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({ children, className = '', onClick, id, style }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Degrees to rotate (max 12 deg tilt)
    const rotateY = mouseX * 24;
    const rotateX = -mouseY * 24; // Invert to rotate toward cursor

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease',
    });

    // Holographic sheen follow effect
    const glowX = (e.clientX - rect.left);
    const glowY = (e.clientY - rect.top);

    setGlowStyle({
      opacity: 0.15,
      background: `radial-gradient(circle 120px at ${glowX}px ${glowY}px, var(--theme-secondary), transparent 80%)`,
      transition: 'opacity 0.2s ease',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setGlowStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease',
    });
  };

  return (
    <div
      ref={cardRef}
      className={`glass-panel three-d-viewport ${className}`}
      id={id}
      style={{
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
        ...style,
        ...tiltStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Dynamic Cursor Spotlight Glowing Sheen Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 5,
          mixBlendMode: 'screen',
          ...glowStyle,
        }}
      />
      {/* 3D Child Wrapper preserving depth */}
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
};
