import type { TProduct } from "@/model/model";
import Image from "next/image";
import editIcon from "./assets/edit.svg";
import deleteIcon from "./assets/delete.svg";
import { CreatePopup } from "@/components/popups/createPopup";
import { DeletePopup } from "@/components/popups/deletePopup";
import { useState } from "react";
import { useCheckAuth } from "@/shared/hooks/useCheckAuth";

interface ILineItem {
  item: TProduct;
  customClass?: boolean;
  manufacture: string;
}

export const LineItem = ({ item, customClass, manufacture }: ILineItem) => {
  const { photoUrl, name, quantity, price } = item;
  const [popup, setPopup] = useState(false);
  const [delPopup, setDelPopup] = useState(false);
  const [id, setId] = useState("");
  const togglePopup = (flag: boolean, func: Function) => func(!flag);
  const { isAdmin } = useCheckAuth();

  return (
    <>
      {delPopup && (
        <DeletePopup closeHandler={() => togglePopup(delPopup, setDelPopup)} id={id} />
      )}
      {popup && <CreatePopup closeHandler={() => togglePopup(popup, setPopup)} id={id} />}
      <div
        className={`flex justify-between h-[80px] px-[10px] items-center rounded-[6px] ${
          customClass && "bg-[#0F172A]/[.03]"
        }`}
      >
        <div className="w-1/6 ">
          <Image
            src={photoUrl}
            width={56}
            height={56}
            alt=""
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <div className="w-1/6 text-center p-text text-slate-900">{name}</div>
        <div className="w-1/6 text-center p-text text-slate-900">{quantity}</div>
        <div className="w-1/6 text-center p-text text-slate-900 break-all">{manufacture}</div>
        <div className="w-1/6 text-center p-text text-slate-900">{price} р</div>
        <div className="w-1/6 text-center p-text text-slate-900 flex gap-[10px] justify-end px-[10px]">
          {isAdmin && (
            <Image
              onClick={() => {
                setId(String(item.id));
                togglePopup(popup, setPopup);
              }}
              className="cursor-pointer"
              src={editIcon}
              alt=""
              style={{ width: "auto", height: "auto" }}
            />
          )}
          {isAdmin && (
            <Image
              onClick={() => {
                setId(String(item.id));
                togglePopup(delPopup, setDelPopup);
              }}
              className="cursor-pointer"
              src={deleteIcon}
              alt=""
              style={{ width: "auto", height: "auto" }}
            />
          )}
        </div>
      </div>
    </>
  );
};
