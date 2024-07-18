"use client";
import useSWR from "swr";
import { fetcher } from "@/shared/api/api";
import type { TProduct } from "@/model/model";
import Loader from "../loader/Loader";
import { LineItem } from "./components/lineItem";
import { GridItem } from "./components/gridItem";
import { useStore } from "@/model/store";
import { useEffect } from "react";

export const ProductList = () => {
  const { listType, currentPage, search, delPage, setCurrentPage } = useStore(
    (store) => store
  );
  const URL = `/products?_page=${currentPage}${search && "&q=" + search}`;
  const { data } = useSWR<TProduct[]>(URL, () =>
    fetcher(URL, {
      method: "GET",
    })
  );

  useEffect(() => {
    if (data?.length === 0) {
      setCurrentPage(currentPage - 1);
      delPage();
    }
  }, [data]);

  const manufactures = useSWR<TProduct[]>("/manufacturers", () =>
    fetcher("/manufacturers", {
      method: "GET",
    })
  ).data;

  return (
    <>
      {listType && (
        <div className="flex justify-between py-[31px] px-[10px]">
          <div className="w-1/6 h6-text text-slate-900">Фото</div>
          <div className="w-1/6 h6-text text-slate-900 text-center">Название</div>
          <div className="w-1/6 h6-text text-slate-900 text-center">Количество</div>
          <div className="w-1/6 h6-text text-slate-900 text-center">Производитель</div>
          <div className="w-1/6 h6-text text-slate-900 text-center">Цена</div>
          <div className="w-1/6 h6-text text-slate-900"></div>
        </div>
      )}
      <div className="flex flex-col gap-[10px]">
        {!data && (
          <div className="m-auto">
            <Loader />
          </div>
        )}

        <div
          className={`${
            !listType && "grid grid-rows-2 grid-cols-4 gap-y-[10px]"
          }`}
        >
          {data?.map((el, i) => {
            const manufacture = (id: number) => {
              return manufactures?.find((el) => el.id === id)?.name;
            };
            return (
              <div key={i}>
                {listType && (
                  <LineItem
                    item={el}
                    customClass={i % 2 ? true : false}
                    manufacture={manufacture(el.id) || ""}
                    key={i}
                  />
                )}
                {!listType && (
                  <GridItem
                    item={el}
                    manufacture={manufacture(el.id) || ""}
                    key={i}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
