export class Utils {
  static debounce(callback: (args: unknown) => unknown, timeout = 300) {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(this, args);
      }, timeout);
    };
  }
}
