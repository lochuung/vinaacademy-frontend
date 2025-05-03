import { useState } from 'react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { SectionDisplay, LectureDisplay } from './useCourseContent';

type ItemType = 'section' | 'lecture';

interface DragInfo {
  id: string;
  type: ItemType;
  parentId?: string; // For lectures, this is the section ID
}

export function useDragAndDrop(
  sections: SectionDisplay[],
  onReorderSections: (sectionIds: string[]) => Promise<void>,
  onReorderLectures: (sectionId: string, lectureIds: string[]) => Promise<void>
) {
  const [activeItem, setActiveItem] = useState<DragInfo | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle start of drag operation
  const handleDragStart = (event: DragStartEvent) => {
    const { id } = event.active;
    const idString = id.toString();
    
    // Parse the id to determine if it's a section or a lecture
    // Format: section-{sectionId} or lecture-{sectionId}-{lectureId}
    let type: ItemType = 'section';
    let itemId: string = idString;
    let parentId: string | undefined = undefined;
    
    if (idString.startsWith('lecture-')) {
      type = 'lecture';
      const parts = idString.split('-');
      if (parts.length === 3) {
        parentId = parts[1];
        itemId = parts[2];
      }
    } else if (idString.startsWith('section-')) {
      itemId = idString.substring(8); // Remove 'section-' prefix
    }
    
    setActiveItem({ id: itemId, type, parentId });
    setIsDragging(true);
  };

  // Handle drag end
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      setActiveItem(null);
      setIsDragging(false);
      return;
    }

    if (activeItem) {
      const { type, parentId } = activeItem;
      
      if (type === 'section') {
        // Reordering sections
        const oldIndex = sections.findIndex(section => section.id === active.id.toString().substring(8));
        const newIndex = sections.findIndex(section => section.id === over.id.toString().substring(8));
        
        if (oldIndex !== -1 && newIndex !== -1) {
          const newSections = arrayMove(sections, oldIndex, newIndex);
          await onReorderSections(newSections.map(section => section.id));
        }
      } else if (type === 'lecture' && parentId) {
        // Reordering lectures within a section
        const overIdString = over.id.toString();
        if (overIdString.startsWith('lecture-')) {
          const overParts = overIdString.split('-');
          if (overParts.length === 3) {
            const overSectionId = overParts[1];
            
            // Only allow reordering within the same section
            if (parentId === overSectionId) {
              const section = sections.find(s => s.id === parentId);
              if (section) {
                const oldIndex = section.lectures.findIndex(lecture => lecture.id === activeItem.id);
                const newIndex = section.lectures.findIndex(lecture => lecture.id === overParts[2]);
                
                if (oldIndex !== -1 && newIndex !== -1) {
                  const newLectures = arrayMove(section.lectures, oldIndex, newIndex);
                  await onReorderLectures(parentId, newLectures.map(lecture => lecture.id));
                }
              }
            }
          }
        }
      }
    }
    
    setActiveItem(null);
    setIsDragging(false);
  };

  return {
    sensors,
    isDragging,
    handleDragStart,
    handleDragEnd,
    activeItem,
  };
}