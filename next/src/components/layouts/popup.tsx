import { FormEventHandler } from "react";

interface IPopup {
  children: React.ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const Popup = ({ children, onSubmit }: IPopup) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#0F1718]/[.45] z-10 fade-in">
      <div className="flex items-center h-full">
        <form className="flex flex-col items-center gap-[20px] m-auto my-auto py-[16px] px-[20px] w-[338px] bg-slate-100 rounded-[10px]" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
};
