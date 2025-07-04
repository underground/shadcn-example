import React, { useState, useEffect } from "react";

export const MousePositionOverlay = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!pos) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 text-white text-xs bg-black/60 px-2 py-1 rounded whitespace-pre-wrap"
      style={{
        left: pos.x - 40,
        top: pos.y + 10,
      }}
    >
      {`x:${pos.x}px\ny:${pos.y}px`}
    </div>
  );
};
