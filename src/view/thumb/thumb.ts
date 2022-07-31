import ThumbModel from "../../model/thumb";
import Helper from "../../helper";

export default class ThumbView {
  private value: number;
  private readonly showValue: boolean;
  private parent: HTMLElement;

  constructor(props: ThumbModel) {
    this.parent = props.parent;
    this.value = props.getValue();
    this.showValue = props.isShowValue();

    this.init();
  }

  private init() {
    const thumb: HTMLElement = Helper.addElement(['thumb']);

    if (this.showValue) {
      const thumbValueElement: HTMLElement = Helper.addElement(['thumb_value']);

      this.parent.append(thumbValueElement);
    }

   this.parent.append(thumb);
  }

  private updateValue() {}

}
