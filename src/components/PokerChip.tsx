'use client';

import { useState } from 'react';

interface PokerChipProps {
  value: number;
  color: 'red' | 'green' | 'black' | 'blue' | 'white';
  className?: string;
  onClick?: () => void;
}

export default function PokerChip({ value, color, className = '', onClick }: PokerChipProps) {
  const [isHovered, setIsHovered] = useState(false);

  const chipColors = {
    red: 'bg-poker-red border-poker-darkred',
    green: 'bg-poker-green border-poker-darkgreen',
    black: 'bg-poker-black border-gray-900',
    blue: 'bg-blue-600 border-blue-800',
    white: 'bg-poker-white border-gray-300'
  };

  const textColors = {
    red: 'text-white',
    green: 'text-white',
    black: 'text-poker-gold',
    blue: 'text-white',
    white: 'text-poker-black'
  };

  return (
    <div
      className={`relative w-16 h-16 ${chipColors[color]} rounded-full border-4 flex items-center justify-center cursor-pointer transition-all duration-300 ${className} ${
        isHovered ? 'scale-110 rotate-12' : ''
      }`}
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.3)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Chip Pattern */}
      <div className="absolute inset-2 rounded-full border-2 border-dashed border-current opacity-30"></div>
      
      {/* Value */}
      <div className={`text-lg font-bold ${textColors[color]} z-10`}>
        ¥{value >= 1000 ? `${value / 1000}K` : value}
      </div>
      
      {/* Edge Marks */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <div
          key={angle}
          className="absolute w-2 h-4 bg-current opacity-20"
          style={{
            transform: `rotate(${angle}deg) translateY(-28px)`,
            transformOrigin: 'center bottom'
          }}
        />
      ))}
    </div>
  );
}