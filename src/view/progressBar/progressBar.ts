import Helper from "../../helper";
import EventListener from "../../event-listener";
import Slider, {SliderMode} from "../../model/slider";
import SliderView from "../slider/slider";

export default class ProgressBar extends EventListener {
  public progress: HTMLElement | undefined;
  public progressWrap: HTMLElement | undefined;
  public EVENT_MOUSEDOWN: string = 'event-mousedown';
  public EVENT_MOUSEMOVE: string = 'event-mousemove';
  public EVENT_MOUSEUP: string = 'event-mouseup';
  private readonly model: Slider;
  private isMouseDown: boolean = false;
  private isMouseMove: boolean = true;
  private view: SliderView;

  constructor(model: Slider, view: SliderView) {
    super(model);

    this.model = model;
    this.view = view;

    this.updateProgressValue = this.updateProgressValue.bind(this);
  }

  public addListeners(): void {
    this.model.on(this.model.EVENT_CHANGE_VALUE, [this.updateProgressValue]);
    this.model.on(this.model.EVENT_CHANGE_MIN_VALUE, [this.updateProgressValue]);
    this.model.on(this.model.EVENT_CHANGE_MAX_VALUE, [this.updateProgressValue]);

    if (this.progressWrap) {
      this.view.getSliderWrapper().addEventListener('mousedown', (e) => {
        this.fireEvent(this.EVENT_MOUSEDOWN);
        this.isMouseDown = true;

        this.onChangeValue(e.clientX);

        this.updateProgressValue();
      });

      window.addEventListener('mousemove', (e) => {
        this.fireEvent(this.EVENT_MOUSEMOVE);

        if (this.isMouseDown) {
          this.isMouseMove = true;

          this.onChangeValue(e.clientX);

          this.updateProgressValue();
        } else {
          this.isMouseMove = false;
        }
      });

      window.addEventListener('mouseup', (e) => {
        this.fireEvent(this.EVENT_MOUSEUP);

        if (this.isMouseMove && this.isMouseDown) {
          this.onChangeValue(e.clientX);

          this.updateProgressValue();
          this.isMouseMove = false;
        }

        this.isMouseDown = false;
      })
    }
  }

  private onChangeValue(position: number): void {
    if (this.model.mode === SliderMode.single) {
      this.model.setValue(this.view.getCountsStep(position));
    } else {
      this.model.setIntervalValue(this.view.getCountsStep(position));
    }
  }

  public getContainer(): HTMLElement {
    this.progress = Helper.addElement(['progress']);
    this.progressWrap = Helper.addElement(['progress-bar']);
    this.progressWrap.append(this.progress)
    return this.progressWrap;
  }

  public updateProgress() {
     this.addListeners();
  }

  public updateProgressValue(): void {
    const step = this.model.getStep();
    if (this.model.mode === SliderMode.single) {
      const counts = this.model.getValue() / step;
      const width = Math.round(this.view.getStepWidth() * counts);

      if (this.progress) {
        this.progress.style.width = `${width}px`;
      }

    } else {
      const countsMin = Math.round((this.model.getMinValue() - this.model.getMin()) / step);
      const countsMax = Math.round((this.model.getMax() - this.model.getMaxValue()) / step);

      const minPosition = Math.round(this.view.getStepWidth() * countsMin);
      const maxPosition = Math.round(this.view.getStepWidth() * countsMax);

      if (this.progress) {
        this.progress.style.left = `${minPosition}px`;
        this.progress.style.right = `${maxPosition}px`;
      }
    }
  }
}
