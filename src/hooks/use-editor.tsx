'use client';
import { EditorContext } from '@/providers/editor/editor-provider';
import { useContext } from 'react';

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(
      'the use Editor Hook must be used within the editor provider',
    );
  }
  return context;
};
