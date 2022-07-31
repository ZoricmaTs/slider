import Helper from "../../helper";

export type ScaleParams = {
  step: number,
  parent: HTMLElement,
  min: number,
  max: number,
}

export default class Scale {
  private parent: HTMLElement;
  private readonly step: number;
  private readonly min: number;
  private readonly max: number;

  constructor(props: ScaleParams) {
    this.parent = props.parent;
    this.step = props.step;
    this.min = props.min;
    this.max = props.max;

    this.init();
    this.updateScaleDivisionsList();
  }

  private init() {
    const wrapper: HTMLElement = Helper.addElement(['scale__divisions-wrapper']);

    this.parent.append(wrapper);
  }

  private getSpacing(): number {
    // @ts-ignore
    const wrapper: HTMLElement = document.querySelector('.scale__divisions-wrapper');

    const wrapperWidth: number = wrapper.getBoundingClientRect().width;
    const range: number = this.max - this.min;
    const count: number = Math.trunc(range/this.step);

    return Math.trunc(wrapperWidth / count);
  }

  private getScaleDivisionsList(): {value: number, element: HTMLElement}[] {
    const items = [];

    for (let i = this.min; i <= this.max; i += this.step) {
      const element: HTMLElement = Helper.addElement(['scale__division']);

      items.push({value: i, element});
    }

    return items;
  }

  private updateScaleDivisionsList(): void {
    // @ts-ignore
    const wrapper: HTMLElement = document.querySelector('.scale__divisions-wrapper');

    this.getScaleDivisionsList().forEach(({value, element}, index) => {
      element.innerHTML = `${value}`;

      const position = index * this.getSpacing();
      element.style.left = `${position}`;

      wrapper.appendChild(element);
    })
  }
}

