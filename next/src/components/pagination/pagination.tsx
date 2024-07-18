"use client";
import { useStore } from "@/model/store";
import Image from "next/image";
import leftArrow from "./assets/leftArrow.svg";
import rightArrow from "./assets/rightArrow.svg";

export const Pagination = () => {
  const { pages, addPage, currentPage, setCurrentPage } = useStore(
    (state) => state
  );
  return (
    <>
      <div className="m-auto">
        <button
          className="button hover:bg-slate-400"
          onClick={() => {
            addPage();
            setCurrentPage(currentPage + 1);
          }}
        >
          Загрузить ещё
        </button>
      </div>

      <div className="flex gap-[10px] m-auto items-center">
        <Image
          className="cursor-pointer"
          src={leftArrow}
          alt=""
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
        />
        {pages.map((el) => {
          let text = "";
          if (pages.length <= 5) {
            text = String(el);
          } else {
            if (
              el === 1 ||
              el === pages.length ||
              el === currentPage ||
              (el >= currentPage - 2 && el <= currentPage + 2) ||
              (currentPage >= pages.length - 4 && el >= pages.length - 6) ||
              (currentPage <= 5 && el <= 7)
            ) {
              text = String(el);
            } else if (el === 2 || el === pages.length - 1) {
              text = "...";
            } else {
              return;
            }
          }
          return (
            <div
              className={`flex justify-center items-center w-[20px] h-[20px] rounded-[2px] cursor-pointer ${
                el === currentPage && "bg-slate-200"
              }`}
              onClick={() => {
                setCurrentPage(el);
              }}
              key={el}
            >
              {text}
            </div>
          );
        })}
        <Image
          className="cursor-pointer"
          src={rightArrow}
          alt=""
          onClick={() => {
            if (currentPage !== pages.length) {
              setCurrentPage(currentPage + 1);
            }
          }}
        />
      </div>
    </>
  );
};
