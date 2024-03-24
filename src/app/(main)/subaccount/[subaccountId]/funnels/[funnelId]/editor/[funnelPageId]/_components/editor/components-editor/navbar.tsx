import { Badge } from '@/components/ui/badge';
import { EditorBtns, defaultStyles } from '@/lib/constants';
import { EditorElement } from '@/providers/editor/types';
import clsx from 'clsx';
import React from 'react';
import { v4 } from 'uuid';
import Recursive from './recursive';
import { Trash } from 'lucide-react';
import { useEditor } from '@/hooks/use-editor';

type Props = { element: EditorElement };

const Navbar = ({ element }: Props) => {
  const { id, content, name, styles, type } = element;
  const { dispatch, state } = useEditor();

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData('componentType') as EditorBtns;

    switch (componentType) {
      case 'link':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: 'Link Element',
                href: '#',
              },
              id: v4(),
              name: 'Link',
              styles: {
                color: 'black',
                ...defaultStyles,
              },
              type: 'link',
            },
          },
        });
        break;
    }
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    });
  };

  return (
    <div
      onDrop={(e) => handleOnDrop(e, 'navbar')}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleOnClickBody}
      className={clsx('relative px-0 py-2 md:px-4 lg:px-8', styles, {
        '!border-blue-500': state.editor.selectedElement.id === id,
        '!border-solid': state.editor.selectedElement.id === id,
        'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
      })}
    >
      <Badge
        className={clsx(
          'absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden',
          {
            block:
              state.editor.selectedElement.id === element.id &&
              !state.editor.liveMode,
          },
        )}
      >
        {element.name}
      </Badge>
      {state.editor.selectedElement.id === id && !state.editor.liveMode && (
        <button
          onClick={handleDeleteElement}
          className="absolute top-0 right-0 mt-2 mr-2"
        >
          <Trash size={16} />
        </button>
      )}
      <div className="flex flex-wrap justify-between items-center md:justify-start">
        {Array.isArray(content) &&
          content.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
      </div>
    </div>
  );
};

export default Navbar;
