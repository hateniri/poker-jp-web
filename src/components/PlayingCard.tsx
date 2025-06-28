'use client';

import { useEffect, useState } from 'react';

interface PlayingCardProps {
  suit: 'spade' | 'heart' | 'diamond' | 'club';
  rank: string;
  isFlipped?: boolean;
  delay?: number;
  className?: string;
}

export default function PlayingCard({ suit, rank, isFlipped = false, delay = 0, className = '' }: PlayingCardProps) {
  const [flipped, setFlipped] = useState(isFlipped);
  const [dealt, setDealt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDealt(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const suitSymbols = {
    spade: '♠',
    heart: '♥',
    diamond: '♦',
    club: '♣'
  };

  const suitColors = {
    spade: 'text-black',
    heart: 'text-poker-red',
    diamond: 'text-poker-red',
    club: 'text-black'
  };

  return (
    <div
      className={`relative w-20 h-28 transition-all duration-500 transform-style-3d cursor-pointer ${className} ${
        dealt ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}
      style={{
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transformStyle: 'preserve-3d',
        transitionDelay: `${delay}ms`
      }}
      onClick={() => setFlipped(!flipped)}
    >
      {/* Card Front */}
      <div className="absolute inset-0 backface-hidden rounded-lg bg-white border-2 border-poker-black shadow-lg p-2 flex flex-col items-center justify-between">
        <div className={`text-2xl font-bold ${suitColors[suit]}`}>
          {rank}
        </div>
        <div className={`text-4xl ${suitColors[suit]}`}>
          {suitSymbols[suit]}
        </div>
        <div className={`text-2xl font-bold ${suitColors[suit]} rotate-180`}>
          {rank}
        </div>
      </div>
      
      {/* Card Back */}
      <div 
        className="absolute inset-0 backface-hidden rounded-lg bg-gradient-to-br from-poker-red to-poker-darkred border-2 border-poker-gold shadow-lg flex items-center justify-center"
        style={{ transform: 'rotateY(180deg)' }}
      >
        <div className="w-full h-full p-2 border-2 border-poker-gold rounded-md m-1 flex items-center justify-center">
          <div className="text-poker-gold text-3xl font-bold opacity-50">♠♥♦♣</div>
        </div>
      </div>
    </div>
  );
}