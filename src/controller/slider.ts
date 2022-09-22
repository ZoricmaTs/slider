import {UserSettings} from "../index";
import Slider from "../model/slider";
import ProgressBar from "../view/progressBar/progressBar";
import Scale from "../view/scale/scale";
import SliderView from "../view/slider/slider";
import Thumb from "../view/thumb/thumb";

export default class SliderController {
  private readonly model: Slider;
  private progressBarView: ProgressBar;
  private readonly view: SliderView | undefined;
  private scale: Scale | undefined;
  private thumbView: Thumb;


  constructor(params: UserSettings) {

    this.model = new Slider(params);
    this.view = new SliderView(this.model);
    this.initSliderContainer();

    this.progressBarView = new ProgressBar(this.model, this.view);
    this.initProgressBar();

    this.thumbView = new Thumb(this.model, this.view);
    this.initThumb();

    this.initScale();

    this.bindFn();

    this.addEvents();
  }

  private bindFn(): void {
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  private addEvents(): void {
    this.progressBarView.updateProgress();

    this.progressBarView.on(this.progressBarView.EVENT_MOUSEDOWN, [this.onMouseDown]);
    this.progressBarView.on(this.progressBarView.EVENT_MOUSEUP, [this.onMouseUp]);
    this.progressBarView.on(this.progressBarView.EVENT_MOUSEMOVE, [this.onMouseMove]);

    this.thumbView.updateProgress();

    this.thumbView.on(this.thumbView.EVENT_MOUSEDOWN, [this.onMouseDown]);
    this.thumbView.on(this.thumbView.EVENT_MOUSEUP, [this.onMouseUp]);
    this.thumbView.on(this.thumbView.EVENT_MOUSEMOVE, [this.onMouseMove]);
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
  }

  private initThumb(): void {
    // @ts-ignore
    this.view.getSliderWrapper().append(this.thumbView.getContainer());
  }

  private initScale(): void {
    this.scale = new Scale(this.model);
    // @ts-ignore
    this.view.getSlider().append(this.scale.getContainer())
  }
}
