export type ThumbParams = {
  step: number,
  parent: HTMLElement,
  min: number,
  max: number,
  value: number,
  showValue: boolean,
  minValue: number,
  maxValue: number,
}

export default class ThumbModel {
  parent: HTMLElement;
  private value: number;
  private readonly showValue: boolean;

  constructor(props: ThumbParams) {
    this.parent = props.parent;
    this.value = props.value;
    this.showValue = props.showValue;
  }

  public getValue(): number {
    return this.value;
  }

  public setValue(value: number): void {
    this.value = value;
  }

  public isShowValue(): boolean {
    return this.showValue;
  }

}
