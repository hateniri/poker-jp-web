'use client';

interface PokerTableProps {
  children: React.ReactNode;
  className?: string;
}

export default function PokerTable({ children, className = '' }: PokerTableProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Table shadow */}
      <div className="absolute inset-0 bg-black/50 rounded-full blur-xl transform translate-y-4" />
      
      {/* Table surface */}
      <div className="relative bg-gradient-to-br from-poker-green via-poker-darkgreen to-poker-green rounded-full border-8 border-amber-900 shadow-2xl">
        {/* Table texture */}
        <div className="absolute inset-0 rounded-full opacity-20" 
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.1) 100%)'
          }}
        />
        
        {/* Inner rail */}
        <div className="absolute inset-4 rounded-full border-4 border-amber-800 shadow-inner" />
        
        {/* Content area */}
        <div className="relative p-8 min-h-[400px] flex items-center justify-center">
          {children}
        </div>
        
        {/* Table markings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-poker-darkgreen/30 text-6xl font-bold">
          <span className="suit-spade"></span>
          <span className="suit-heart"></span>
          <span className="suit-diamond"></span>
          <span className="suit-club"></span>
        </div>
      </div>
    </div>
  );
}