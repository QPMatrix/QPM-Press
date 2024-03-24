import React, { useRef, useState } from 'react';
import { useEditor } from '@/hooks/use-editor';
import { EditorBtns } from '@/lib/constants';
import { EditorElement } from '@/providers/editor/types';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';

type Props = {
  element: EditorElement;
};

const MapComponent: React.FC<Props> = (props) => {
  const { dispatch, state } = useEditor();
  const [location, setLocation] = useState(() => {
    if (Array.isArray(props.element.content)) {
      // handle the case when content is an array
      // return a default location or something else
      return { lat: 51.505, lng: -0.09 };
    } else {
      // when content is an object with a location property
      return props.element.content.location || { lat: 51.505, lng: -0.09 };
    }
  });
  const [zoom, setZoom] = useState(13);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData('componentType', type);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const styles = props.element.styles;

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    });
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place.geometry && place.geometry.location) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setLocation(newLocation);
        setZoom(15);

        dispatch({
          type: 'UPDATE_LOCATION',
          payload: {
            elementDetails: {
              ...props.element,
              content: {
                ...props.element.content,
                location: newLocation,
              },
            },
          },
        });
      }
    }
  };

  const mapStyles = {
    height: '100%',
    width: '100%',
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, 'map')}
      onClick={handleOnClickBody}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all',
        {
          '!border-blue-500':
            state.editor.selectedElement.id === props.element.id,

          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        },
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
        libraries={['places']}
      >
        {state.editor.selectedElement.id === props.element.id &&
          !state.editor.liveMode && (
            <Autocomplete
              onLoad={(ref) => (autocompleteRef.current = ref)}
              onPlaceChanged={handlePlaceChanged}
            >
              <Input
                type="text"
                placeholder="Search for a place"
                style={{ width: '100%', height: '40px' }}
              />
            </Autocomplete>
          )}
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={location}
          zoom={zoom}
          onClick={() => {
            if (state.editor.liveMode) {
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
              );
            }
          }}
        />
      </LoadScript>
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default MapComponent;
