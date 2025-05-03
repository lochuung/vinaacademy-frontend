import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LectureItem } from './LectureItem';
import { LectureDisplay } from './hooks/useCourseContent';
import { motion } from 'framer-motion';

interface SortableLectureProps {
  lecture: LectureDisplay;
  courseId: string;
  sectionId: string;
  onDelete: (sectionId: string, lectureId: string) => void;
  onEdit: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export function SortableLecture({ lecture, sectionId, ...props }: SortableLectureProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver
  } = useSortable({
    id: `lecture-${sectionId}-${lecture.id}`,
    data: { 
      type: 'lecture', 
      id: lecture.id,
      parentId: sectionId
    }
  });

  // Apply different styles based on drag state
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 1000 : 0,
    pointerEvents: isDragging ? 'none' : 'auto',
  };

  return (
    <motion.div 
      ref={setNodeRef} 
      style={style}
      initial={{ opacity: 0, y: -5 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isDragging ? 1.02 : 1,
        boxShadow: isDragging ? '0 5px 10px rgba(0,0,0,0.15)' : 'none'
      }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
      className={`
        ${isDragging ? 'lecture-dragging' : ''}
        ${isOver ? 'drop-area-over' : ''}
      `}
    >
      <LectureItem 
        lecture={lecture}
        sectionId={sectionId}
        {...props}
        onDragStart={() => {
          // Add any additional drag start logic here
          document.body.classList.add('dragging-lecture');
        }}
        onDragEnd={() => {
          // Clean up any drag state
          document.body.classList.remove('dragging-lecture');
        }}
        dragHandleProps={{
          ...attributes,
          ...listeners,
          'data-draggable': 'true',
          className: 'drag-handle'
        }}
      />
    </motion.div>
  );
}