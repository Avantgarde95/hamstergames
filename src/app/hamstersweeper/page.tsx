import SmartLink from "@/common/components/SmartLink";
import allRoutes from "@/common/models/Routes";

const linkStyle =
  "border-outset active:border-inset leading-none w-32 h-10 font-mono border-4 bg-[#B3B3B3] mt-2 px-2 flex flex-row items-center justify-start";

const Page = () => (
  <div className="flex h-full w-full flex-row items-start overflow-auto p-4">
    <div className="border-outset relative m-auto flex flex-col items-center justify-center border-4 bg-[#C0C0C0] px-8 py-12">
      <div className="mb-4 font-mono text-lg">
        <img src="/images/hamstersweeper.png" alt="Hamstersweeper" className="mr-4 inline-block w-12" />
        Hamstersweeper
      </div>
      <SmartLink className={linkStyle} href={`${allRoutes.hamstersweeper.game}?difficulty=easy`}>
        🧀 Easy
      </SmartLink>
      <SmartLink className={linkStyle} href={`${allRoutes.hamstersweeper.game}?difficulty=normal`}>
        🔎 Normal
      </SmartLink>
      <SmartLink className={linkStyle} href={`${allRoutes.hamstersweeper.game}?difficulty=hard`}>
        🔥 Hard
      </SmartLink>
      <SmartLink
        className="absolute left-0 top-0 flex flex-row items-center p-2 hover:bg-slate-300 active:bg-slate-400"
        href={`${allRoutes.home}`}
      >
        ⬅️
      </SmartLink>
    </div>
  </div>
);

export default Page;
