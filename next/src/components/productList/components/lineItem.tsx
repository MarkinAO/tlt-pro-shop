import type { TProduct } from "@/model/model";
import Image from "next/image";
import editIcon from "./assets/edit.svg";
import deleteIcon from "./assets/delete.svg";
import { CreatePopup } from "../../popups/createPopup";
import { useState } from "react";

interface ILineItem {
  item: TProduct;
  customClass?: boolean;
  manufacture: string;
}

export const LineItem = ({ item, customClass, manufacture }: ILineItem) => {
  const { photoUrl, name, quantity, price } = item;
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");
  const togglePopup = () => setPopup(!popup);
  const isAdmin = JSON.parse(
    sessionStorage.getItem("user") || ""
  ).roles.includes(1);
  return (
    <>
      {popup && <CreatePopup closeHandler={togglePopup} id={id} />}
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
        <div className="w-1/6 text-center">{name}</div>
        <div className="w-1/6 text-center">{quantity}</div>
        <div className="w-1/6 text-center break-all">{manufacture}</div>
        <div className="w-1/6 text-center">{price} р</div>
        <div className="w-1/6 text-center flex gap-[10px] justify-end px-[10px]">
          {isAdmin && (
            <Image
              onClick={() => {
                setId(String(item.id));
                togglePopup();
              }}
              className="cursor-pointer"
              src={editIcon}
              alt=""
              style={{ width: "auto", height: "auto" }}
            />
          )}
          {isAdmin && (
            <Image
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
