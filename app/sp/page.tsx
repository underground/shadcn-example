import { Input } from "@/components/ui/input";
import clsx from "clsx";

export default function Page() {
  const showFooter = true;
  return (
    <form
      // className={clsx(
      //   // 画面全体
      //   "min-h-[100svh]",
      //   "[@supports(height:100dvh)]:min-h-[100dvh]",
      //   // ヘッダー / メイン / フッター の3行
      //   "grid grid-rows-[auto,1fr,auto]"
      // )}
      // className="h-full w-full flex flex-col overflow-hidden fixed top-0 bottom-0 left-0 right-0"
      className="min-h-[100svh] w-full flex flex-col"
    >
      <header
        className={clsx(
          "flex flex-col w-full",
          "sticky top-0 z-10 flex flex-col w-full",
          "h-[50px] bg-black text-white flex items-center px-4 shadow"
        )}
      >
        Header
      </header>
      <main
        // className={clsx(
        //   "overflow-auto px-4 py-3",
        //   "flex flex-col gap-2", // 入力の間に gap-2
        //   "min-h-0" // flex 子がはみ出さないように必須
        // )}
        // className="flex flex-col flex-auto overflow-auto no-scrollbar overflow-x-hidden gap-2 h-full p-3"
        className="flex-1 no-scrollbar overflow-x-hidden gap-2 h-full p-3"
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <Input key={i} placeholder={`input ${i + 1}`} className="mb-3" />
        ))}
      </main>
      {showFooter && (
        <footer
          //       className="
          //   fixed bottom-0 inset-x-0
          //   bg-black text-white
          //   shadow-2xl
          //   min-h-[60px]
          //   h-[60px]
          //   pb-[max(0px,env(safe-area-inset-bottom))]
          // "
          className="
          sticky bottom-0 z-10
          bg-black text-white
          shadow-2xl
          min-h-[60px]
          h-[60px]
          pb-[max(0px,env(safe-area-inset-bottom))]
        "
          // className="bg-black text-white p-3 mt-auto text-center"
        >
          Footer
        </footer>
      )}
    </form>
  );
}
