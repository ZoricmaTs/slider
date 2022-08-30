import {SliderMode, SliderOrient} from "./model/slider";
import SliderController from "./controller/slider";

export type UserSettings = {
  root: HTMLElement;
  min: number,
  max: number,
  step: number,
  showDivision: boolean,
  value: number,
  minValue: number,
  maxValue: number,
  showValue: boolean,
  mode: SliderMode,
  orient: SliderOrient,
}

function initSlider(): any {
  const userSettings: UserSettings = {
    root: document.body,
    min: 0,
    max: 103,

    step: 5,
    showDivision: true,

    value: 10,
    showValue: false,
    minValue: 0,
    maxValue: 0,
    mode: SliderMode.single,
    orient: SliderOrient.horizontal,
  };

  const controller = new SliderController(userSettings);
}

initSlider();
