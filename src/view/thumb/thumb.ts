import EventListener from "../../event-listener";
import Slider from "../../model/slider";
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

  constructor(model: Slider, view: SliderView) {
    super(model);

    this.model = model;
    this.view = view;
    this.init();
  }

  public updateThumb() {
    this.addListeners();
  }

  public addListeners(): void {
    if (this.thumb) {
      this.view.getSliderWrapper().addEventListener('mousedown', (e) => {
        this.fireEvent(this.EVENT_MOUSEDOWN);
        this.isMouseDown = true;

        this.model.setValue(this.view.getCountsStep(e.clientX));
        this.updatePosition();
      });

      window.addEventListener('mousemove', (e) => {
        this.fireEvent(this.EVENT_MOUSEMOVE);

        if (this.isMouseDown) {
          this.isMouseMove = true;

          this.model.setValue(this.view.getCountsStep(e.clientX));
          this.updatePosition();
        } else {
          this.isMouseMove = false;
        }
      });

      window.addEventListener('mouseup', (e) => {
        this.fireEvent(this.EVENT_MOUSEUP);

        if (this.isMouseMove && this.isMouseDown) {
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

  public updatePosition(): void {
    const counts = this.model.getValue() / this.model.getStep();
    const left = Math.round(this.view.getStepWidth() * counts) - 10;

    if (this.thumb) {
      this.thumb.style.left = `${left}px`;
    }
  }
}
