"use client";
import { useStore } from "@/model/store";

export const Pagination = () => {
  const { pages, addPage, currentPage, setCurrentPage } = useStore(
    (state) => state
  );
  return (
    <div className="flex gap-[10px] m-auto items-center">
      <svg
        className="cursor-pointer"
        onClick={() => {
          if (currentPage > 1) setCurrentPage(currentPage - 1);
        }}
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.71967 7.96967C6.42678 8.26256 6.42678 8.73744 6.71967 9.03033L14.2197 16.5303C14.5126 16.8232 14.9874 16.8232 15.2803 16.5303C15.5732 16.2374 15.5732 15.7626 15.2803 15.4697L8.31066 8.5L15.2803 1.53033C15.5732 1.23744 15.5732 0.762563 15.2803 0.46967C14.9874 0.176777 14.5126 0.176777 14.2197 0.46967L6.71967 7.96967Z"
          fill="#0F172A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.719669 7.96967C0.426776 8.26256 0.426776 8.73744 0.719669 9.03033L8.21967 16.5303C8.51256 16.8232 8.98744 16.8232 9.28033 16.5303C9.57322 16.2374 9.57322 15.7626 9.28033 15.4697L2.31066 8.5L9.28033 1.53033C9.57322 1.23744 9.57322 0.762563 9.28033 0.46967C8.98744 0.176777 8.51256 0.176777 8.21967 0.46967L0.719669 7.96967Z"
          fill="#0F172A"
        />
      </svg>
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
      <svg
        className="cursor-pointer"
        onClick={() => {
          setCurrentPage(currentPage + 1);
          if (currentPage === pages.length) {
            addPage();
          }
        }}
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.28033 7.96967C9.57322 8.26256 9.57322 8.73744 9.28033 9.03033L1.78033 16.5303C1.48744 16.8232 1.01256 16.8232 0.71967 16.5303C0.426777 16.2374 0.426777 15.7626 0.71967 15.4697L7.68934 8.5L0.719671 1.53033C0.426777 1.23744 0.426777 0.762563 0.719671 0.46967C1.01256 0.176777 1.48744 0.176777 1.78033 0.46967L9.28033 7.96967Z"
          fill="#0F172A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.2803 7.96967C15.5732 8.26256 15.5732 8.73744 15.2803 9.03033L7.78033 16.5303C7.48744 16.8232 7.01256 16.8232 6.71967 16.5303C6.42678 16.2374 6.42678 15.7626 6.71967 15.4697L13.6893 8.5L6.71967 1.53033C6.42678 1.23744 6.42678 0.762563 6.71967 0.46967C7.01256 0.176777 7.48744 0.176777 7.78033 0.46967L15.2803 7.96967Z"
          fill="#0F172A"
        />
      </svg>
    </div>
  );
};
