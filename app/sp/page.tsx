import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <form className="h-full w-full flex flex-col overflow-hidden fixed top-0 bottom-0 left-0 right-0">
      <header className="flex flex-col w-full h-[50px] bg-black text-white">
        Header
      </header>
      <main className="flex flex-col flex-auto overflow-auto no-scrollbar overflow-x-hidden gap-2 h-full p-3">
        <Input placeholder="1" />
        <Input placeholder="2" />
        <Input placeholder="3" />
        <Input placeholder="4" />
        <Input placeholder="5" />
        <Input placeholder="6" />
        <Input placeholder="7" />
        <Input placeholder="8" />
        <Input placeholder="9" />
        <Input placeholder="10" />
        <Input placeholder="11" />
        <Input placeholder="12" />
        <Input placeholder="13" />
        <Input placeholder="14" />
        <Input placeholder="15" />
        <Input placeholder="16" />
        <Input placeholder="17" />
        <Input placeholder="18" />
        <Input placeholder="19" />
        <Input placeholder="20" />
      </main>
      <footer className="bg-black text-white p-3 mt-auto text-center">
        Footer
      </footer>
    </form>
  );
}
