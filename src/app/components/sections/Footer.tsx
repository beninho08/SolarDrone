import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="py-12 md:py-20 border-t border-[#C8C2B4]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
          {/* Logo + Tagline — LARGE */}
          <div>
            <div className="text-[#1C1A16] font-medium text-[48px] md:text-[64px] font-['Lora'] tracking-tight mb-4 leading-none">
              SolarDrone
            </div>
            <p className="text-[14px] leading-[1.7] text-[#7A7468]">
              Precíziós drón alapú napelem vizsgálat termográfiával.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[12px] uppercase tracking-[0.1em] text-[#7A7468] mb-4">
              Menü
            </div>
            <nav className="flex flex-col gap-3">
              <a href="#services" className="text-[17px] text-[#1C1A16] hover:text-[#C17D3C] transition-colors">
                Szolgáltatások
              </a>
              <a href="#portfolio" className="text-[17px] text-[#1C1A16] hover:text-[#C17D3C] transition-colors">
                Referenciák
              </a>
              <a href="#contact" className="text-[17px] text-[#1C1A16] hover:text-[#C17D3C] transition-colors">
                Kapcsolat
              </a>
              <Link to="/portal" className="text-[17px] text-[#1C1A16] hover:text-[#C17D3C] transition-colors">
                Jelentés portál
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <div className="text-[12px] uppercase tracking-[0.1em] text-[#7A7468] mb-4">
              Jogi
            </div>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-[17px] text-[#1C1A16] hover:text-[#C17D3C] transition-colors">
                Adatvédelem
              </a>
              <a href="#" className="text-[17px] text-[#1C1A16] hover:text-[#C17D3C] transition-colors">
                ÁSZF
              </a>
              <a href="#" className="text-[17px] text-[#1C1A16] hover:text-[#C17D3C] transition-colors">
                Impresszum
              </a>
            </nav>
          </div>

          {/* Language */}
          <div>
            <div className="text-[12px] uppercase tracking-[0.1em] text-[#7A7468] mb-4">
              Nyelv
            </div>
            <div className="flex gap-4">
              <button className="text-[17px] text-[#1C1A16] font-medium">
                HU
              </button>
              <button className="text-[17px] text-[#7A7468] hover:text-[#1C1A16] transition-colors">
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Emotional Landing — serif italic quote */}
        <div className="mt-16 md:mt-24 mb-8 md:mb-12 text-center">
          <p className="font-['Playfair_Display'] italic text-[32px] md:text-[48px] leading-[1.3] text-[#7A7468] max-w-[800px] mx-auto">
            „Amit nem lát a szem, megmutatja a drón."
          </p>
        </div>

        <div className="pt-6 md:pt-8 border-t border-[#C8C2B4]">
          <p className="text-[12px] text-[#7A7468]">
            © 2026 SolarDrone. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
}
