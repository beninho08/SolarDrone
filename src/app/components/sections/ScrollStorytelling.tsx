import { useEffect, useRef, useState, useMemo } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ScrollStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollProgress = -rect.top / (containerHeight - viewportHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      setProgress(clampedProgress);

      const chapter = Math.min(4, Math.floor(clampedProgress * 5));
      setCurrentChapter(chapter);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chapters = useMemo(() => [
    {
      title: 'Megérkezünk.',
      body: 'A dróncsapat megérkezik a helyszínre. Időjárás ellenőrizve, felszerelés előkészítve. Minden készen áll az első repülésre.',
      image: 'https://images.unsplash.com/photo-1770936994282-8811fb7129ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBzb2xhciUyMGZhcm0lMjBwYW5lbHMlMjB0b3AlMjBkb3dufGVufDF8fHx8MTc3NTUwMzg3OHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Minden sort végigpásztázunk.',
      body: 'A drón precíz rácsmintát repül. A hőkamera olyan hőmérsékleti rendellenességeket rögzít, amelyek szabad szemmel láthatatlanok.',
      image: 'https://images.unsplash.com/photo-1706380003139-7471c33ca2b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGZseWluZyUyMG92ZXIlMjBzb2xhciUyMHBhbmVscyUyMGxvdyUyMGFuZ2xlfGVufDF8fHx8MTc3NTUwMzg3OXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Amit szabad szemmel nem láthat.',
      body: 'Hotspotok, bypass diódahibák, szennyeződések — mindegyik azonosítva, katalogizálva, GPS-címkével ellátva.',
      image: 'https://images.unsplash.com/photo-1765410847873-a9bee6e4ddbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVybWFsJTIwaW1hZ2luZyUyMHNvbGFyJTIwcGFuZWwlMjBpbmZyYXJlZHxlbnwxfHx8fDE3NzU1MDM4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: '48 órán belül a kezében.',
      body: 'Strukturált jelentés érkezik az ügyfél postafiókjába. Minden leletet fotóbizonyítékkal, GPS-koordinátákkal és súlyossági besorolással dokumentálunk.',
      image: 'https://images.unsplash.com/photo-1695634281254-e94a29d234c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N1bWVudCUyMHJlcG9ydCUyMG1vY2t1cHxlbnwxfHx8fDE3NzU1MDM4ODB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      title: 'Egy kód. Azonnali hozzáférés.',
      body: 'Nincs szükség fiókra. Az ügyfél egyedi kódot kap e-mailben, megnyitja a linket, azonnal letölti vagy megtekinti a teljes jelentést.',
      image: 'https://images.unsplash.com/photo-1762330471287-be883db470c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbG9naW4lMjBpbnRlcmZhY2UlMjBzY3JlZW58ZW58MXx8fHwxNzc1NTAzODgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      cta: true
    }
  ], []);

  const chapterProgress = progress * 5 - currentChapter;

  const getImageStyle = (idx: number): React.CSSProperties => {
    const isActive = currentChapter === idx;
    const isLeaving = currentChapter === idx + 1;
    const localP = chapterProgress;

    if (idx === 0 && isActive) {
      return { opacity: 1, transition: 'opacity 80ms ease' };
    }
    if (idx === 0 && isLeaving) {
      return { opacity: 0, transition: 'opacity 80ms ease' };
    }

    if (idx === 1 && isActive) {
      return { opacity: 1, transition: 'opacity 200ms ease' };
    }

    if (idx === 2 && isActive) {
      return { opacity: 1, transition: 'opacity 300ms ease' };
    }
    if (idx === 2 && isLeaving) {
      const shrinkP = Math.min(1, localP * 2);
      return {
        opacity: 1,
        transform: `scale(${1 - shrinkP * 0.65}) translate(${shrinkP * 40}%, ${shrinkP * 35}%)`,
        transition: 'transform 100ms linear, opacity 400ms ease',
        transformOrigin: 'bottom right',
      };
    }

    if (idx === 3 && isActive) {
      return { opacity: 1, transition: 'opacity 300ms ease' };
    }

    if (idx === 4 && isActive) {
      const entryP = Math.min(1, localP * 3);
      return {
        opacity: 1,
        transform: `translateX(${(1 - entryP) * 60}%) rotate(${(1 - entryP) * 1.5}deg)`,
        transition: 'none',
      };
    }

    if (!isActive) {
      return { opacity: 0, pointerEvents: 'none', transition: 'opacity 200ms ease' };
    }

    return { opacity: 1 };
  };

  const getTextStyle = (idx: number): React.CSSProperties => {
    const isActive = currentChapter === idx;

    if (idx === 1 && isActive) {
      return {
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 280ms ease 80ms, transform 280ms ease 80ms',
      };
    }

    if (idx === 4 && isActive) {
      const entryP = Math.min(1, chapterProgress * 3);
      return {
        opacity: entryP,
        transform: `translateX(${(1 - entryP) * 30}%) rotate(${(1 - entryP) * 1}deg)`,
        transition: 'none',
      };
    }

    if (isActive) {
      return {
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 400ms ease, transform 400ms ease',
      };
    }

    if (currentChapter === idx + 1 && idx === 3) {
      return {
        opacity: 0,
        transform: 'translateX(-40%)',
        transition: 'opacity 300ms ease, transform 300ms ease',
        pointerEvents: 'none',
        position: 'absolute' as const,
      };
    }

    return {
      opacity: 0,
      transform: 'translateY(24px)',
      pointerEvents: 'none',
      position: 'absolute' as const,
      transition: 'opacity 300ms ease, transform 300ms ease',
    };
  };

  return (
    <div ref={containerRef} className="relative md:h-[400vh]">
      {/* Sticky Container — Desktop */}
      <div className="hidden md:block md:sticky md:top-0 md:h-screen md:overflow-hidden">
        {/* Progress Line */}
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-[#C8C2B4]">
          <div
            className="absolute top-0 left-0 w-full bg-[#C17D3C]"
            style={{
              height: `${progress * 100}%`,
              transition: 'height 100ms linear',
            }}
          />
        </div>

        <div className="h-full flex items-center max-w-[1200px] mx-auto px-[120px]">
          {/* Left Side — Visual */}
          <div className="w-[55%] h-[70vh] relative overflow-hidden">
            {chapters.map((chapter, idx) => (
              <div
                key={idx}
                className="absolute inset-0"
                style={getImageStyle(idx)}
              >
                <ImageWithFallback
                  src={chapter.image}
                  alt={chapter.title}
                  className="w-full h-full object-cover"
                />

                {idx === 0 && (
                  <div className="absolute bottom-8 left-8 w-8 h-8 bg-[#C17D3C] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#F5F0E8]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L9 6h6l-3-4zm0 20l3-4H9l3 4zM2 12l4-3v6l-4-3zm20 0l-4 3V9l4 3z"/>
                    </svg>
                  </div>
                )}

                {idx === 1 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    <path
                      d="M 10,10 L 90,10 L 90,50 L 10,50 L 10,90 L 90,90"
                      stroke="#C17D3C"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="1000"
                      strokeDashoffset={1000 - Math.max(0, chapterProgress) * 1000}
                      vectorEffect="non-scaling-stroke"
                      transform="scale(0.01)"
                      style={{ transformOrigin: 'top left' }}
                    />
                  </svg>
                )}

                {/* Ch.3: Thermal overlay GROWS from center via clipPath */}
                {idx === 2 && (
                  <>
                    <svg className="absolute inset-0 w-0 h-0" aria-hidden="true">
                      <defs>
                        <clipPath id="thermal-reveal" clipPathUnits="objectBoundingBox">
                          <circle
                            cx="0.55"
                            cy="0.45"
                            r={Math.min(1, Math.max(0, chapterProgress - 0.15) * 2)}
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[#C17D3C]/30 via-[#C17D3C]/10 to-[#C17D3C]/20"
                      style={{ clipPath: 'url(#thermal-reveal)' }}
                    >
                      {[
                        { top: '30%', left: '40%', delay: 0.3 },
                        { top: '50%', left: '60%', delay: 0.5 },
                        { top: '70%', left: '35%', delay: 0.7 }
                      ].map((dot, i) => (
                        <div
                          key={i}
                          className="absolute w-3 h-3 bg-[#C17D3C] rounded-full"
                          style={{
                            top: dot.top,
                            left: dot.left,
                            transform: chapterProgress > dot.delay ? 'scale(1)' : 'scale(0)',
                            transition: 'transform 300ms ease',
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}

                {idx === 3 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[0, 1, 2].map((pageIdx) => (
                      <div
                        key={pageIdx}
                        className="absolute w-[80%] h-[85%] bg-[#EDE8DC] shadow-lg"
                        style={{
                          transform: `translateY(${
                            chapterProgress > pageIdx * 0.2
                              ? pageIdx * 8
                              : 40 + pageIdx * 8
                          }px) rotate(${pageIdx * -1}deg)`,
                          zIndex: 3 - pageIdx,
                          opacity: chapterProgress > pageIdx * 0.2 ? 1 : 0,
                          transition: 'transform 500ms ease, opacity 500ms ease',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side — Text */}
          <div className="w-[45%] pl-20 relative">
            {chapters.map((chapter, idx) => (
              <div key={idx} style={getTextStyle(idx)}>
                <h2 className="font-['Lora'] text-[48px] leading-[1.2] mb-6 text-[#1C1A16]">
                  {chapter.title}
                </h2>
                <p className="text-[17px] leading-[1.7] text-[#1C1A16] mb-8">
                  {idx === 1 ? (
                    <>
                      A drón precíz rácsmintát repül. A hőkamera olyan hőmérsékleti rendellenességeket rögzít, amelyek{' '}
                      <span className="font-['Playfair_Display'] italic">szabad szemmel</span>
                      {' '}láthatatlanok.
                    </>
                  ) : (
                    chapter.body
                  )}
                </p>
                {chapter.cta && (
                  <button className="w-full px-8 py-4 bg-[#1C1A16] text-[#F5F0E8] text-[17px] transition-all hover:bg-[#C17D3C]">
                    Kérjen felmérést
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Stack Version */}
      <div className="md:hidden space-y-16 py-12 px-6">
        {chapters.map((chapter, idx) => (
          <div key={idx} className="space-y-6">
            <div className="w-full h-[300px] relative overflow-hidden">
              <ImageWithFallback
                src={chapter.image}
                alt={chapter.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-['Lora'] text-[36px] leading-[1.2] mb-4 text-[#1C1A16]">
                {chapter.title}
              </h2>
              <p className="text-[17px] leading-[1.7] text-[#1C1A16] mb-6">
                {chapter.body}
              </p>
              {chapter.cta && (
                <button className="w-full px-8 py-4 bg-[#1C1A16] text-[#F5F0E8] text-[17px] transition-all hover:bg-[#C17D3C]">
                  Kérjen felmérést
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
