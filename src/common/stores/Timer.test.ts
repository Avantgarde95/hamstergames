import Timer from "@/common/stores/Timer";
import { wait } from "@/common/utils/AsyncUtils";

function toSeconds(milliseconds: number) {
  return Math.floor(milliseconds / 1000);
}

test("Interval = 1s", async () => {
  const timer = new Timer(1000);

  expect(timer.time).toEqual(0);

  timer.start();

  await wait(1000);
  expect(toSeconds(timer.time)).toEqual(1);

  await wait(1000);
  expect(toSeconds(timer.time)).toEqual(2);

  timer.stop();

  await wait(1000);
  expect(toSeconds(timer.time)).toEqual(2);
});
