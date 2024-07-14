import loader from "./loader.gif";
import Image from "next/image";

export default function Loader() {
  return (
    <Image src={loader} alt="Loading..." className="w-[150px] h-[150px]" />
  );
}
