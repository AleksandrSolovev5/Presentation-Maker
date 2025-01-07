import { useState, useCallback } from "react";

export function useDragAndDropElement(slideSize: {
  width: number;
  height: number;
}) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [startMousePosition, setStartMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [startElementPosition, setStartElementPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleDragStart = useCallback(
    (
      id: string,
      elementPosition: { x: number; y: number },
      mousePosition: { x: number; y: number }
    ) => {
      setDraggingId(id);
      setStartMousePosition(mousePosition);
      setStartElementPosition(elementPosition);
    },
    []
  );

  const handleDrag = useCallback(
    (
      event: React.MouseEvent,
      updatePosition: (id: string, position: { x: number; y: number }) => void
    ) => {
      if (!draggingId || !startMousePosition || !startElementPosition) return;

      const deltaX = event.clientX - startMousePosition.x;
      const deltaY = event.clientY - startMousePosition.y;

      const newX = clamp(
        startElementPosition.x + deltaX,
        0,
        slideSize.width - 50
      ); // Ограничение X
      const newY = clamp(
        startElementPosition.y + deltaY,
        0,
        slideSize.height - 50
      ); // Ограничение Y

      updatePosition(draggingId, { x: newX, y: newY });
    },
    [draggingId, startMousePosition, startElementPosition, slideSize]
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setStartMousePosition(null);
    setStartElementPosition(null);
  }, []);

  return {
    handleDragStart,
    handleDrag,
    handleDragEnd,
  };
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
