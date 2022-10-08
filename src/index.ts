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
    min: 10,
    max: 200,
    step: 10,
    showDivision: true,
    value: 50,
    showValue: false,
    minValue: 50,
    maxValue: 150,
    mode: SliderMode.interval,
    orient: SliderOrient.horizontal,
  };

  const controller = new SliderController(userSettings);
}

initSlider();
