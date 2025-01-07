import { useState } from "react";

type ResizeData = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export const useResizeElement = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [originalSize, setOriginalSize] = useState<ResizeData | null>(null);

  const startResize = (
    e: React.MouseEvent,
    initialData: ResizeData
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY });
    setOriginalSize(initialData);
  };

  const handleResize = (
    e: MouseEvent,
    onResize: (data: ResizeData) => void
  ) => {
    if (!isResizing || !resizeStart || !originalSize) return;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    let newWidth = originalSize.width + deltaX;
    let newHeight = originalSize.height + deltaY;

    // Ограничиваем минимальные размеры
    newWidth = Math.max(50, newWidth);
    newHeight = Math.max(50, newHeight);

    onResize({
      width: newWidth,
      height: newHeight,
      x: originalSize.x,
      y: originalSize.y,
    });
  };

  const stopResize = () => {
    setIsResizing(false);
    setResizeStart(null);
    setOriginalSize(null);
  };

  return {
    startResize,
    handleResize,
    stopResize,
    isResizing,
  };
};
