import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="min-h-screen pt-24 md:pt-32 pb-12 md:pb-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-[120px]">
        {/* Headline and Description */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16 mb-12 md:mb-20">
          <div className="w-full md:w-[60%]">
            {/* TYPOGRAPHIC TENSION — irregular, human-set headline */}
            <h1 className="font-['Lora'] text-[#1C1A16] mb-4 md:mb-6 leading-[1.05] tracking-[-0.02em]">
              <span className="block text-[56px] md:text-[100px] lg:text-[130px] font-medium">
                Minden
              </span>
              <span className="block text-[42px] md:text-[72px] lg:text-[96px] italic pl-[20px] md:pl-[40px] text-[#1C1A16]/90">
                panel.
              </span>
              <span className="block text-[56px] md:text-[100px] lg:text-[130px] font-medium">
                Minden
              </span>
              <span className="block text-[64px] md:text-[120px] lg:text-[160px] font-bold mr-[-20px] md:mr-[-60px] text-right md:text-left">
                hiba.
              </span>
            </h1>
            <p className="text-[17px] leading-[1.7] text-[#7A7468] mb-6 md:mb-8 max-w-[500px]">
              Drón alapú napelem rendszer vizsgálat termográfiás elemzéssel. 
              Precíz hibafelderítés, amely{' '}
              <span className="font-['Playfair_Display'] italic text-[#1C1A16]">szabad szemmel</span>
              {' '}láthatatlan.
            </p>
            <button className="w-full md:w-auto px-8 py-4 bg-[#1C1A16] text-[#F5F0E8] text-[17px] transition-all hover:bg-[#C17D3C]">
              Kérjen ajánlatot
            </button>
          </div>

          {/* Offset Drone Photo */}
          <div className="w-full md:w-[40%] md:mt-12 relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1643958020692-6e12dc8e591c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkcm9uZSUyMGluc3BlY3Rpb24lMjBhZXJpYWx8ZW58MXx8fHwxNzc1NTAzOTI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Drón alapú napelem vizsgálat"
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            {/* Halftone dot pattern — cream on cream, bottom-right */}
            <svg className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-[0.08] pointer-events-none" aria-hidden="true">
              <defs>
                <pattern id="halftone" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="4" cy="4" r="1.5" fill="#EDE8DC" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#halftone)" />
            </svg>
          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="overflow-hidden mb-12 md:mb-16 -mx-6 md:-mx-12 lg:-mx-[120px]">
          <div className="marquee-track flex whitespace-nowrap">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-[#B0A99C] font-medium px-1"
                style={{ fontVariant: 'all-small-caps' }}
              >
                TERMOGRÁFIÁS VIZSGÁLAT&nbsp;&nbsp;·&nbsp;&nbsp;48 ÓRÁS ÁTFUTÁS&nbsp;&nbsp;·&nbsp;&nbsp;GPS-KOORDINÁLT HIBATÉRKÉP&nbsp;&nbsp;·&nbsp;&nbsp;99.2% PONTOSSÁG&nbsp;&nbsp;·&nbsp;&nbsp;DRÓN ALAPÚ FELMÉRÉS&nbsp;&nbsp;·&nbsp;&nbsp;STRUKTURÁLT JELENTÉS&nbsp;&nbsp;·&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Horizontal Rule */}
        <div className="h-[1px] bg-[#C8C2B4] mb-12 md:mb-16" />

        {/* Stats — third stat offset down 32px */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div>
            <div className="text-[36px] md:text-[48px] font-['Lora'] text-[#1C1A16] mb-2">500+</div>
            <div className="text-[12px] uppercase tracking-[0.1em] text-[#7A7468]">
              Megvizsgált rendszer
            </div>
          </div>
          <div>
            <div className="text-[36px] md:text-[48px] font-['Lora'] text-[#1C1A16] mb-2">48ó</div>
            <div className="text-[12px] uppercase tracking-[0.1em] text-[#7A7468]">
              Átfutási idő
            </div>
          </div>
          <div className="md:mt-[32px]">
            <div className="text-[36px] md:text-[48px] font-['Lora'] text-[#1C1A16] mb-2">99.2%</div>
            <div className="text-[12px] uppercase tracking-[0.1em] text-[#7A7468]">
              Hibafelismerési pontosság
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
