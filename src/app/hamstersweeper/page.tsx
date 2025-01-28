import SmartLink from "@/common/components/SmartLink";
import allRoutes from "@/common/models/Routes";

const linkStyle =
  "border-outset active:border-inset leading-none w-32 h-10 font-mono border-4 bg-[#B3B3B3] mt-2 px-2 flex flex-row items-center justify-start";

const Page = () => (
  <div className="flex h-full w-full flex-row items-start overflow-auto p-4">
    <div className="border-outset m-auto flex flex-col items-center justify-center border-4 bg-[#C0C0C0] px-8 py-12">
      <div className="mb-4 font-mono text-xl">
        <span className="text-3xl">🐹</span> Hamstersweeper
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
    </div>
  </div>
);

export default Page;
