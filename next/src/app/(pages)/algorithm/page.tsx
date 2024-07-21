"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCheckAuth } from "@/shared/hooks/useCheckAuth";
import { BreadCrumbs } from "@/components/breadcrumbs/breadcrumbs";

export default function Algorithm() {
  const router = useRouter();
  const { isAuth, isAdmin } = useCheckAuth();

  useEffect(() => {
    if (!isAuth || !isAdmin) {
      router.push("/");
    }
  }, [isAuth]);

  return (
    <div className="p-[10px]">
      <BreadCrumbs />
    </div>
  );
}
