import { create } from "zustand";
import type { TProduct, TUser } from "./model";

type Store = {
  listType: boolean;
  toggleListType: () => void;
  search: string;
  setSearch: (str: string) => void;
  listProd: TProduct[];
  setProducts: (products: TProduct[]) => void;
  pages: number[];
  addPage: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  user: TUser | undefined;
  setUser: (user: TUser | undefined) => void
};

export const useStore = create<Store>()((set) => ({
  listType: true,
  toggleListType: () => set((state) => ({ listType: !state.listType })),
  search: "",
  setSearch: (str: string) => set(() => ({ search: str })),
  listProd: [],
  setProducts: (products: TProduct[]) => set(() => ({ listProd: products })),
  pages: [1],
  addPage: () =>
    set((state) => ({ pages: [...state.pages, state.pages.length + 1] })),
  currentPage: 1,
  setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
  user: undefined,
  setUser: (user: TUser | undefined) => set(() => ({ user: user })),
}));
