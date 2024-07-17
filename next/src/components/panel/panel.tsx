"use client";
import { useStore } from "@/model/store";
import { CreatePopup } from "../popups/createPopup";
import { useCheckAuth } from "@/shared/hooks/checkAuth";
import { useState } from "react";

export const Panel = () => {
  const { listType, toggleListType, search, setSearch } = useStore(
    (state) => state
  );
  const [popup, setPopup] = useState(false);
  const { isAdmin } = useCheckAuth();
  const togglePopup = () => setPopup(!popup);  

  return (
    <>
      {popup && <CreatePopup closeHandler={togglePopup} />}
      <div className="flex justify-between gap-1 items-center p-[10px] w-full">
        <input
          className="input w-[240px]"
          type="text"
          placeholder="Поиск"
          value={search}
          onChange={(event) => setSearch(event?.target.value)}
        />
        <div className="flex gap-[16px]">
          <div className="flex">
            <svg
              width="50"
              height="39"
              viewBox="0 0 50 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rounded-l-lg cursor-pointer"
              onClick={() => toggleListType()}
            >
              <rect
                width="50"
                height="39"
                fill={listType ? "#64748B" : "#cbd5e1"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.8125 14.25C15.8125 13.6287 16.3162 13.125 16.9375 13.125C17.5588 13.125 18.0625 13.6287 18.0625 14.25C18.0625 14.8713 17.5588 15.375 16.9375 15.375C16.3162 15.375 15.8125 14.8713 15.8125 14.25ZM20.6875 14.25C20.6875 13.8358 21.0233 13.5 21.4375 13.5H33.4375C33.8517 13.5 34.1875 13.8358 34.1875 14.25C34.1875 14.6642 33.8517 15 33.4375 15H21.4375C21.0233 15 20.6875 14.6642 20.6875 14.25ZM15.8125 19.5C15.8125 18.8787 16.3162 18.375 16.9375 18.375C17.5588 18.375 18.0625 18.8787 18.0625 19.5C18.0625 20.1213 17.5588 20.625 16.9375 20.625C16.3162 20.625 15.8125 20.1213 15.8125 19.5ZM20.6875 19.5C20.6875 19.0858 21.0233 18.75 21.4375 18.75H33.4375C33.8517 18.75 34.1875 19.0858 34.1875 19.5C34.1875 19.9142 33.8517 20.25 33.4375 20.25H21.4375C21.0233 20.25 20.6875 19.9142 20.6875 19.5ZM15.8125 24.75C15.8125 24.1287 16.3162 23.625 16.9375 23.625C17.5588 23.625 18.0625 24.1287 18.0625 24.75C18.0625 25.3713 17.5588 25.875 16.9375 25.875C16.3162 25.875 15.8125 25.3713 15.8125 24.75ZM20.6875 24.75C20.6875 24.3358 21.0233 24 21.4375 24H33.4375C33.8517 24 34.1875 24.3358 34.1875 24.75C34.1875 25.1642 33.8517 25.5 33.4375 25.5H21.4375C21.0233 25.5 20.6875 25.1642 20.6875 24.75Z"
                fill="#1E293B"
              />
            </svg>
            <svg
              width="50"
              height="39"
              viewBox="0 0 50 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rounded-r-lg cursor-pointer"
              onClick={() => toggleListType()}
            >
              <rect
                width="50"
                height="39"
                fill={listType ? "#cbd5e1" : "#64748B"}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 13.5C16 11.8431 17.3431 10.5 19 10.5H21.25C22.9069 10.5 24.25 11.8431 24.25 13.5V15.75C24.25 17.4069 22.9069 18.75 21.25 18.75H19C17.3431 18.75 16 17.4069 16 15.75V13.5ZM25.75 13.5C25.75 11.8431 27.0931 10.5 28.75 10.5H31C32.6569 10.5 34 11.8431 34 13.5V15.75C34 17.4069 32.6569 18.75 31 18.75H28.75C27.0931 18.75 25.75 17.4069 25.75 15.75V13.5ZM16 23.25C16 21.5931 17.3431 20.25 19 20.25H21.25C22.9069 20.25 24.25 21.5931 24.25 23.25V25.5C24.25 27.1569 22.9069 28.5 21.25 28.5H19C17.3431 28.5 16 27.1569 16 25.5V23.25ZM25.75 23.25C25.75 21.5931 27.0931 20.25 28.75 20.25H31C32.6569 20.25 34 21.5931 34 23.25V25.5C34 27.1569 32.6569 28.5 31 28.5H28.75C27.0931 28.5 25.75 27.1569 25.75 25.5V23.25Z"
                fill="#1E293B"
              />
            </svg>
          </div>
          <button
            className={`button ${!isAdmin && "hover:bg-slate-300"}`}
            disabled={!isAdmin}
            onClick={() => togglePopup()}
          >
            Добавить
          </button>
        </div>
      </div>
    </>
  );
};
