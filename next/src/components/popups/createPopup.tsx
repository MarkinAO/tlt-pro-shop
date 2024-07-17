import { Popup } from "../layouts/popup";
import useSWR from "swr";
import { fetcher } from "@/shared/api/api";
import type { TProduct } from "@/model/model";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAPI } from "@/shared/api/api";

const formSchema = z.object({
  name: z.string().min(1),
  quantity: z.string().min(1),
  price: z.string().min(1),
});

type FormFields = z.infer<typeof formSchema>;

interface ICreatePopup {
  closeHandler: Function;
}

type TManufacture = {
  name: string;
  id: number;
};

export const CreatePopup = ({ closeHandler }: ICreatePopup) => {
  const [manufacture, setManufacture] = useState<TManufacture>();
  const [hidden, toggleHidden] = useState(true);
  const [file, setFile] = useState<File>();
  const filePicker = useRef<HTMLInputElement>(null);
  const manufactures = useSWR<TProduct[]>("/manufacturers", () =>
    fetcher("/manufacturers", {
      method: "GET",
    })
  ).data;

  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<FormFields>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data: any) => {
    const requestData = {
      ...data,
      quantity: Number(data.quantity),
      manufactureId: manufacture?.id,
    };
    const formData = new FormData();
    for (const key in requestData) {
      formData.append(key, requestData[key]);
    }
    if(filePicker.current?.files) {
      formData.append("image", filePicker.current?.files[0]);
    }    
    createAPI(formData);
    reset();
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
          <svg
            className={`absolute top-[10px] right-[10px] cursor-pointer ${
              !hidden && "rotate-180"
            }`}
            width="17"
            height="10"
            viewBox="0 0 17 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => toggleHidden(!hidden)}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.28033 9.28033C8.98744 9.57322 8.51256 9.57322 8.21967 9.28033L0.71967 1.78033C0.426777 1.48744 0.426777 1.01256 0.71967 0.719671C1.01256 0.426777 1.48744 0.426777 1.78033 0.719671L8.75 7.68934L15.7197 0.71967C16.0126 0.426777 16.4874 0.426777 16.7803 0.71967C17.0732 1.01256 17.0732 1.48744 16.7803 1.78033L9.28033 9.28033Z"
              fill="#1E293B"
            />
          </svg>
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
          className="flex flex-col items-center gap-[10px] py-[10px] cursor-pointer"
          onClick={() => {
            filePicker.current?.click();
          }}
        >
          <div className="text-gray-600">Загрузить фото</div>
          <input
            className="hidden-input"
            type="file"
            accept="image/*,.png,.jpg,.gif,.web"
            ref={filePicker}
            onChange={(event) => {
              if (event.target?.files) {
                const fileList = Array.from(event.target?.files);
                setFile(fileList[0]);
              }
            }}
          />
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.47812 3.93387C4.67178 3.30448 5.25329 2.875 5.91179 2.875H8C8.41421 2.875 8.75 2.53921 8.75 2.125C8.75 1.71079 8.41421 1.375 8 1.375H5.91179C4.59478 1.375 3.43177 2.23397 3.04446 3.49274L0.632663 11.3311C0.544715 11.6169 0.5 11.9143 0.5 12.2133V16.375C0.5 18.0319 1.84315 19.375 3.5 19.375H18.5C20.1569 19.375 21.5 18.0319 21.5 16.375V12.2133C21.5 11.9143 21.4553 11.6169 21.3673 11.3311L18.9555 3.49274C18.5682 2.23397 17.4052 1.375 16.0882 1.375H14C13.5858 1.375 13.25 1.71079 13.25 2.125C13.25 2.53921 13.5858 2.875 14 2.875H16.0882C16.7467 2.875 17.3282 3.30448 17.5219 3.93387L19.7345 11.125H16.8906C15.7543 11.125 14.7155 11.767 14.2073 12.7834L13.9511 13.2958C13.697 13.804 13.1776 14.125 12.6094 14.125H9.39058C8.82242 14.125 8.30302 13.804 8.04894 13.2958L7.79271 12.7834C7.28453 11.767 6.24574 11.125 5.10942 11.125H2.26547L4.47812 3.93387Z"
              fill="#475569"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 0.625C11.4142 0.625 11.75 0.960786 11.75 1.375V7.81434L13.4697 6.09467C13.7626 5.80178 14.2374 5.80178 14.5303 6.09467C14.8232 6.38756 14.8232 6.86244 14.5303 7.15533L11.5303 10.1553C11.2374 10.4482 10.7626 10.4482 10.4697 10.1553L7.46967 7.15533C7.17678 6.86244 7.17678 6.38756 7.46967 6.09467C7.76256 5.80178 8.23744 5.80178 8.53033 6.09467L10.25 7.81434V1.375C10.25 0.960786 10.5858 0.625 11 0.625Z"
              fill="#475569"
            />
          </svg>
          {file && <div className="text-[12px] text-gray-600">{file.name}</div>}
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
          Создать
        </button>
      </div>
    </Popup>
  );
};
