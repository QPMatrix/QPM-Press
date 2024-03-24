import { EditorAction } from './actions';
import { EditorElement } from './types';

export const addAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== 'ADD_ELEMENT')
    throw Error(
      'You sent the wrong action type to the Add Element editor State',
    );
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      };
    }
    return item;
  });
};
//recursive function to update an element in the editor state
export const updateAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== 'UPDATE_ELEMENT') {
    throw Error('You sent the wrong action type to the update Element State');
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      };
    }
    return item;
  });
};
export const deleteAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== 'DELETE_ELEMENT')
    throw Error(
      'You sent the wrong action type to the Delete Element editor State',
    );
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false;
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action);
    }
    return true;
  });
};
//recursive function to update an element's location in the editor state
export const updateElementLocation = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== 'UPDATE_LOCATION') {
    throw Error(
      'You sent the wrong action type to the update Element Location State',
    );
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return {
        ...item,
        content: {
          ...item.content,
          location: action.payload.elementDetails.content.location,
        },
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateElementLocation(item.content, action),
      };
    }
    return item;
  });
};
