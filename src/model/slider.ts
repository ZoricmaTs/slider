import {UserSettings} from "../index";

export enum SliderMode {
  single =  0,
  interval = 1,
};

export enum SliderOrient {
  horizontal =  0,
  vertical = 1,
};


export default class Slider {
  public max: number;
  public min: number;

  public root: HTMLElement;

  public minValue: number;
  public maxValue: number;
  public step: number;
  public showDivision: boolean;
  public value: number;
  private mode: SliderMode;
  public orient: SliderOrient;
  public showValue: boolean;

  constructor(props: UserSettings) {
    this.root = props.root;

    this.max = props.max;
    this.min = props.min;

    this.step = props.step;
    this.showDivision = props.showDivision ? props.showDivision : false;

    this.value = props.value ? props.value : 0;
    this.showValue = props.showValue ? props.showValue : false;
    this.minValue = props.minValue ? props.minValue : 0;
    this.maxValue = props.maxValue ? props.maxValue : 100;

    this.mode = props.mode ? props.mode : SliderMode.single;
    this.orient = props.orient ? props.orient : SliderOrient.horizontal;
  }

  public getStep(): number {
    return this.step;
  }

  public getRange(): number {
    return Math.abs(this.max - this.min);
  }

  public getStepPercent(): number {
    return Math.trunc(this.getStep() / this.getRange() * 100 * 100) / 100;
  }

  public setValue(stepCounts: number): void {
    this.value = stepCounts * this.getStep();
  }

  public getValue(): number {
    return this.value;
  }
}
