import { create } from "zustand";
import type { TProduct } from "./model";

type Store = {
  listType: boolean;
  toggleListType: () => void;
  search: string;
  setSearch: (str: string) => void;
  listProd: TProduct[];
  setProducts: (products: TProduct[]) => void;
};

export const useStore = create<Store>()((set) => ({
  listType: true,
  toggleListType: () => set((state) => ({ listType: !state.listType })),
  search: "",
  setSearch: (str: string) => set(() => ({ search: str })),
  listProd: [],
  setProducts: (products: TProduct[]) => set(() => ({ listProd: products })),
}));
