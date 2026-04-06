import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MapPin, Camera, FileText } from "lucide-react";

export function HowItWorks() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: MapPin,
      title: "Helyszíni felmérés",
      description: "Megbeszéljük az igényeket és felmérjük a területet",
    },
    {
      icon: Camera,
      title: "Drónos adatgyűjtés",
      description: "Termálkamerás felvételek készítése és elemzése",
    },
    {
      icon: FileText,
      title: "Jegyzőkönyv átadás",
      description: "Részletes PDF jelentés az online portálon keresztül",
    },
  ];

  return (
    <section id="mukodes" ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#00D4FF] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#2563EB] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Hogyan <span className="bg-gradient-to-r from-[#00D4FF] to-[#2563EB] text-transparent bg-clip-text">működik?</span>
          </h2>
          <p className="text-xl text-gray-400">Három egyszerű lépésben a részletes jelentésig</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-gradient-to-b from-[#0F1629] to-[#0A0F1E] border border-[#00D4FF]/20 rounded-2xl p-8 h-full hover:border-[#00D4FF] transition-all duration-300">
                {/* Step number */}
                <div className="absolute top-6 right-6 text-6xl font-bold text-[#00D4FF]/10 group-hover:text-[#00D4FF]/20 transition-colors">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00D4FF] to-[#2563EB] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-[#00D4FF] text-3xl z-20">
                    →
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
