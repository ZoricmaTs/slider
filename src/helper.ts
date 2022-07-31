export default class Helper {
  static addElement(classNames: string[] = []): HTMLElement {
    const element = document.createElement('div');
    element.classList.add('scale__division');

    classNames.forEach((className) => {
      element.classList.add(className);
    });

    return element;
  }
}
