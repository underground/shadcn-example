import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <form
      // className="h-full w-full flex flex-col overflow-hidden fixed top-0 bottom-0 left-0 right-0"
      className="min-h-[100svh] [@supports(height:100dvh)]:min-h-[100dvh] grid grid-rows-[auto,1fr,auto]"
    >
      <header className="flex flex-col w-full h-[50px] bg-black text-white">
        Header
      </header>
      <main
        className=" overflow-auto px-4 py-3 min-h-0 scroll-padding-bottom-[84px] gap-2"
        // className="flex flex-col flex-auto overflow-auto no-scrollbar overflow-x-hidden gap-2 h-full p-3"
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <Input key={i} placeholder={`input ${i + 1}`} />
        ))}
      </main>
      <footer
        className="
    sticky bottom-0 inset-x-0
    bg-black text-white
    px-4 py-3 shadow-2xl
    h-[50px]
  "
        // className="bg-black text-white p-3 mt-auto text-center"
      >
        Footer
      </footer>
    </form>
  );
}
