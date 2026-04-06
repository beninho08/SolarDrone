import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Portfolio() {
  const projects = [
    {
      name: 'Székesfehérvár Ipari Park',
      location: 'Székesfehérvár',
      finding: '23 bypass diódahiba azonosítva',
      date: '2025. November',
      number: '01'
    },
    {
      name: 'Kecskemét Déli Napelemfarm',
      location: 'Kecskemét',
      finding: '147 panel hotspot kimutatása',
      date: '2025. Október',
      number: '02'
    },
    {
      name: 'Debrecen Logisztikai Központ',
      location: 'Debrecen',
      finding: 'Árnyékolási probléma feltérképezése',
      date: '2025. Szeptember',
      number: '03'
    },
    {
      name: 'Budapest Office Complex',
      location: 'Budapest',
      finding: '8 meghibásodott inverter lokalizálása',
      date: '2025. Augusztus',
      number: '04'
    }
  ];

  return (
    <section id="portfolio" className="py-16 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-[120px]">
        <h2 className="font-['Lora'] text-[36px] md:text-[48px] leading-[1.2] text-[#1C1A16] mb-12 md:mb-16">
          Referenciák
        </h2>

        {/* Projects Grid — with ghost watermark numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-12 md:mb-20">
          {projects.map((project, idx) => (
            <div key={idx} className="border-t border-[#C8C2B4] pt-6 relative overflow-hidden">
              {/* Ghost watermark number */}
              <span
                className="absolute top-[-20px] left-[-10px] font-['Lora'] text-[140px] md:text-[180px] font-bold text-[#1C1A16] opacity-[0.06] leading-none select-none pointer-events-none"
                style={{ transform: 'rotate(-3deg)' }}
                aria-hidden="true"
              >
                {project.number}
              </span>
              <div className="relative z-10">
                <h4 className="font-['Lora'] text-[20px] md:text-[24px] text-[#1C1A16] mb-2">
                  {project.name}
                </h4>
                <div className="text-[14px] text-[#7A7468] mb-1">
                  {project.location}
                </div>
                <div className="text-[17px] text-[#1C1A16] mb-2">
                  {project.finding}
                </div>
                <div className="text-[12px] uppercase tracking-[0.1em] text-[#7A7468]">
                  {project.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-width Featured Image with Quote */}
        <div className="relative h-[300px] md:h-[500px] mb-8">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1749192901190-ea45a711b0e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc29sYXIlMjBmYXJtJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzU1MDM5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Napelem rendszer légi felvétel"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-[90%] md:max-w-[600px]">
            <blockquote className="font-['Lora'] italic text-[24px] md:text-[32px] leading-[1.4] text-[#F5F0E8]">
              „A termográfiás vizsgálat olyan hibákat tárt fel, amelyeket éves karbantartáskor sosem találtunk volna meg."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
