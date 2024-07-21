"use client";
import { useCheckAuth } from "@/shared/hooks/useCheckAuth";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import home from "./assets/home.svg";
import arrow from "./assets/arrow.svg";
import logout from "./assets/logout.svg";

export const Sidebar = () => {
  const router = useRouter();
  const { user, isAdmin } = useCheckAuth();
  const path = usePathname();

  return (
    <div className="h-screen w-56 bg-slate-100 flex flex-col">
      <div className="h1-text flex items-center gap-1 justify-center py-3 text-slate-100 mb-6 bg-gray-800 rounded-br-2xl">
        Test
        <Image src={home} alt="" />
      </div>
      <ul className="p-[10px] flex flex-col gap-4">
        <li className="pr-1 relative flex justify-between items-center text-slate-800 font-medium text-xl transition group">
          <Link href={"./products"}>
            <h3>Товары</h3>
          </Link>
          <Image
            className={`${
              path === "/products" && "hidden"
            } transition-transform duration-300 group-hover:translate-x-1.5`}
            src={arrow}
            alt=""
          />
        </li>
        {isAdmin && (
          <li className="pr-1 relative flex justify-between items-center text-slate-800 font-medium text-xl transition group">
            <Link href={"/algorithm"}>
              <h3>Алгоритмы</h3>
            </Link>
            <Image
              className={`${
                path === "/algorithm" && "hidden"
              } transition-transform duration-300 group-hover:translate-x-1.5`}
              src={arrow}
              alt=""
            />
          </li>
        )}
      </ul>
      <div className="mt-auto p-5 text-slate-900">
        <div className="flex space-x-2 mb-4">
          {user?.roles.map((el: number, i: number) => {
            const text = el === 1 ? "Админ" : "Пользователь";
            return (
              <span className="bg-gray-300 px-2 py-1 rounded text-sm" key={i}>
                {text}
              </span>
            );
          })}
        </div>
        <div className=" w-full flex justify-between">
          <h6>{user?.name}</h6>
          <button
            onClick={() => {
              sessionStorage.clear();
              router.push("./");
            }}
          >
            <Image src={logout} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
