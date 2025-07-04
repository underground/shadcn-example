import { useEffect, useState } from "react";

export const GridOverlay = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const horizontalLines = [];
  const verticalLines = [];

  for (let y = 0; y <= height; y += 100) {
    horizontalLines.push(
      <div
        key={`h-${y}`}
        className="absolute left-0 w-full border-t border-dashed border-white opacity-30 text-[10px] text-white"
        style={{ top: y }}
      >
        <span className="absolute left-1">{y}px</span>
      </div>
    );
  }

  for (let x = 0; x <= width; x += 100) {
    verticalLines.push(
      <div
        key={`v-${x}`}
        className="absolute top-0 h-full border-l border-dashed border-white opacity-30 text-[10px] text-white"
        style={{ left: x }}
      >
        <span className="absolute top-0 left-0">{x}px</span>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {horizontalLines}
      {verticalLines}
    </div>
  );
};
