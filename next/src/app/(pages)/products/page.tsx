"use client";
import { Panel } from "@/components";
import { ProductList } from "@/components";
import { Pagination } from "@/components/pagination/pagination";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Products() {
  const router = useRouter();
  const token = sessionStorage.getItem("token");
  
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col gap-[30px] m-auto pb-[62px]">
      <Panel />
      <ProductList />
      <Pagination />
    </div>
  );
}
