// packages/store/overlay-loader.ts
import {create} from "zustand";

type OverlayState = {
  open: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

export const useOverlayLoader = create<OverlayState>((set) => ({
  open: false,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
  toggle: () => set((s) => ({ open: !s.open })),
}));

// small helpers so pages/components don't need to import the hook if they want direct control:
export const showOverlay = () => useOverlayLoader.setState({ open: true });
export const hideOverlay = () => useOverlayLoader.setState({ open: false });
export const toggleOverlay = () => useOverlayLoader.getState().toggle();

