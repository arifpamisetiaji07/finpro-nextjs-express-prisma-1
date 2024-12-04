import { create } from 'zustand'

interface IMenu {
  isOpen: boolean
  open: () => void
  close: () => void
}
export const useMenuStore = create<IMenu>((set) => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
}))