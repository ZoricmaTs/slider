import {UserSettings} from "../index";
import Slider from "../model/slider";
import ProgressBar from "../view/progressBar/progressBar";
import Helper from "../helper";
import Scale from "../view/scale/scale";

export default class SliderController {
  private readonly model: Slider;
  private progressBarView: ProgressBar;
  private sliderContainer: HTMLElement | undefined;
  private scale: Scale | undefined;


  constructor(params: UserSettings) {

    this.model = new Slider(params);

    this.initSliderContainer();
    this.progressBarView = new ProgressBar(this.model);
    this.initProgressBar();
    this.initScale();

    this.bindFn();

    this.addEvents();
  }

  private bindFn(): void {
    this.onMouseClick = this.onMouseClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  private addEvents(): void {
    this.progressBarView.updateProgress();

    this.progressBarView.on(this.progressBarView.EVENT_CLICK, [this.onMouseClick]);
    this.progressBarView.on(this.progressBarView.EVENT_MOUSEDOWN, [this.onMouseDown]);
    this.progressBarView.on(this.progressBarView.EVENT_MOUSEUP, [this.onMouseUp]);
    this.progressBarView.on(this.progressBarView.EVENT_MOUSEMOVE, [this.onMouseMove]);
  }

  private onMouseClick(): void {

  }

  private onMouseDown(): void {
    // this.model.setValue();
  }

  private onMouseUp(): void {
    // this.model.setValue();
  }

  private onMouseMove(): void {
    // this.model.setValue();
  }

  private initSliderContainer(): void {
    this.sliderContainer = Helper.addElement(['wrap']);
    this.model.root.append(this.sliderContainer);
  }

  private initProgressBar(): void {
    // @ts-ignore
    this.sliderContainer.append(this.progressBarView.getContainer());
  }

  private initScale(): void {
    this.scale = new Scale(this.model);
    // @ts-ignore
    this.sliderContainer.append(this.scale.getContainer())
  }
}
