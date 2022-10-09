import EventListener from "../../event-listener";
import Slider from "../../model/slider";
import Helper from "../../helper";
import SliderView from "../slider/slider";

export default class Scale extends EventListener {
  private model: Slider;
  private scaleWrap: HTMLElement | undefined;
  private view: SliderView;

  constructor(model: Slider, view: SliderView) {
    super(model);

    this.model = model;
    this.view = view;
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
      const itemStepValue = Helper.addElement(['scale__item-step']);
      const itemStepPx = Helper.addElement(['scale__item-step-px']);
      const itemScale = Helper.addElement(['scale__item-scale']);
      const item = Helper.addElement(['scale__item']);

      itemStepValue.innerHTML = `${this.model.getMin() + (this.model.getStep() * i)}`;

      item.append(itemScale)
      item.append(itemStepValue);

      items.push(item);
    }

    // @ts-ignore
    this.scaleWrap.append(...items)
  }
}
