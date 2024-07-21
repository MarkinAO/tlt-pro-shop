import useSWR, { mutate } from "swr";
import { fetcher } from "../api/api";
import { useStore } from "@/model/store";
import type { TProduct } from "@/model/model";

export const useDataManager = () => {
  const { currentPage, search } = useStore(
    (store) => store
  );
  const URL = `/products?_page=${currentPage}${search && "&q=" + search}`;
  const products = useSWR<TProduct[]>(URL, () =>
    fetcher(URL, {
      method: "GET",
    })
  ).data;

  const updateProducts = () => {
    mutate(URL, products);
  };

  const manufactures = useSWR<TProduct[]>("/manufacturers", () =>
    fetcher("/manufacturers", {
      method: "GET",
    })
  ).data;

  const getMore = () => {
    const URL = `/products?_page=${currentPage + 1}`;
    const products = useSWR<TProduct[]>(URL, () =>
      fetcher(URL, {
        method: "GET",
      })
    ).data;    

    if (products && products?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return {
    products,
    manufactures,
    updateProducts,
    checkMore: getMore()
  };
};
