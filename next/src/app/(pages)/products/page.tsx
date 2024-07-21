"use client";
import { Panel } from "@/components";
import { ProductList } from "@/components";
import { Pagination } from "@/components/pagination/pagination";
import { useCheckAuth } from "@/shared/hooks/useCheckAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/loader/Loader";

export default function Products() {
  const router = useRouter();
  const { isAuth } = useCheckAuth();

  useEffect(() => {
    !isAuth && router.push("/");
  }, [isAuth]);

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
