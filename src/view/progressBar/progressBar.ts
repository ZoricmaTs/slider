import Helper from "../../helper";
import EventListener from "../../event-listener";
import Slider from "../../model/slider";

export default class ProgressBar extends EventListener {
  public progress: HTMLElement | undefined;
  public progressWrap: HTMLElement | undefined;
  public EVENT_CLICK: string = 'event-click';
  public EVENT_MOUSEDOWN: string = 'event-mousedown';
  public EVENT_MOUSEMOVE: string = 'event-mousemove';
  public EVENT_MOUSEUP: string = 'event-mouseup';
  private model: Slider;
  private isMouseDown: boolean = false;
  private isMouseMove: boolean = false;

  constructor(model: Slider) {
    super(model);

    this.model = model;
  }

  public addListeners(): void {
    if (this.progressWrap) {
      this.progressWrap.addEventListener('click', (e) => {
        this.fireEvent(this.EVENT_CLICK);
      });

      this.progressWrap.addEventListener('mousedown', (e) => {
        this.fireEvent(this.EVENT_MOUSEDOWN);
        this.isMouseDown = true;

        this.model.setValue(this.getCountsStep(e.clientX));
        this.updateProgressValue();
      });

      window.addEventListener('mousemove', (e) => {
        this.fireEvent(this.EVENT_MOUSEMOVE);

        if (this.isMouseDown) {
          this.isMouseMove = true;

          this.model.setValue(this.getCountsStep(e.clientX));
          this.updateProgressValue();
        } else {
          this.isMouseMove = false;
        }
      });

      window.addEventListener('mouseup', (e) => {
        this.fireEvent(this.EVENT_MOUSEUP);

        if (this.isMouseMove && this.isMouseDown) {
          this.model.setValue(this.getCountsStep(e.clientX));
          this.updateProgressValue();

          this.isMouseMove = false;
          this.isMouseDown = false;
        }
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

  public getProgressWrapRect(): { width: number, height: number } {
    if (this.progressWrap) {
      let progressWrapRect = this.progressWrap.getBoundingClientRect();

      return {
        width: progressWrapRect.width,
        height: progressWrapRect.height,
      }
    }

    return {
      width: 0,
      height: 0,
    };
  }

  public getStepWidth(): number {
    const progressWrapWidth = this.getProgressWrapRect().width;
    const stepWidth = Math.trunc(progressWrapWidth * this.model.getStepPercent() / 100 * 100) / 100;
    return stepWidth;
  }

  public getCountsStep(width: number): number {
    return Math.round(width / this.getStepWidth());
  }

  public updateProgressValue(): void {
    const counts = this.model.getValue() / this.model.getStep();
    const width = Math.round(this.getStepWidth() * counts);

    if (this.progress) {
      this.progress.style.width = `${width}px`;
    }
  }
}
