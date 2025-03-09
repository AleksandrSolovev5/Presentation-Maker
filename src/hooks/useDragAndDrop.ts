import { useState, useEffect } from 'react';
import { Slide } from '../store/types';
import { useAppActions } from './useAppActions';

export function useDragAndDrop(slide: Slide, selectedElementId: string | null) {
    const [activeHandle, setActiveHandle] = useState<string | null>(null);
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
    const [tempSlide, setTempSlide] = useState(slide);

    const { updateElementSize, updateElementPosition } = useAppActions();

    useEffect(() => {
        setTempSlide(slide);
    }, [slide]);

    function onDragStart(event: React.MouseEvent, handleId: string | null) {
        setActiveHandle(handleId); 
        setDragStart({ x: event.clientX, y: event.clientY });
    }

    function onDragOrResize(event: React.MouseEvent) {
        if (!dragStart || !selectedElementId) return;
        const deltaX = event.clientX - dragStart.x;
        const deltaY = event.clientY - dragStart.y;

        const tempContent = [...tempSlide.content];
        const elementIndex = tempContent.findIndex((el) => el.id === selectedElementId);
        if (elementIndex === -1) return;

        const element = { ...tempContent[elementIndex] };

        if (activeHandle) {
            const { x, y } = element.position;
            const { width, height } = element.size;
            let newWidth = width, newHeight = height, newX = x, newY = y;

            switch (activeHandle) {
                case 'top-left':
                    newWidth = width - deltaX;
                    newHeight = height - deltaY;
                    newX = x + deltaX;
                    newY = y + deltaY;
                    break;
                case 'top-right':
                    newWidth = width + deltaX;
                    newHeight = height - deltaY;
                    newY = y + deltaY;
                    break;
                case 'bottom-left':
                    newWidth = width - deltaX;
                    newHeight = height + deltaY;
                    newX = x + deltaX;
                    break;
                case 'bottom-right':
                    newWidth = width + deltaX;
                    newHeight = height + deltaY;
                    break;
                case 'center-left':
                    newWidth = width - deltaX;
                    newX = x + deltaX;
                    break;
                case 'center-right':
                    newWidth = width + deltaX;
                    break;
                case 'center-top':
                    newHeight = height - deltaY;
                    newY = y + deltaY;
                    break;
                case 'center-bottom':
                    newHeight = height + deltaY;
                    break;
            }

            if (newWidth > 20 && newHeight > 20) {
                element.size = { width: newWidth, height: newHeight };
                element.position = { x: newX, y: newY };
            }
        } else {
            const newPosition = {
                x: element.position.x + deltaX,
                y: element.position.y + deltaY,
            };
            element.position = newPosition;
        }

        tempContent[elementIndex] = element;
        setTempSlide({ ...tempSlide, content: tempContent });
        setDragStart({ x: event.clientX, y: event.clientY });
    }

    function onDragEnd() {
        if (!selectedElementId) return;

        const element = tempSlide.content.find((el) => el.id === selectedElementId);
        if (!element) return;

        updateElementSize(selectedElementId, element.size,);
        updateElementPosition(selectedElementId, element.position,);

        setActiveHandle(null);
        setDragStart(null);
    }

    function getResizeHandles() {
        if (!selectedElementId) return [];

        const element = tempSlide.content.find((el) => el.id === selectedElementId);
        if (!element) return [];

        const { x, y } = element.position;
        const { width, height } = element.size;

        return [
            { id: 'top-left', x, y },
            { id: 'top-right', x: x + width + 2, y },
            { id: 'bottom-left', x, y: y + height + 2 },
            { id: 'bottom-right', x: x + width + 2, y: y + height + 2 },
            { id: 'center-left', x, y: y + height / 2 },
            { id: 'center-right', x: x + width + 2, y: y + height / 2 },
            { id: 'center-top', x: x + width / 2, y },
            { id: 'center-bottom', x: x + width / 2, y: y + height + 2 },
        ];
    }

    return {
        tempSlide, 
        onDragStart,
        onDragOrResize,
        onDragEnd,
        getResizeHandles,
    };
}

