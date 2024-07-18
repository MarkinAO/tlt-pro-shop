import type { TProduct } from "@/model/model";
import Image from "next/image";

interface IGridItem {
  item: TProduct;
  manufacture: string
}

export const GridItem = ({ item, manufacture }: IGridItem) => {
  const { photoUrl, name, quantity, price } = item;
  return (
    <div className="flex flex-col justify-between p-[10px] w-[224px] min-h-[334px] rounded-[10px]">
      <Image
        className="rounded-[10px] bg-white"
          src={photoUrl}
          width={224}
          height={224}
          alt=""
          style={{ width: "auto", height: "auto" }}
        />
      <div className="text-center text-[16px] text-slate-900">{name}</div>
      <div className="text-center break-all p-text text-slate-900">{manufacture}</div>
      <div className="grid grid-cols-2 px-[10px]">
        <div className="text-left p-text text-slate-900">{quantity}</div>
        <div className="text-right p-text text-slate-900">{price}</div>
      </div>
    </div>
  );
};
