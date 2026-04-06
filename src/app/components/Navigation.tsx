import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<'HU' | 'EN'>('HU');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = {
    HU: {
      services: 'Szolgáltatások',
      portfolio: 'Referenciák',
      contact: 'Kapcsolat',
      cta: 'Kérjen ajánlatot'
    },
    EN: {
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact',
      cta: 'Request Quote'
    }
  };

  const t = content[language];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#F5F0E8]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-[120px] py-6 md:py-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-[#1C1A16] font-medium text-[17px] tracking-tight">
          SolarDrone
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#1C1A16] z-50"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <div className="flex gap-8 lg:gap-12">
            <a 
              href="#services" 
              className="text-[#1C1A16] text-[17px] hover:text-[#C17D3C] transition-colors"
            >
              {t.services}
            </a>
            <a 
              href="#portfolio" 
              className="text-[#1C1A16] text-[17px] hover:text-[#C17D3C] transition-colors"
            >
              {t.portfolio}
            </a>
            <a 
              href="#contact" 
              className="text-[#1C1A16] text-[17px] hover:text-[#C17D3C] transition-colors"
            >
              {t.contact}
            </a>
          </div>

          <button 
            className="px-6 py-3 bg-[#1C1A16] text-[#F5F0E8] text-[17px] transition-all hover:bg-[#C17D3C]"
          >
            {t.cta}
          </button>
          
          <button 
            onClick={() => setLanguage(language === 'HU' ? 'EN' : 'HU')}
            className="text-[#7A7468] text-[14px] tracking-wide uppercase hover:text-[#1C1A16] transition-colors"
          >
            {language}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-[#F5F0E8] md:hidden flex flex-col items-center justify-center gap-8 z-40">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1C1A16] text-[24px] hover:text-[#C17D3C] transition-colors"
            >
              {t.services}
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1C1A16] text-[24px] hover:text-[#C17D3C] transition-colors"
            >
              {t.portfolio}
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1C1A16] text-[24px] hover:text-[#C17D3C] transition-colors"
            >
              {t.contact}
            </a>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-4 bg-[#1C1A16] text-[#F5F0E8] text-[17px] transition-all hover:bg-[#C17D3C]"
            >
              {t.cta}
            </button>
            <button 
              onClick={() => setLanguage(language === 'HU' ? 'EN' : 'HU')}
              className="text-[#7A7468] text-[14px] tracking-wide uppercase hover:text-[#1C1A16] transition-colors"
            >
              {language}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}