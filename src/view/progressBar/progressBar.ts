import Helper from "../../helper";
import EventListener from "../../event-listener";
import Slider from "../../model/slider";
import SliderView from "../slider/slider";

export default class ProgressBar extends EventListener {
  public progress: HTMLElement | undefined;
  public progressWrap: HTMLElement | undefined;
  public EVENT_MOUSEDOWN: string = 'event-mousedown';
  public EVENT_MOUSEMOVE: string = 'event-mousemove';
  public EVENT_MOUSEUP: string = 'event-mouseup';
  private model: Slider;
  private isMouseDown: boolean = false;
  private isMouseMove: boolean = true;
  private view: SliderView;

  constructor(model: Slider, view: SliderView) {
    super(model);

    this.model = model;
    this.view = view;
  }

  public addListeners(): void {
    if (this.progressWrap) {
      this.view.getSliderWrapper().addEventListener('mousedown', (e) => {
        this.fireEvent(this.EVENT_MOUSEDOWN);
        this.isMouseDown = true;

        this.model.setValue(this.view.getCountsStep(e.clientX));
        this.updateProgressValue();
      });

      window.addEventListener('mousemove', (e) => {
        this.fireEvent(this.EVENT_MOUSEMOVE);

        if (this.isMouseDown) {
          this.isMouseMove = true;

          this.model.setValue(this.view.getCountsStep(e.clientX));
          this.updateProgressValue();
        } else {
          this.isMouseMove = false;
        }
      });

      window.addEventListener('mouseup', (e) => {
        this.fireEvent(this.EVENT_MOUSEUP);

        if (this.isMouseMove && this.isMouseDown) {
          this.model.setValue(this.view.getCountsStep(e.clientX));
          this.updateProgressValue();

          this.isMouseMove = false;
        }

        this.isMouseDown = false;
      });
    }
  }

  public getContainer(): HTMLElement {
    this.progress = Helper.addElement(['progress-bar__value']);
    this.progressWrap = Helper.addElement(['progress-bar__wrap']);
    this.progressWrap.append(this.progress)
    return this.progressWrap;
  }

  public updateProgress() {
     this.addListeners();
  }

  public updateProgressValue(): void {
    const counts = this.model.getValue() / this.model.getStep();
    const width = Math.round(this.view.getStepWidth() * counts);

    if (this.progress) {
      this.progress.style.width = `${width}px`;
    }
  }
}
