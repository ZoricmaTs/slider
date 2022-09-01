import EventListener from "../../event-listener";
import Slider from "../../model/slider";
import Helper from "../../helper";

export default class Scale extends EventListener {
  private model: Slider;
  private scaleWrap: HTMLElement | undefined;

  constructor(model: Slider) {
    super(model);

    this.model = model;

    this.init();

    this.initItems();
  }

  public init(): void {
    this.scaleWrap = Helper.addElement(['scale__wrap']);
  }

  public getContainer(): HTMLElement {
    // @ts-ignore
    return this.scaleWrap;
  }

  public getCountsItem(): number {
    return Math.trunc(this.model.getRange() / this.model.getStep());
  }

  public initItems(): void {
    const items = [];

    for (let i = 0; i <= this.getCountsItem(); i += 1) {
      const item = Helper.addElement(['scale__item']);
      items.push(item);
    }

    // @ts-ignore
    this.scaleWrap.append(...items)
  }
}
