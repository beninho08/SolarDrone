import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hovering-link" | "hovering-image";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [state, setState] = useState<CursorState>("default");
  const [isLeaving, setIsLeaving] = useState(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setPosition({ ...posRef.current });
          rafRef.current = 0;
        });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a");
      const isImage =
        target.tagName === "IMG" || target.closest("img");

      if (isImage) {
        setState("hovering-image");
        setIsLeaving(false);
      } else if (isLink) {
        setState("hovering-link");
        setIsLeaving(false);
      } else {
        if (state !== "default") setIsLeaving(true);
        setState("default");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state]);

  useEffect(() => {
    if (isLeaving) {
      const t = setTimeout(() => setIsLeaving(false), 300);
      return () => clearTimeout(t);
    }
  }, [isLeaving]);

  const isExpanded = state === "hovering-link" || state === "hovering-image";
  const size = isExpanded ? 40 : 8;

  const expandTransition = isExpanded
    ? "width 0.01s ease, height 0.01s ease, background-color 0.01s ease"
    : "width 0.3s ease, height 0.3s ease, background-color 0.3s ease";

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      {/* Main cursor circle */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          backgroundColor: isExpanded ? "transparent" : "#1C1A16",
          border: isExpanded ? "1px solid #C17D3C" : "none",
          transition: expandTransition,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {state === "hovering-image" && (
          <span
            className="text-[8px] font-medium tracking-[0.15em] text-[#C17D3C] select-none"
            style={{ transform: "rotate(-90deg)", whiteSpace: "nowrap" }}
          >
            NÉZD
          </span>
        )}
      </div>
    </>
  );
}
