import { Panel } from "@/components";
import { ProductList } from "@/components";

interface IProducts {}

export default function Products({}: IProducts) {
  return (
    <div className="flex flex-col gap-[30px] m-auto">
      <Panel />
      <ProductList />
    </div>
  );
}
