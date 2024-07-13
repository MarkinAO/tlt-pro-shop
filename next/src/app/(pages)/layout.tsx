import { Sidebar } from "@/components";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[1024px] mx-auto mt-[32px]">{children}</div>
    </div>
  );
}
