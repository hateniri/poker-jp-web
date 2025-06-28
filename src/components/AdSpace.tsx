'use client';

interface AdSpaceProps {
  variant?: 'banner' | 'square' | 'vertical' | 'horizontal';
  slot?: string;
  className?: string;
}

export default function AdSpace({ variant = 'banner', slot = 'default', className = '' }: AdSpaceProps) {
  const getDimensions = () => {
    switch (variant) {
      case 'banner':
        return 'h-24 md:h-32';
      case 'square':
        return 'w-full max-w-[300px] aspect-square';
      case 'vertical':
        return 'w-full max-w-[160px] h-[600px]';
      case 'horizontal':
        return 'w-full h-20';
      default:
        return 'h-24';
    }
  };

  return (
    <div 
      className={`
        ${getDimensions()} 
        bg-poker-black/30 
        border-2 border-dashed border-poker-gold/20 
        rounded-lg 
        flex items-center justify-center 
        text-poker-gold/40 
        text-sm
        overflow-hidden
        relative
        ${className}
      `}
      data-ad-slot={slot}
    >
      <div className="text-center p-4">
        <p className="font-bold mb-1">広告スペース</p>
        <p className="text-xs">
          {variant === 'banner' && '728 x 90'}
          {variant === 'square' && '300 x 300'}
          {variant === 'vertical' && '160 x 600'}
          {variant === 'horizontal' && '320 x 50'}
        </p>
      </div>
      
      {/* Subtle animation for production */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-poker-gold/5 to-transparent -translate-x-full animate-shimmer"></div>
    </div>
  );
}