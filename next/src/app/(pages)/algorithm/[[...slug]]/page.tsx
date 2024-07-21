"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useCheckAuth } from "@/shared/hooks/useCheckAuth";
import { BreadCrumbs } from "@/components/breadcrumbs/breadcrumbs";

export default function Algorithm() {
  const { isAuth, isAdmin } = useCheckAuth();

  useEffect(() => {
    if (!isAuth || !isAdmin) {
      redirect("/");
    }
  }, [isAuth]);

  return (
    <>
      {isAuth && isAdmin && (
        <div className="p-[10px]">
          <BreadCrumbs />
        </div>
      )}
    </>
  );
}
