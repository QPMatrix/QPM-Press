import { EditorBtns } from '@/lib/constants';
import { MapPin } from 'lucide-react';

const MapPlaceholder = () => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData('componentType', type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'map')}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <MapPin size={40} className="text-muted-foreground" />
    </div>
  );
};
export default MapPlaceholder;
