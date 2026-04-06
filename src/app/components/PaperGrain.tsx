export function PaperGrain() {
  return (
    <svg className="fixed inset-0 w-full h-full z-[9990] pointer-events-none" aria-hidden="true">
      <defs>
        <filter id="paper-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect
        width="100%"
        height="100%"
        filter="url(#paper-grain)"
        opacity="0.04"
      />
    </svg>
  );
}
