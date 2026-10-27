import React, { useState, useEffect } from 'react';

/**
 * ReactBits DecryptedText Component
 * Matrix / AI cipher decryption animation unscrambling characters.
 */
export const DecryptedText = ({
  text = '',
  speed = 40,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
  className = '',
  animateOn = 'mount', // 'mount' | 'hover'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    let iteration = 0;

    const startDecryption = () => {
      iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        iteration += 1 / 2;

        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, speed);
    };

    if (animateOn === 'mount' || (animateOn === 'hover' && isHovered)) {
      startDecryption();
    }

    return () => clearInterval(interval);
  }, [text, speed, characters, animateOn, isHovered]);

  return (
    <span
      className={className}
      onMouseEnter={() => animateOn === 'hover' && setIsHovered(true)}
      onMouseLeave={() => animateOn === 'hover' && setIsHovered(false)}
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;
