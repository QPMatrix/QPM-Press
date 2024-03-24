import { EditorBtns } from '@/lib/constants';

export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet';

export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorBtns;
  content:
    | EditorElement[]
    | {
        href?: string;
        innerText?: string | string[];
        src?: string;
        location?: {
          lat: number;
          lng: number;
        };
        zoom?: number;
      };
};

export type Editor = {
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement;
  device: DeviceTypes;
  previewMode: boolean;
  funnelPageId: string;
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

export const initialEditorState: EditorState['editor'] = {
  elements: [
    {
      content: [],
      id: '__body',
      name: 'Body',
      styles: {},
      type: '__body',
    },
  ],
  selectedElement: {
    id: '',
    content: [],
    name: '',
    styles: {},
    type: null,
  },
  device: 'Desktop',
  previewMode: false,
  liveMode: false,
  funnelPageId: '',
};

export const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

export const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};
