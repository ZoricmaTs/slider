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
    max: 200,
    step: 20,
    showDivision: true,
    value: 50,
    showValue: false,
    minValue: 0,
    maxValue: 0,
    mode: SliderMode.single,
    orient: SliderOrient.horizontal,
  };

  const controller = new SliderController(userSettings);
}

initSlider();
