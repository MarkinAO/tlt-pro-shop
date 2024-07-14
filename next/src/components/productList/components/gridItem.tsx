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
      <div className="text-center">{name}</div>
      <div className="text-center break-all">{manufacture}</div>
      <div className="grid grid-cols-2 px-[10px]">
        <div className="text-left">{quantity}</div>
        <div className="text-right">{price}</div>
      </div>
    </div>
  );
};
