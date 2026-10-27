import React from 'react';

/**
 * ReactBits ShinyText Component
 * Shimmering metallic light pass effect across text.
 * Enhanced for high-contrast visibility on both light and dark backgrounds.
 */
export const ShinyText = ({
  text,
  disabled = false,
  speed = 4,
  theme = 'light', // 'light' | 'dark'
  className = '',
}) => {
  const animationDuration = `${speed}s`;

  // High-contrast, rich vibrant gradient for light backgrounds:
  // Starts with deep sapphire blue (#1d4ed8), passes through vivid royal blue (#2563eb)
  // and vibrant sky-blue shimmer (#38bdf8 / #60a5fa), never washed-out white!
  const lightGradient =
    'linear-gradient(120deg, #1e40af 0%, #2563eb 25%, #38bdf8 48%, #60a5fa 55%, #2563eb 75%, #1e40af 100%)';

  // Bright luminous shimmer for dark night-mode backgrounds:
  const darkGradient =
    'linear-gradient(120deg, #38bdf8 0%, #818cf8 30%, #ffffff 50%, #818cf8 70%, #38bdf8 100%)';

  const activeGradient = theme === 'dark' ? darkGradient : lightGradient;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent font-extrabold ${className}`}
      style={{
        backgroundImage: disabled ? 'none' : activeGradient,
        backgroundSize: '250% 100%',
        animation: disabled ? 'none' : `shimmer ${animationDuration} infinite linear`,
        color: disabled ? '#1e293b' : 'transparent',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
