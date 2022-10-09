import EventListener from "../../event-listener";
import Slider, {SliderMode} from "../../model/slider";
import Helper from "../../helper";
import SliderView from "../slider/slider";

export default class Thumb extends EventListener {
  private thumb: HTMLElement | undefined;
  public EVENT_MOUSEDOWN: string = 'event-mousedown';
  public EVENT_MOUSEMOVE: string = 'event-mousemove';
  public EVENT_MOUSEUP: string = 'event-mouseup';
  private isMouseDown: boolean = false;
  private isMouseMove: boolean = true;
  private model: Slider;
  private view: SliderView;
  private readonly index: number;

  constructor(model: Slider, view: SliderView, index: number) {
    super(model);

    this.model = model;
    this.view = view;
    this.index = index;
    this.init();

    this.updatePosition = this.updatePosition.bind(this);
  }

  public updateThumb() {
    this.addListeners();
  }

  public addListeners(): void {
    this.model.on(this.model.EVENT_CHANGE_VALUE, [this.updatePosition]);
    this.model.on(this.model.EVENT_CHANGE_MIN_VALUE, [this.updatePosition]);
    this.model.on(this.model.EVENT_CHANGE_MAX_VALUE, [this.updatePosition]);

    if (this.thumb) {
      this.thumb.addEventListener('mousedown', (e) => {
        this.fireEvent(this.EVENT_MOUSEDOWN);
        this.isMouseDown = true;

        this.onChange(e.clientX);

        this.updatePosition();

        e.stopPropagation();
      });

      window.addEventListener('mousemove', (e) => {
        this.fireEvent(this.EVENT_MOUSEMOVE);

        if (this.isMouseDown) {
          this.isMouseMove = true;

          this.onChange(e.clientX);

          this.updatePosition();
        } else {
          this.isMouseMove = false;
        }
      });

      window.addEventListener('mouseup', (e) => {
        this.fireEvent(this.EVENT_MOUSEUP);

        if (this.isMouseMove && this.isMouseDown) {
          this.onChange(e.clientX);

          this.isMouseMove = false;
          this.updatePosition();
        }

        this.isMouseDown = false;
      });
    }
  }

  private init(): void {
    this.thumb = Helper.addElement(['thumb']);
  }

  public getContainer(): HTMLElement {
    // @ts-ignore
    return this.thumb;
  }

  private onChange(position: number): void {
    if (this.model.mode === SliderMode.single) {
      this.model.setValue(this.view.getCountsStep(position));
    } else {
      const value = this.view.getCountsStep(position) * this.model.getStep() + this.model.getMin();
      const maxValue = this.model.getMaxValue();
      const minValue = this.model.getMinValue();

      if (this.model.getMax() >= value) {
        if (this.index === 0) {
          if (value < maxValue) {
            this.model.setMinValue(value);
          } else {
            this.model.setMaxValue(value);
          }
        } else {
          if (value > minValue) {
            this.model.setMaxValue(value);
          } else {
            this.model.setMinValue(value);
          }
        }
      }
    }
  }

  public updatePosition(): void {
    const step: number = this.model.getStep();

    if (this.model.mode === SliderMode.single) {
      if (this.thumb) {
        const counts = this.model.getValue() / step;
        const left = Math.round(this.view.getStepWidth() * counts) - 10;

        this.thumb.style.left = `${left}px`;
      }
    } else {
      if (this.index === 0) {
        const countsMin = Math.round((this.model.getMinValue() - this.model.getMin()) / step);
        const minPosition = Math.round(this.view.getStepWidth() * countsMin);

        // @ts-ignore
        this.thumb.style.left = `${minPosition - 10}px`;
      } else {
        const countsMax = Math.round((this.model.getMax() - this.model.getMaxValue()) / step);
        const maxPosition = Math.round(this.view.getStepWidth() * countsMax);

        // @ts-ignore
        this.thumb.style.right = `${maxPosition - 10}px`;
      }
    }

  }
}
