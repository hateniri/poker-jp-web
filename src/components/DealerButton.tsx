'use client';

interface DealerButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export default function DealerButton({ 
  text, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  icon
}: DealerButtonProps) {
  const variants = {
    primary: 'bg-poker-red hover:bg-poker-darkred text-white border-poker-darkred',
    secondary: 'bg-poker-green hover:bg-poker-darkgreen text-white border-poker-darkgreen',
    gold: 'bg-poker-gold hover:bg-yellow-400 text-poker-black border-yellow-600'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        font-bold rounded-full border-2
        transition-all duration-300
        transform hover:scale-105 active:scale-95
        shadow-lg hover:shadow-xl
        relative overflow-hidden
        group
        ${className}
      `}
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      }}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 -top-2 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="text-xl">{icon}</span>}
        {text}
      </span>
      
      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300" />
    </button>
  );
}