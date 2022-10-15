import EventListener from "../../event-listener";
import Slider, {SliderOrient} from "../../model/slider";
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

    if (this.model.getOrient() === SliderOrient.vertical) {
      this.scaleWrap.style.flexDirection = 'column';
    } else {
      this.scaleWrap.style.flexDirection = 'row';
    }
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
      const itemScale = Helper.addElement(['scale__item-scale']);
      const item = Helper.addElement(['scale__item']);

      if (this.model.getOrient() === SliderOrient.vertical) {
        item.style.flexDirection = 'row';
        itemScale.style.width = '10px';
        itemScale.style.height = '1px';
        itemStepValue.style.left = '10px';
      } else {
        item.style.flexDirection = 'column';
        itemScale.style.width = '1px';
        itemScale.style.height = '10px';
        itemStepValue.style.top = '10px';
      }

      itemStepValue.innerHTML = `${this.model.getMin() + (this.model.getStep() * i)}`;

      item.append(itemScale)
      item.append(itemStepValue);

      items.push(item);
    }

    // @ts-ignore
    this.scaleWrap.append(...items)
  }
}
