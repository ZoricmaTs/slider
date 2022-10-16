import EventListener from "../../event-listener";
import Slider, {SliderMode, SliderOrient} from "../../model/slider";
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

        this.onChange(this.model.getOrient() === SliderOrient.vertical ? e.clientY : e.clientX);

        this.updatePosition();

        e.stopPropagation();
      });

      window.addEventListener('mousemove', (e) => {
        this.fireEvent(this.EVENT_MOUSEMOVE);

        if (this.isMouseDown) {
          this.isMouseMove = true;

          this.onChange(this.model.getOrient() === SliderOrient.vertical ? e.clientY : e.clientX);

          this.updatePosition();
        } else {
          this.isMouseMove = false;
        }
      });

      window.addEventListener('mouseup', (e) => {
        this.fireEvent(this.EVENT_MOUSEUP);

        if (this.isMouseMove && this.isMouseDown) {
          this.onChange(this.model.getOrient() === SliderOrient.vertical ? e.clientY : e.clientX);

          this.isMouseMove = false;
          this.updatePosition();
        }

        this.isMouseDown = false;
      });
    }
  }

  private init(): void {
    this.thumb = Helper.addElement(['thumb']);

    if (this.model.getOrient() === SliderOrient.vertical) {
      this.thumb.style.left = `-5px`;
    } else {
      this.thumb.style.top = `-5px`;
    }

  }

  public getContainer(): HTMLElement {
    // @ts-ignore
    return this.thumb;
  }

  private onChange(position: number): void {
    const value = this.view.getCountSteps(position) * this.model.getStep() + this.model.getMin();

    if (value <= this.model.getMax()) {
      if (this.model.mode === SliderMode.single) {
        this.model.setValue(value - this.model.getMin());
      } else {
        const maxValue = this.model.getMaxValue();
        const minValue = this.model.getMinValue();

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
        const position = Math.round(this.view.getStepSize() * counts) - 10;
        if (this.model.getOrient() === SliderOrient.vertical) {
          this.thumb.style.top = `${position}px`;
        } else {
          this.thumb.style.left = `${position}px`;
        }
      }
    } else {
      if (this.index === 0) {
        const countsMin = Math.round((this.model.getMinValue() - this.model.getMin()) / step);
        const minPosition = Math.round(this.view.getStepSize() * countsMin);

        // @ts-ignore
        this.thumb.style.left = `${minPosition - 10}px`;
      } else {
        const countsMax = Math.round((this.model.getMax() - this.model.getMaxValue()) / step);
        const maxPosition = Math.round(this.view.getStepSize() * countsMax);

        // @ts-ignore
        this.thumb.style.right = `${maxPosition - 10}px`;
      }
    }

  }
}
