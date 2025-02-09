import { action, makeObservable, observable } from "mobx";

type ClickMode = "Open" | "Flag";

export default class UIStore {
  @observable
  clickMode: ClickMode = "Open";

  constructor() {
    makeObservable(this);
  }

  @action
  setClickMode(value: ClickMode) {
    this.clickMode = value;
  }
}
