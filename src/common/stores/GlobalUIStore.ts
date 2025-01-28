"use client";

import { createContext, ReactNode } from "react";
import { action, makeObservable, observable } from "mobx";

export default class GlobalUIStore {
  @observable
  openDialog: boolean = false;

  @observable
  dialogTitle: string = "";

  @observable
  dialogContent: ReactNode = null;

  constructor() {
    makeObservable(this);
  }

  @action
  createDialog(args: { title: string; content: ReactNode }) {
    this.dialogTitle = args.title;
    this.dialogContent = args.content;
    this.openDialog = true;
  }

  @action
  destroyDialog() {
    this.dialogTitle = "";
    this.dialogContent = null;
    this.openDialog = false;
  }
}

export const GlobalUIContext = createContext({} as GlobalUIStore);
