export function Services() {
  return (
    <section id="services" className="py-16 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-[120px]">
        {/* Horizontal Rule */}
        <div className="h-[1px] bg-[#C8C2B4] mb-12 md:mb-20" />

        {/* Services Grid — alternating bg with noise boundary */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          <div className="flex-1 md:pl-0">
            <div className="text-[12px] uppercase tracking-[0.1em] text-[#7A7468] mb-4">
              01
            </div>
            <h3 className="font-['Lora'] text-[28px] md:text-[32px] leading-[1.3] text-[#1C1A16] mb-4">
              Termográfiás Vizsgálat
            </h3>
            <p className="text-[17px] leading-[1.7] text-[#7A7468]">
              Hőkamerás felvételek{' '}
              <span className="font-['Playfair_Display'] italic text-[#5C574E]">precíz</span>
              {' '}elemzése. Hotspotok, bypass diódahibák és elektromos rendellenességek azonosítása.
            </p>
          </div>
          <div className="flex-1 md:border-l border-[#C8C2B4] md:pl-8">
            <div className="text-[12px] uppercase tracking-[0.1em] text-[#7A7468] mb-4">
              02
            </div>
            <h3 className="font-['Lora'] text-[28px] md:text-[32px] leading-[1.3] text-[#1C1A16] mb-4">
              Vizuális Dokumentáció
            </h3>
            <p className="text-[17px] leading-[1.7] text-[#7A7468]">
              Nagy felbontású légi felvételek. Mechanikai sérülések, szennyeződések és szerelési hibák feltérképezése.
            </p>
          </div>
          <div className="flex-1 md:border-l border-[#C8C2B4] md:pl-8">
            <div className="text-[12px] uppercase tracking-[0.1em] text-[#7A7468] mb-4">
              03
            </div>
            <h3 className="font-['Lora'] text-[28px] md:text-[32px] leading-[1.3] text-[#1C1A16] mb-4">
              Strukturált Jelentés
            </h3>
            <p className="text-[17px] leading-[1.7] text-[#7A7468]">
              GPS-címkézett hibakatalógus{' '}
              <span className="font-['Playfair_Display'] italic text-[#5C574E]">súlyossági</span>
              {' '}besorolással. Fotóbizonyítékok és beavatkozási javaslatok.
            </p>
          </div>
        </div>

        {/* Horizontal Rule */}
        <div className="h-[1px] bg-[#C8C2B4] mt-12 md:mt-20" />
      </div>
    </section>
  );
}
