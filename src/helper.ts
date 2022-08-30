export default class Helper {
  static addElement(classNames: string[] = []): HTMLElement {
    const element = document.createElement('div');

    classNames.forEach((className) => {
      element.classList.add(className);
    });

    return element;
  }
}
