import EventListener from "../../event-listener";
import Slider, {SliderOrient} from "../../model/slider";
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

    if (this.model.getOrient() === SliderOrient.vertical) {
      this.slider.style.flexDirection = 'row';
      this.slider.style.display = 'inline-flex';

      this.slider.style.height = '500px';

      this.sliderWrapper.style.width = '10px';
      this.sliderWrapper.style.height = '100%';
    } else {
      this.slider.style.flexDirection = 'column';
      this.slider.style.display = 'flex';

      this.sliderWrapper.style.width = '100%';
      this.sliderWrapper.style.height = '10px';
    }

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

  public getStepSize(): number {
    let size: number;

    if (this.model.getOrient() === SliderOrient.vertical) {
      size = this.getSliderWrapRect().height;
    } else {
      size = this.getSliderWrapRect().width;
    }

    return (size * this.model.getStepPercent() / 100 * 100) / 100;
  }

  public getCountsStep(position: number): number {
    return Math.round(position / this.getStepSize());
  }

}
