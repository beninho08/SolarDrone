import { useState } from 'react';

export function CTASection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section id="contact" className="py-16 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-[120px]">
        {/* Horizontal Rule */}
        <div className="h-[1px] bg-[#C8C2B4] mb-12 md:mb-20" />

        <div className="text-center max-w-[800px] mx-auto">
          <h2 className="font-['Lora'] text-[48px] md:text-[72px] leading-[1.2] text-[#1C1A16] mb-8 md:mb-12">
            Tudja meg, mit{' '}
            <span className="font-['Playfair_Display'] italic">rejt</span>
            {' '}a rendszere.
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6 md:mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@ceg.hu"
              className="flex-1 px-6 py-4 bg-transparent border border-[#C8C2B4] text-[#1C1A16] text-[17px] focus:outline-none focus:border-[#C17D3C] transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#1C1A16] text-[#F5F0E8] text-[17px] transition-all hover:bg-[#C17D3C] whitespace-nowrap"
            >
              Küldés
            </button>
          </form>

          <div className="text-[12px] text-[#7A7468]">
            vagy hívjon minket: <span className="text-[#1C1A16]">+36 30 123 4567</span>
          </div>
        </div>

        {/* Horizontal Rule */}
        <div className="h-[1px] bg-[#C8C2B4] mt-12 md:mt-20" />
      </div>
    </section>
  );
}