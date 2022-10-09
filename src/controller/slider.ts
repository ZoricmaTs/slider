import {UserSettings} from "../index";
import Slider, {SliderMode} from "../model/slider";
import ProgressBar from "../view/progressBar/progressBar";
import Scale from "../view/scale/scale";
import SliderView from "../view/slider/slider";
import Thumb from "../view/thumb/thumb";

export default class SliderController {
  private readonly model: Slider;
  private readonly progressBarView: ProgressBar;
  private readonly view: SliderView | undefined;
  private scale: Scale | undefined;
  private thumbView: Thumb | undefined;
  private thumbFirstView: Thumb | undefined;
  private thumbSecondView: Thumb | undefined;


  constructor(params: UserSettings) {

    this.model = new Slider(params);
    this.view = new SliderView(this.model);
    this.initSliderContainer();

    this.progressBarView = new ProgressBar(this.model, this.view);
    this.initProgressBar();

    this.initThumb();

    this.initScale();

    this.bindFn();

    this.addEvents();
  }

  private bindFn(): void {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  private addEvents(): void {
    if (this.progressBarView) {
      this.progressBarView.updateProgress();

      this.progressBarView.on(this.progressBarView.EVENT_MOUSEDOWN, [this.onMouseDown]);
      this.progressBarView.on(this.progressBarView.EVENT_MOUSEUP, [this.onMouseUp]);
      this.progressBarView.on(this.progressBarView.EVENT_MOUSEMOVE, [this.onMouseMove]);
    }

    if (this.thumbView) {
      this.thumbView.updateThumb();

      this.thumbView.on(this.thumbView.EVENT_MOUSEDOWN, [this.onMouseDown]);
      this.thumbView.on(this.thumbView.EVENT_MOUSEUP, [this.onMouseUp]);
      this.thumbView.on(this.thumbView.EVENT_MOUSEMOVE, [this.onMouseMove]);
    }

    if (this.thumbFirstView) {
      this.thumbFirstView.updateThumb();
      this.thumbFirstView.on(this.thumbFirstView.EVENT_MOUSEDOWN, [this.onMouseDown]);
      this.thumbFirstView.on(this.thumbFirstView.EVENT_MOUSEUP, [this.onMouseUp]);
      this.thumbFirstView.on(this.thumbFirstView.EVENT_MOUSEMOVE, [this.onMouseMove]);
    }
    if (this.thumbSecondView) {
      this.thumbSecondView.updateThumb();
      this.thumbSecondView.on(this.thumbSecondView.EVENT_MOUSEDOWN, [this.onMouseDown]);
      this.thumbSecondView.on(this.thumbSecondView.EVENT_MOUSEUP, [this.onMouseUp]);
      this.thumbSecondView.on(this.thumbSecondView.EVENT_MOUSEMOVE, [this.onMouseMove]);
    }
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
    // @ts-ignore
    this.model.root.append(this.view.getSlider());
  }

  private initProgressBar(): void {
    // @ts-ignore
    this.view.getSliderWrapper().append(this.progressBarView.getContainer());
    this.progressBarView.updateProgressValue();
  }

  private initThumb(): void {
    if (this.view) {
      if (this.model.mode === SliderMode.single) {
        this.thumbView = new Thumb(this.model, this.view, 1);
        this.view.getSliderWrapper().append(this.thumbView.getContainer());
      } else {
        this.thumbFirstView = new Thumb(this.model, this.view, 0);
        this.thumbSecondView = new Thumb(this.model, this.view, 1);
        this.view.getSliderWrapper().append(this.thumbFirstView.getContainer());
        this.view.getSliderWrapper().append(this.thumbSecondView.getContainer());

        this.thumbFirstView.updatePosition();
        this.thumbSecondView.updatePosition();
      }
    }
  }

  private initScale(): void {
    // @ts-ignore
    this.scale = new Scale(this.model, this.view);
    // @ts-ignore
    this.view.getSlider().append(this.scale.getContainer())
  }
}
