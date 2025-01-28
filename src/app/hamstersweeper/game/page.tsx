import GameView from "@/modules/hamstersweeper/components/GameView";

interface PageProps {
  searchParams: Promise<{ difficulty: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { difficulty } = await searchParams;

  return <GameView difficulty={difficulty} />;
};

export default Page;
