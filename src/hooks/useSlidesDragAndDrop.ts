import { useState } from 'react';
import { Slide } from '../store/types';
import { useAppActions } from './useAppActions';

export function useSlidesDragAndDrop(slides: Slide[]) {
	const [draggedSlideId, setDraggedSlideId] = useState<string | null>(null);

	const { updateSlidesOrder } = useAppActions()

	function onDragStart(event: React.DragEvent, slideId: string) {
		setDraggedSlideId(slideId);
		event.dataTransfer.effectAllowed = 'move';
	}

	function onDragOver(event: React.DragEvent) {
		event.preventDefault();
	}

	function onDrop(_: React.DragEvent, targetSlideId: string) {

		const draggedIndex = slides.findIndex((slide) => slide.id === draggedSlideId);
		const targetIndex = slides.findIndex((slide) => slide.id === targetSlideId);

		if (draggedIndex !== targetIndex) {
			const updatedSlides = [...slides];
			const [draggedSlide] = updatedSlides.splice(draggedIndex, 1);
			updatedSlides.splice(targetIndex, 0, draggedSlide);

			updateSlidesOrder(updatedSlides);
		}

		setDraggedSlideId(null);
	}

	function onDragEnd() {
		setDraggedSlideId(null);
	}

	return {
		onDragStart,
		onDragOver,
		onDrop,
		onDragEnd,
	};
}
