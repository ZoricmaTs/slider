export default class Helper {
  static addElement(classNames: string[] = []): HTMLElement {
    const element = document.createElement('div');

    classNames.forEach((className) => {
      element.classList.add(className);
    });

    return element;
  }

  static getComputedValue(element: HTMLElement, styleName: string): number {
    return Number(window.getComputedStyle(element, null).getPropertyValue(styleName).slice(0, -2));
  }
}
