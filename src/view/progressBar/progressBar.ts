import Helper from "../../helper";
import EventListener from "../../event-listener";
import Slider from "../../model/slider";

export default class ProgressBar extends EventListener {
  private progress: HTMLElement | undefined;
  private progressWrap: HTMLElement | undefined;
  constructor(param: Slider) {
    super(param);
  }

  public addListeners(): void {
    const container = document.querySelector('.progress-bar__wrap');

    if (container) {
      container.addEventListener('click', (e) => {
        this.fireEvent('kek');
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
}
