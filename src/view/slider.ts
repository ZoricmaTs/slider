import Slider, {SliderOrient} from "../model/slider";
import ThumbModel, {ThumbParams} from "../model/thumb";
import ScaleView, {ScaleParams} from "./scale/scale";
import ThumbView from "./thumb/thumb";
import Helper from "../helper";

export default class SliderView {
  private readonly element: HTMLElement;
  private readonly orient: SliderOrient;

  private readonly showDivision: boolean;
  private readonly step: number;
  private scale: ScaleView | undefined;
  private thumb: ThumbView | undefined;
  private readonly min: number;
  private readonly max: number;
  private readonly value: number;
  private readonly minValue: number;
  private readonly maxValue: number;
  private readonly showValue: boolean;

  constructor(model: Slider) {
    this.element = model.parent;
    this.orient = model.orient;
    this.showDivision = model.showDivision;
    this.step = model.getStep();
    this.min = model.min;
    this.max = model.max;
    this.value = model.value;
    this.showValue = model.showValue;
    this.minValue = model.minValue;
    this.maxValue = model.maxValue;

    this.render();
    // this.initScale();
    this.initThumb();
  }

  private initStylesOfType(progressBarWrap: HTMLElement, sliderContainer: HTMLElement): void {
    sliderContainer.style.flexDirection = this.orient === SliderOrient.horizontal ? 'row' : 'column';
    sliderContainer.style.height = this.orient === SliderOrient.horizontal ? 'auto' : '100%';
    sliderContainer.style.width = 'auto';

    const height = '10px';
    progressBarWrap.style.height = this.orient === SliderOrient.horizontal ? height : '100%';
    progressBarWrap.style.width = this.orient === SliderOrient.horizontal ? '100%' : height;
  }

  private initScale(): void {
    if (this.showDivision) {
      const param: ScaleParams = {
        step: this.step,
        parent: this.element,
        min: this.min,
        max: this.max,
      };

      this.scale = new ScaleView(param);
    }
  }

  private initThumb(): void {
    // @ts-ignore
    const progressBarWrap: HTMLElement = document.querySelector('.progress-bar__wrap');

    const param: ThumbParams = {
      step: this.step,
      parent: progressBarWrap,
      min: this.min,
      max: this.max,
      value: this.value,
      showValue: this.showValue,
      minValue: this.minValue,
      maxValue: this.maxValue,
    };
    const thumbModel = new ThumbModel(param);
    this.thumb = new ThumbView(thumbModel);

  }

  private render() {
    const sliderContainer: HTMLElement = Helper.addElement(['wrap']);

    const progressBarWrap: HTMLElement = Helper.addElement(['progress-bar__wrap']);
    this.initStylesOfType(progressBarWrap, sliderContainer);

    sliderContainer.append(progressBarWrap);

    this.element.append(sliderContainer);
  }
}
