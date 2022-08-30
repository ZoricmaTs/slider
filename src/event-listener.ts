
export default class EventListener {
  private readonly map: {
    [key: string | number]: (() => void)[]
  };

  constructor(props: any) {
    this.map = {}
  }

  public on(event: string, fn: (() => void)[]) {
    if (typeof this.map[event] !== 'undefined') {
      fn.forEach((item) => {
        if (!this.map[event].includes(item)) {
          this.map[event].push(item);
        }
      });
    } else {
      const copyFn = fn;
      this.map[event] = copyFn;
    }
  }

  public off(event: string, handler: () => void) {
    if (typeof this.map[event] !== 'undefined') {
      this.map[event] = this.map[event].filter((fn) => (fn !== handler));
    }
  }

  public fireEvent(event: string) {
    this.map[event].forEach((fn) => fn());
  }
}
