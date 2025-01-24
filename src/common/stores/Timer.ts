import { action, makeObservable, observable, runInAction } from "mobx";

export default class Timer {
  private interval: number;

  private startTime: number;

  @observable
  time: number;

  private job: number | null;

  constructor(interval: number) {
    this.interval = interval;
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
    this.startTime = this.getNow();
    this.time = 0;

    // For safety.
    if (this.job !== null) {
      window.clearInterval(this.job);
    }

    // When we use setInterval(), TypeScript sometimes uses Node.js's setInterval() instead of browser's, and we get a type error.
    // So we put "window.".
    this.job = window.setInterval(() => {
      runInAction(() => {
        this.time = this.getNow() - this.startTime;
      });
    }, this.interval);

    console.log("Timer started");
  }

  stop() {
    if (this.job !== null) {
      window.clearInterval(this.job);
      this.job = null;
    }

    console.log("Timer stopped");
  }

  private getNow() {
    return Date.now();
  }
}
