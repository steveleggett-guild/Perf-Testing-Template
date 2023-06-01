export class SharedObjects {
  static UPLOADPROGRESSBAR = '[data-testid="uploadProgressBar"]';
  static REACTSELECTMENU = '.recess-react-select__menu >> text=';
  static REACTSELECT = '.recess-react-select__dropdown-indicator';
}

export enum NAVIGATIONPARAMS {
  //'"networkidle" | "load" | "domcontentloaded" | undefined'
  networkidle = "networkidle",
  load = "load",
  domcontentloaded = "domcontentloaded"
  }