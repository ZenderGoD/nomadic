import React from 'react';

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  glowColor?: string;
  onItemClick?: (id: string) => void;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  scaleOnHover = true,
  hoverScale = 0.95,
  colorShiftOnHover = false,
  onItemClick
}) => {
  const handleClick = (id: string) => {
    if (onItemClick) {
      onItemClick(id);
    }
  };

  return (
    <div className="relative w-full" style={{ minHeight: '600px' }}>
      <div 
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4"
        style={{ columnGap: '16px' }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid mb-4 cursor-pointer group"
            onClick={() => handleClick(item.id)}
            style={{
              transform: scaleOnHover ? 'scale(1)' : 'none',
              transition: 'transform 0.3s ease-out',
            }}
            onMouseEnter={(e) => {
              if (scaleOnHover) {
                e.currentTarget.style.transform = `scale(${hoverScale})`;
              }
            }}
            onMouseLeave={(e) => {
              if (scaleOnHover) {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            <div
              className="relative w-full rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] overflow-hidden"
              style={{ height: `${item.height / 2}px` }}
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {colorShiftOnHover && (
                <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-300" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Masonry;
