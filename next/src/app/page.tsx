"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authAPI } from "@/shared/api/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCheckAuth } from "@/shared/hooks/useCheckAuth";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

type FormFields = z.infer<typeof formSchema>;

export default function Auth() {
  const router = useRouter();
  const { isAuth } = useCheckAuth();

  useEffect(() => {
    isAuth && router.push("./products");
  }, [isAuth]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormFields>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await authAPI(data);
    if (result) {
      sessionStorage.setItem("user", JSON.stringify(result.user));
    }
    reset();
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-slate-100 text-zinc-900">
        <div className="absolute inset-0 flex flex-col">
          <div className="h-2/5 bg-slate-800" />
        </div>
        <div className="relative flex justify-center items-center min-h-screen">
          <form
            className="bg-slate-200 px-8 py-7 rounded-[10px] shadow-md w-[360px] flex flex-col gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-center">Авторизация</h2>
            <div className="flex flex-col gap-9 pt-8 pb-[10px]">
              <div className="flex flex-col gap-1">
                <h6>Почта</h6>
                <input
                  placeholder="Почта"
                  className={`input w-full ${
                    errors?.email && "border-red-400"
                  }`}
                  {...register("email")}
                />
                <div className="text-red-400 text-xs">
                  {errors?.email?.message}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h6>Пароль</h6>
                <input
                  placeholder="Пароль"
                  className={`input w-full ${
                    errors?.password && "border-red-400"
                  }`}
                  {...register("password")}
                />
                <div className="text-red-400 text-xs">
                  {errors?.password?.message}
                </div>
              </div>
            </div>
            <div className="block mx-auto">
              <button
                className={`button ${!isValid && "hover:bg-slate-300"}`}
                disabled={!isValid}
              >
                Войти
              </button>
              <div className="text-red-400 text-xs">
                {errors?.root?.message}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
