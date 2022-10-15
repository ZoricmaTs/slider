import Helper from "../../helper";
import EventListener from "../../event-listener";
import Slider, {SliderMode, SliderOrient} from "../../model/slider";
import SliderView from "../slider/slider";

export default class ProgressBar extends EventListener {
  public progress: HTMLElement | undefined;
  public progressBar: HTMLElement | undefined;
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

    if (this.progressBar) {
      this.view.getSliderWrapper().addEventListener('mousedown', (e) => {
        this.fireEvent(this.EVENT_MOUSEDOWN);
        this.isMouseDown = true;

        this.onChangeValue(this.model.getOrient() === SliderOrient.vertical ? e.clientY : e.clientX);

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

  private initVerticalOrientStyles(): void {
    if (this.progress) {
      this.progress.style.width = '100%';
    }

    if (this.progressBar) {

    }
  }

  private initHorizontalOrientStyles(): void {
    if (this.progress) {
      this.progress.style.height = '100%';
    }

    if (this.progressBar) {

    }
  }

  public getContainer(): HTMLElement {
    this.progress = Helper.addElement(['progress']);
    this.progressBar = Helper.addElement(['progress-bar']);
    if (this.model.getOrient() === SliderOrient.vertical) {
      this.initVerticalOrientStyles();
    } else {
      this.initHorizontalOrientStyles();
    }

    this.progressBar.append(this.progress)
    return this.progressBar;
  }

  public updateProgress() {
     this.addListeners();
  }

  public updateProgressValue(): void {
    const step = this.model.getStep();
    if (this.model.mode === SliderMode.single) {
      const counts: number = this.model.getValue() / step;
      const progress: number = Math.round(this.view.getStepSize() * counts);

      if (this.progress) {
        if (this.model.getOrient() === SliderOrient.vertical) {
          this.progress.style.height = `${progress}px`;

        } else {
          this.progress.style.width = `${progress}px`;
        }
      }

    } else {
      const countsMin: number = Math.round((this.model.getMinValue() - this.model.getMin()) / step);
      const countsMax: number = Math.round((this.model.getMax() - this.model.getMaxValue()) / step);

      const minPosition: number = Math.round(this.view.getStepSize() * countsMin);
      const maxPosition: number = Math.round(this.view.getStepSize() * countsMax);

      if (this.progress) {
        this.progress.style.left = `${minPosition}px`;
        this.progress.style.right = `${maxPosition}px`;
      }
    }
  }
}
