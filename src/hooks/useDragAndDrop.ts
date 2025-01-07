import { useState, useCallback } from "react";

type UseDragAndDropParams<T> = {
  items: T[];
  onUpdate: (updatedItems: T[]) => void;
};

export function useDragAndDrop<T>({
  items,
  onUpdate,
}: UseDragAndDropParams<T>) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDragStart = useCallback((index: number) => {
    setDraggingIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (event: React.DragEvent, index: number) => {
      event.preventDefault();
      if (draggingIndex === null || draggingIndex === index) return;

      const updatedItems = [...items];
      const [movedItem] = updatedItems.splice(draggingIndex, 1);
      updatedItems.splice(index, 0, movedItem);

      setDraggingIndex(index);
      onUpdate(updatedItems);
    },
    [items, draggingIndex, onUpdate]
  );

  const handleDragEnd = useCallback(() => {
    setDraggingIndex(null);
  }, []);

  return { handleDragStart, handleDragOver, handleDragEnd };
}
