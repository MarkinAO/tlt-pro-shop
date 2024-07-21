import { FormEvent, useEffect, useState } from "react";
import { Popup } from "../layouts/popup";
import { deleteAPI, getProductAPI } from "@/shared/api/api";
import type { TProduct } from "@/model/model";
import Image from "next/image";
import { useDataManager } from "@/shared/hooks/useDataManager";

interface ICreatePopup {
  closeHandler: Function;
  id: string;
}

export const DeletePopup = ({ closeHandler, id }: ICreatePopup) => {
  const [confirmation, setConfirmation] = useState(false);
  const [product, setProduct] = useState<TProduct>();
  const { manufactures, updateProducts } = useDataManager();

  const onSubmit = (id: string, event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    deleteAPI(id);
    closeHandler();
    updateProducts();
  };

  useEffect(() => {
    getProductAPI(id).then((res) => setProduct(res));
  }, []);
  const manufacture = manufactures?.find(
    (el) => el.id === product?.manufacturerId
  );

  return (
    <Popup onSubmit={(e) => onSubmit(id, e)}>
      {!confirmation && product && (
        <>
          <div className="flex items-center min-h-[224px]">
            <Image
              className="rounded-[10px]"
              width={224}
              height={224}
              src={product?.photoUrl ? product?.photoUrl : ""}
              alt={product.name}
            />
          </div>
          <h2 className="text-slate-900 text-center">{product.name}</h2>
          <div className="w-full text-left">Количество: {product.quantity}</div>
          <div className="w-full text-left">Цена: {product.price}</div>
          <div className="w-full text-left">
            Производитель: {manufacture?.name}
          </div>
          <div className="flex gap-[10px] justify-end w-full">
            <button
              className="black-button"
              type="submit"
              onClick={() => setConfirmation(!confirmation)}
            >
              Удалить
            </button>
            <button
              className="button hover:bg-slate-400"
              onClick={() => closeHandler()}
            >
              Назад
            </button>
          </div>
        </>
      )}
      {confirmation && (
        <>
          <h2 className="text-slate-900">
            Вы действительно хотите удалить товар?
          </h2>
          <div className="flex gap-[10px] justify-end w-full">
            <button
              className="button hover:bg-slate-400"
              onClick={() => setConfirmation(!confirmation)}
            >
              Отмена
            </button>
            <button className="black-button" type="submit">
              Удалить
            </button>
          </div>
        </>
      )}
    </Popup>
  );
};
