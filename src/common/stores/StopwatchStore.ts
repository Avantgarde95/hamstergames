import { action, makeObservable, observable, runInAction } from "mobx";

export default class StopwatchStore {
  private interval: number;

  private startTime: number;

  @observable
  time: number;

  private job: number | null;

  constructor(args: { interval: number }) {
    this.interval = args.interval;
    this.startTime = 0;
    this.time = 0;
    this.job = null;

    makeObservable(this);
  }

  setInterval(value: number) {
    this.interval = value;
  }

  @action
  start() {
    // For safety.
    this.clearJob();

    this.startTime = this.getNow();
    this.time = 0;

    // When we use setInterval(), TypeScript sometimes uses Node.js's setInterval() instead of browser's, and we get a type error.
    // So we put "window.".
    this.job = window.setInterval(() => {
      runInAction(() => {
        this.time = this.getNow() - this.startTime;
      });
    }, this.interval);

    console.log("Stopwatch started");
  }

  stop() {
    this.clearJob();
    console.log("Stopwatch stopped");
  }

  private clearJob() {
    if (this.job !== null) {
      window.clearInterval(this.job);
      this.job = null;
    }
  }

  private getNow() {
    return Date.now();
  }
}
