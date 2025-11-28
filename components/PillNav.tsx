import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import './PillNav.css';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#000',
  pillColor = '#fff',
  hoveredPillTextColor = '#000',
  pillTextColor,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }


    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;

      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };


  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isNextLink = (href?: string) => href && !isExternalLink(href);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '42px',
    ['--logo']: '36px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '3px'
  } as React.CSSProperties;

  const handleLogoClick = (e: React.MouseEvent) => {
    const firstHref = items?.[0]?.href;
    if (firstHref?.startsWith('#')) {
      e.preventDefault();
      
      // Dispatch custom event to trigger lazy loading if needed
      window.dispatchEvent(new CustomEvent('navigateToSection', { 
        detail: { href: firstHref } 
      }));
      
      // Retry mechanism for lazy-loaded components
      let retries = 0;
      const maxRetries = 10; // Try for up to 2 seconds
      
      const scrollToElement = () => {
        const element = document.querySelector(firstHref);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (retries < maxRetries) {
          retries++;
          setTimeout(scrollToElement, 200); // Retry every 200ms
        }
      };
      
      // Start trying after a small delay
      setTimeout(scrollToElement, 100);
    }
  };

  const LogoComponent = logo ? (
    isNextLink(items?.[0]?.href) ? (
      <Link
        href={items[0].href}
        aria-label="Home"
        onMouseEnter={handleLogoEnter}
        onClick={handleLogoClick}
        role="menuitem"
        ref={el => {
          logoRef.current = el;
        }}
        className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
        style={{
          width: 'var(--nav-h)',
          height: 'var(--nav-h)',
          background: 'var(--base, #000)'
        }}
      >
        <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />
      </Link>
    ) : (
      <a
        href={items?.[0]?.href || '#'}
        aria-label="Home"
        onMouseEnter={handleLogoEnter}
        onClick={handleLogoClick}
        ref={el => {
          logoRef.current = el;
        }}
        className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
        style={{
          width: 'var(--nav-h)',
          height: 'var(--nav-h)',
          background: 'var(--base, #000)'
        }}
      >
        <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />
      </a>
    )
  ) : (
    <div
      aria-label="Home"
      onMouseEnter={handleLogoEnter}
      onClick={handleLogoClick}
      ref={el => {
        logoRef.current = el;
      }}
      className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden text-white text-sm font-light tracking-wider cursor-pointer"
      style={{
        width: 'var(--nav-h)',
        height: 'var(--nav-h)',
        background: 'var(--base, #000)'
      }}
    >
      NS
    </div>
  );

  return (
    <>
      <div className="relative z-[1000] w-auto flex-shrink-0">
        <nav
          className={`flex items-center justify-end md:justify-start box-border ${className}`}
          aria-label="Primary"
          style={cssVars}
        >
        {logo ? LogoComponent : null}

        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex"
          style={{
            height: 'var(--nav-h)',
            background: 'transparent',
            backdropFilter: 'none',
            border: 'none'
          }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[3px] h-full"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              const pillStyle: React.CSSProperties = {
                background: 'var(--pill-bg, rgba(255, 255, 255, 0.25))',
                color: 'var(--pill-text, rgba(255, 255, 255, 0.9))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{
                      background: 'var(--base, rgba(255, 255, 255, 0.15))',
                      willChange: 'transform',
                      opacity: 0.8
                    }}
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ willChange: 'transform' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: 'var(--hover-text, #fff)',
                        willChange: 'transform, opacity'
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-2 h-2 rounded-full z-[4]"
                      style={{ background: 'rgba(255, 255, 255, 0.8)' }}
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              const basePillClasses =
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-light text-sm leading-[0] uppercase tracking-wider whitespace-nowrap cursor-pointer px-0 hover:bg-opacity-20 transition-all duration-300';

              const handleClick = (e: React.MouseEvent) => {
                if (item.href.startsWith('#')) {
                  e.preventDefault();
                  
                  // Dispatch custom event to trigger lazy loading if needed
                  window.dispatchEvent(new CustomEvent('navigateToSection', { 
                    detail: { href: item.href } 
                  }));
                  
                  // Retry mechanism for lazy-loaded components
                  let retries = 0;
                  const maxRetries = 10; // Try for up to 2 seconds
                  
                  const scrollToElement = () => {
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else if (retries < maxRetries) {
                      retries++;
                      setTimeout(scrollToElement, 200); // Retry every 200ms
                    }
                  };
                  
                  // Start trying after a small delay
                  setTimeout(scrollToElement, 100);
                }
              };

              return (
                <li key={item.href} role="none" className="flex h-full">
                  {isNextLink(item.href) ? (
                    <Link
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      onClick={handleClick}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      onClick={handleClick}
                    >
                      {PillContent}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        </nav>
      </div>
    </>
  );
};

export default PillNav;

