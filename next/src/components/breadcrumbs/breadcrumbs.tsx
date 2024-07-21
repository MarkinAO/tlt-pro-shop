"use client";
import { getCrumbAPI } from "@/shared/api/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const BreadCrumbs = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [points, setPoints] = useState<string[]>([]);

  const onClick = () => {
    getCrumbAPI().then((res) => {
      router.push(pathname + `/${res.name_en_us.replaceAll(" ", "-")}`);
    });
  };

  useEffect(() => {
    const newPoints = pathname.split("/").filter((el) => el !== "");
    setPoints(newPoints);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-[30px] m-auto pb-[62px]">
        <button
          className="w-[185px] button hover:bg-slate-400"
          onClick={() => onClick()}
        >
          Получить новую конченую точку
        </button>
        <div>
          {points.map((el, i) => {
            const linkHref = points.slice(0, i + 1).join("/");
            return (
              <Link href={`/${linkHref}`} key={i}>
                <span>{points.length - 1 === i ? el : el + " > "}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
