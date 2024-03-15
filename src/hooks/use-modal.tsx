"use client";

import { ModalContext } from "@/providers/modal-provider";
import { useContext } from "react";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a modal provider");
  }
  return context;
};
