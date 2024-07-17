"use client";
import { Panel } from "@/components";
import { ProductList } from "@/components";
import { Pagination } from "@/components/pagination/pagination";
import { useCheckAuth } from "@/shared/hooks/checkAuth";
import Loader from "@/components/loader/Loader";

export default function Products() {
  const { isAuth } = useCheckAuth();
  return (
    <>
      {!isAuth && (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      )}
      {isAuth && (
        <div className="flex flex-col gap-[30px] m-auto pb-[62px]">
          <Panel />
          <ProductList />
          <Pagination />
        </div>
      )}
    </>
  );
}
