import StopwatchStore from "@/common/stores/StopwatchStore";
import { wait } from "@/common/utils/AsyncUtils";

function toSeconds(milliseconds: number) {
  return Math.floor(milliseconds / 1000);
}

test("Interval = 1s", async () => {
  const stopwatch = new StopwatchStore({ interval: 1000 });

  expect(stopwatch.time).toEqual(0);

  stopwatch.start();

  await wait(1000);
  expect(toSeconds(stopwatch.time)).toEqual(1);

  await wait(1000);
  expect(toSeconds(stopwatch.time)).toEqual(2);

  stopwatch.stop();

  await wait(1000);
  expect(toSeconds(stopwatch.time)).toEqual(2);
});
