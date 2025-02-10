import { mergeStyles } from "@/common/utils/StyleUtils";
import { backgroundStyle } from "@/modules/hamtris/styles/Common";

const Page = () => <div className={mergeStyles("h-full w-full text-white", backgroundStyle)}>Hamtris</div>;

export default Page;
