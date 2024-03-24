import { Dispatch, createContext, useReducer } from 'react';
import { FunnelPage } from '@prisma/client';
import { EditorState, initialState } from './types';
import { EditorAction } from './actions';
import { editorReducer } from './reducer';

export const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
  subaccountId: string;
  funnelId: string;
  pageDetails: FunnelPage | null;
}>({
  state: initialState,
  dispatch: () => undefined,
  subaccountId: '',
  funnelId: '',
  pageDetails: null,
});
