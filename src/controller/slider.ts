import {UserSettings} from "../index";
import Slider from "../model/slider";
import ProgressBar from "../view/progressBar/progressBar";
import Helper from "../helper";

export default class SliderController {
  private readonly model: Slider;
  private progressBarView: ProgressBar;
  private sliderContainer: HTMLElement | undefined;

  constructor(params: UserSettings) {

    this.model = new Slider(params);

    this.progressBarView = new ProgressBar(this.model);
    this.initProgressBar();

    this.onMouseClick = this.onMouseClick.bind(this);
    this.progressBarView.on('kek', [this.onMouseClick]);

    this.progressBarView.updateProgress();
  }

  private onMouseClick(): void {
    window.addEventListener('click', (e) => {
      console.log(`:->`, e);
    })
  }

  private initProgressBar(): void {
    this.sliderContainer = Helper.addElement(['wrap']);
    this.model.root.append(this.sliderContainer);

    this.sliderContainer.append(this.progressBarView.getContainer());
  }
}
