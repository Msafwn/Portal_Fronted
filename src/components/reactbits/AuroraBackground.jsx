import React from 'react';

/**
 * ReactBits Aurora Background
 * Soft organic glowing waves with layered radial blurs.
 * Designed with clean, airy, high-end enterprise color tones (no muddy tints).
 */
export const AuroraBackground = ({
  children,
  className = '',
  colorVariant = 'clean-blue', // 'clean-blue' | 'dark-galaxy' | 'subtle-emerald'
  speed = 'normal', // 'slow' | 'normal' | 'fast'
  opacity = 0.5,
}) => {
  const getGradientBlobs = () => {
    switch (colorVariant) {
      case 'dark-galaxy':
        return {
          blob1: 'from-blue-600/35 via-indigo-600/25 to-purple-800/20',
          blob2: 'from-indigo-700/30 via-purple-700/20 to-cyan-600/20',
          blob3: 'from-cyan-500/25 via-blue-700/20 to-indigo-900/20',
        };
      case 'subtle-emerald':
        return {
          blob1: 'from-emerald-300/15 via-teal-200/10 to-transparent',
          blob2: 'from-teal-300/12 via-emerald-200/10 to-transparent',
          blob3: 'from-sky-300/12 via-teal-200/08 to-transparent',
        };
      case 'clean-blue':
      default:
        // Soft, pristine, high-end Apple / Stripe style sky-blue & indigo glow
        return {
          blob1: 'from-blue-400/18 via-sky-300/12 to-transparent',
          blob2: 'from-indigo-400/14 via-blue-300/10 to-transparent',
          blob3: 'from-sky-400/14 via-cyan-300/10 to-transparent',
        };
    }
  };

  const colors = getGradientBlobs();

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ isolation: 'isolate' }}
    >
      {/* Background Aurora Layers */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        style={{ opacity }}
        aria-hidden="true"
      >
        {/* Blob 1 */}
        <div
          className={`absolute -top-1/4 -left-1/4 w-[130%] h-[130%] bg-gradient-to-tr ${colors.blob1} rounded-full blur-[80px] sm:blur-[110px] animate-pulse`}
          style={{
            animationDuration: speed === 'slow' ? '14s' : speed === 'fast' ? '5s' : '8s',
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        {/* Blob 2 */}
        <div
          className={`absolute -bottom-1/4 -right-1/4 w-[120%] h-[120%] bg-gradient-to-bl ${colors.blob2} rounded-full blur-[90px] sm:blur-[120px] animate-pulse`}
          style={{
            animationDuration: speed === 'slow' ? '18s' : speed === 'fast' ? '7s' : '10s',
            animationDelay: '2s',
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        {/* Blob 3 (Center subtle accent) */}
        <div
          className={`absolute top-1/4 left-1/4 w-[90%] h-[90%] bg-gradient-to-r ${colors.blob3} rounded-full blur-[70px] sm:blur-[100px] animate-pulse`}
          style={{
            animationDuration: speed === 'slow' ? '22s' : speed === 'fast' ? '8s' : '12s',
            animationDelay: '4s',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuroraBackground;
