export class TypeUtils {
  static isObject(value: any): boolean {
    return (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      !value.then
    );
  }

  static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  static isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  static isInteger(value: any): boolean {
    return Number.isInteger(value);
  }

  static isString(value: any): boolean {
    return typeof value === 'string';
  }

  static isUndefined(value: any): boolean {
    return typeof value === 'undefined';
  }

  static isDefined(value: any): boolean {
    return typeof value !== 'undefined';
  }

  static isFile(value: any): boolean {
    return value instanceof File;
  }

  static isDate(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Date]';
  }

  static isFunction(value: any): boolean {
    return value && {}.toString.call(value) === '[object Function]';
  }

  static isPromise(value: any): boolean {
    return typeof value === 'object' && !!value?.then;
  }
}
