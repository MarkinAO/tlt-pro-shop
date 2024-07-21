"use client";
import { getCrumbAPI } from "@/shared/api/api";
import Link from "next/link";
import { useState } from "react";

type EndPoint = {
  id: number;
  parent: number;
  advertisement_count: number;
  has_child_cache: boolean;
  name_en_us: string;
  name_ru: string;
  name_src: string;
};

export const BreadCrumbs = () => {
  const [points, setPoints] = useState<EndPoint[]>([]);
  const onClick = () => {
    getCrumbAPI().then((res) => {
      setPoints([...points, res]);
    });
  };

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
            return (
              // <></>
              <Link href={"/" + el.name_src.replace(" ", "-")}>
                <span key={i}>
                  {points.length - 1 === i ? el.name_ru : el.name_ru + " > "}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
