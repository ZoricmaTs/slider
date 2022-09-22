import EventListener from "../../event-listener";
import Slider from "../../model/slider";
import Helper from "../../helper";

export default class SliderView extends EventListener {
  private sliderWrapper: HTMLElement | undefined;
  private model: Slider;
  private slider: HTMLElement | undefined;

  constructor(model: Slider) {
    super(model);

    this.model = model;

    this.initSlider();
  }

  public initSlider(): void {
    this.slider = Helper.addElement(['slider']);
    this.sliderWrapper = Helper.addElement(['wrap']);
    this.slider.append(this.sliderWrapper);
  }

  public getSlider(): HTMLElement {
    // @ts-ignore
    return this.slider;
  }

  public getSliderWrapper(): HTMLElement {
    // @ts-ignore
    return this.sliderWrapper;
  }

  public getSliderWrapRect(): { width: number, height: number } {
    if (this.sliderWrapper) {
      let sliderContainerRect = this.sliderWrapper.getBoundingClientRect();

      return {
        width: sliderContainerRect.width,
        height: sliderContainerRect.height,
      }
    }

    return {
      width: 0,
      height: 0,
    };
  }

  public getStepWidth(): number {
    const sliderWidth = this.getSliderWrapRect().width;
    return Math.trunc(sliderWidth * this.model.getStepPercent() / 100 * 100) / 100;
  }

  public getCountsStep(width: number): number {
    return Math.round(width / this.getStepWidth());
  }

}
