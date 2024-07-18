"use client";
import { getCrumbAPI } from "@/shared/api/api";
import { useState } from "react";

interface IBreadCrumbs {}

export const BreadCrumbs = ({}: IBreadCrumbs) => {
  const [points, setPoints] = useState<string[]>([]);
  const onClick = () => {
    getCrumbAPI().then((res) => {
      setPoints([...points, res.name_ru]);
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
              <span key={i}>{points.length - 1 === i ? el : el + " > "}</span>
            );
          })}
        </div>
      </div>
    </>
  );
};
