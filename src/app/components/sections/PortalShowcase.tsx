import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Mail, Link as LinkIcon, Lock, Download } from "lucide-react";
import { Link } from "react-router";

export function PortalShowcase() {
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
    { icon: Mail, text: "Email érkezik" },
    { icon: LinkIcon, text: "Link megnyitása" },
    { icon: Lock, text: "Kód beírása" },
    { icon: Download, text: "Jegyzőkönyv letöltése" },
  ];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00D4FF] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Biztonságos <span className="bg-gradient-to-r from-[#00D4FF] to-[#2563EB] text-transparent bg-clip-text">dokumentum portál</span>
          </h2>
          <p className="text-xl text-gray-400">Hozzáférés a jelentésekhez egyedi kóddal</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Flow steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#00D4FF] to-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="h-0.5 bg-gradient-to-r from-[#00D4FF] to-transparent group-hover:from-[#2563EB] transition-colors" />
                </div>
                <div className="text-lg font-semibold">{step.text}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Portal mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/30 to-[#2563EB]/30 rounded-3xl blur-3xl" />
            
            {/* Portal card */}
            <div className="relative bg-[#0F1629] border border-[#00D4FF]/30 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 text-xl font-bold mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00D4FF] to-[#2563EB] rounded-lg" />
                  <span className="bg-gradient-to-r from-[#00D4FF] to-[#2563EB] text-transparent bg-clip-text">
                    SolarDrone
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center mb-2">
                Dokumentum megtekintése
              </h3>
              <p className="text-gray-400 text-center mb-8">
                Adja meg az egyedi kódját
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Egyedi kód"
                  className="w-full px-4 py-3 bg-[#0A0F1E] border border-[#00D4FF]/30 rounded-lg focus:outline-none focus:border-[#00D4FF] transition-colors text-white placeholder-gray-500"
                  disabled
                />

                <Link to="/portal">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#00D4FF] to-[#2563EB] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00D4FF]/50 transition-all"
                  >
                    Dokumentum megtekintése
                  </motion.button>
                </Link>
              </div>

              <div className="mt-6 text-center">
                <span className="text-sm text-gray-500">
                  Biztonságos és titkosított hozzáférés
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
