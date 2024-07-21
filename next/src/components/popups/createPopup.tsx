import { Popup } from "../layouts/popup";
import type { TProduct, TManufacture } from "@/model/model";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAPI, updateAPI } from "@/shared/api/api";
import { useDataManager } from "@/shared/hooks/useDataManager";
import Image from "next/image";
import arrow from "./assets/arrow.svg";
import fileBox from "./assets/fileBox.svg";
import cross from "./assets/cross.svg";

const formSchema = z.object({
  name: z.string().min(1),
  quantity: z.string().min(1),
  price: z.string().min(1),
});

type FormFields = z.infer<typeof formSchema>;

interface ICreatePopup {
  closeHandler: Function;
  id?: string;
}

export const CreatePopup = ({ closeHandler, id = "" }: ICreatePopup) => {
  const [manufacture, setManufacture] = useState<TManufacture | null>();
  const [hidden, toggleHidden] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [product, setProduct] = useState<TProduct | undefined>(undefined);
  const filePicker = useRef<HTMLInputElement>(null);
  const { products, manufactures, updateProducts } = useDataManager();

  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
    setValue,
    trigger,
  } = useForm<FormFields>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const newProd = products?.find((el) => el.id === Number(id));
    setProduct(newProd);
  }, []);

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("quantity", String(product.quantity));
      setValue("price", product.price);
      setImageUrl(product.photoUrl);
      setManufacture(
        manufactures?.find((el) => el.id === product.manufacturerId) || null
      );
      const getBlob = async () => await (await fetch(product.photoUrl)).blob();
      getBlob()
        .then((res) => {
          const newFile = new File([res], "new_image.jpg", {
            type: "image/jpeg",
          });
          setFile(newFile);
        })
        .catch((error) => console.error(error.message));
      trigger();
    }
  }, [product]);

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("price", data.price);
    formData.set("quantity", data.quantity);
    formData.set("manufacturerId", String(manufacture?.id));

    if (file) {
      formData.set("image", file, file.name);
    }

    if (id.length > 0) {
      updateAPI(formData, id);
    } else {
      createAPI(formData);
    }
    reset();
    setManufacture(null);
    updateProducts();
    closeHandler();
  };

  return (
    <Popup onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-slate-900">Создание товара</h2>
      <div className="w-full">
        <h6 className="text-zinc-900">Название</h6>
        <input
          className="input w-full"
          type="text"
          placeholder="Название"
          {...register("name")}
        />
      </div>
      <div className="w-full">
        <h6 className="text-zinc-900">Количество</h6>
        <input
          className="input w-full"
          type="text"
          placeholder="Количество"
          {...register("quantity")}
        />
      </div>
      <div className="w-full">
        <h6 className="text-zinc-900">Цена</h6>
        <input
          className="input w-full"
          type="text"
          placeholder="Цена"
          {...register("price")}
        />
      </div>
      <div className="w-full">
        <h6 className="text-zinc-900">Производиткль</h6>
        <div className="relative">
          <input
            className={`p-text h-[30px] bg-[#C9CFD8] opacity-[0.88] cursor-pointer placeholder:text-[#888F99] pl-[10px] pr-[30px] py-[6px] block rounded-md outline-none w-full ${
              !hidden && "rounded-b-none"
            }`}
            type="text"
            placeholder="Компания"
            defaultValue={manufacture?.name}
            readOnly
            onClick={() => toggleHidden(!hidden)}
          />
          <Image
            className={`absolute top-[10px] right-[10px] cursor-pointer ${
              !hidden && "rotate-180"
            }`}
            src={arrow}
            alt=""
            onClick={() => toggleHidden(!hidden)}
          />
        </div>
        <div
          className={`text-[#111827] p-text bg-[#C9CFD8] opacity-[0.88] p-[10px] py-[6px] rounded-b-md outline-none ${
            hidden && "hidden"
          }`}
        >
          {manufactures?.map((el) => {
            return (
              <div
                key={el.id}
                className="hover:text-neutral-100 cursor-pointer"
                onClick={() => {
                  setManufacture(el);
                }}
              >
                {el.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <h6 className="text-zinc-900">Фото</h6>
        <div
          className="flex flex-col items-center gap-[10px] py-[10px] min-h-[120px] cursor-pointer"
          onClick={() => {
            filePicker.current?.click();
          }}
        >
          {!imageUrl && <div className="text-gray-600">Загрузить фото</div>}
          <input
            className="hidden-input"
            type="file"
            accept="image/*,.png,.jpg,.gif,.web"
            ref={filePicker}
            onChange={(event) => {
              if (event.target?.files) {
                const fileList = Array.from(event.target?.files);
                setFile(fileList[0]);
                const reader = new FileReader();
                reader.onload = (e) => {
                  if (e.target?.result) {
                    setImageUrl(e.target.result.toString());
                  }
                };
                reader.readAsDataURL(fileList[0]);
              }
            }}
          />
          {!imageUrl && <Image src={fileBox} alt="" />}
          {imageUrl && (
            <div className="flex justify-between items-center w-full">
              <Image
                className="rounded-[5px]"
                width={56}
                height={56}
                src={imageUrl ? imageUrl : ""}
                alt=""
              />
              <div className="flex items-center gap-[10px]">
                <div className="text-[13px] text-gray-600">
                  {file?.name || product?.name}
                </div>
                <Image
                  src={cross}
                  alt=""
                  onClick={() => {
                    setFile(null);
                    setImageUrl(null);
                    if (filePicker.current) {
                      filePicker.current.value = "";
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-[10px] justify-end w-full">
        <button className="black-button" onClick={() => closeHandler()}>
          Отмена
        </button>
        <button
          className={`button ${!isValid && "hover:bg-slate-300"}`}
          disabled={!isValid}
          type="submit"
        >
          {!product ? "Создать" : "Сохранить"}
        </button>
      </div>
    </Popup>
  );
};
