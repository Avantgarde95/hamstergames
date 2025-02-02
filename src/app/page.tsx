import SmartLink from "@/common/components/SmartLink";
import allRoutes from "@/common/models/Routes";

const iconStyle = "w-14 mr-4";
const linkStyle = "flex flex-row items-center p-2 hover:bg-slate-300 active:bg-slate-400";

const Page = () => (
  <div className="flex h-full w-full flex-row items-start overflow-auto p-4">
    <div className="m-auto flex flex-col justify-center border-2 border-slate-300 px-8 py-8">
      <div className="mb-4 text-xl font-bold">
        <span className="text-3xl">🐹</span> Hamster games
      </div>
      <SmartLink className={linkStyle} href={allRoutes.hamstersweeper.home}>
        <img src="/images/hamstersweeper.png" alt="Hamstersweeper" className={iconStyle} /> Hamstersweeper
      </SmartLink>
      <SmartLink className={linkStyle} href="https://github.com/Avantgarde95/hamstergames">
        <img src="/images/code.png" alt="Code" className={iconStyle} /> Code
      </SmartLink>
    </div>
  </div>
);

export default Page;
