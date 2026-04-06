import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

export function TrustBar() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 2500, suffix: "+", label: "Megawatt ellenőrizve" },
    { value: 150, suffix: "+", label: "Sikeres projekt" },
    { value: 5, suffix: "", label: "Év tapasztalat" },
    { value: 99.8, suffix: "%", label: "Pontosság" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 border-y border-[#00D4FF]/10 bg-gradient-to-r from-[#0A0F1E] via-[#0F1629] to-[#0A0F1E]"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00D4FF]/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-[#00D4FF] to-[#2563EB] text-transparent bg-clip-text">
                  {inView && <AnimatedNumber value={stat.value} />}
                  {stat.suffix}
                </span>
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
}
