import {UserSettings} from "../index";
import EventListener from "../event-listener";

export enum SliderMode {
  single =  0,
  interval = 1,
}

export enum SliderOrient {
  horizontal =  0,
  vertical = 1,
}


export default class Slider extends EventListener {
  private readonly max: number;
  private readonly min: number;
  public EVENT_CHANGE_VALUE: string = 'event-change-value';
  public EVENT_CHANGE_MIN_VALUE: string = 'event-change-min-value';
  public EVENT_CHANGE_MAX_VALUE: string = 'event-change-max-value';
  public root: HTMLElement;

  private minValue: number;
  private maxValue: number;
  private readonly step: number;
  private readonly showDivision: boolean;
  private value: number;
  private readonly orient: SliderOrient;
  private readonly showValue: boolean;
  readonly mode: SliderMode;

  constructor(props: UserSettings) {
    super(props);

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

  public getOrient(): SliderOrient {
    return this.orient;
  }

  public getMin(): number {
    return this.min;
  }

  public getMax(): number {
    return this.max;
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

  public setIntervalValue(stepCounts: number): void {
    const value = this.min + stepCounts * this.getStep();
    const min = Math.abs(this.minValue - value);
    const max = Math.abs(this.maxValue - value);

    if (min < max) {
      this.setMinValue(value);
    } else if (min >= max) {
      this.setMaxValue(value);
    }
  }

  public setValue(value: number): void {
    this.value = value;

    this.fireEvent(this.EVENT_CHANGE_VALUE);
  }

  public getValue(): number {
    return this.value;
  }

  public getMinValue(): number {
    return this.minValue;
  }

  public getMaxValue(): number {
    return this.maxValue;
  }

  public setMinValue(value: number): void {
    this.minValue = value;

    this.fireEvent(this.EVENT_CHANGE_MIN_VALUE);
  }

  public setMaxValue(value: number): void {
    this.maxValue = value;

    this.fireEvent(this.EVENT_CHANGE_MAX_VALUE);
  }
}
