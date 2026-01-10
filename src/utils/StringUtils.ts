export class StringUtils {
  /** Generate RFC4122 v4 UUID (best-effort in older environments). */
  static getUuid(): string {
    // Modern browsers + Node 16.17+/18+
    if (typeof globalThis.crypto?.randomUUID === 'function') {
      return globalThis.crypto.randomUUID();
    }

    // Fallback: use crypto.getRandomValues if present
    const cryptoObj = globalThis.crypto as Crypto | undefined;
    if (cryptoObj?.getRandomValues) {
      const bytes = new Uint8Array(16);
      cryptoObj.getRandomValues(bytes);

      // RFC4122 version/variant bits
      bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
      bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10

      const hex = [...bytes]
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      return (
        hex.slice(0, 8) +
        '-' +
        hex.slice(8, 12) +
        '-' +
        hex.slice(12, 16) +
        '-' +
        hex.slice(16, 20) +
        '-' +
        hex.slice(20)
      );
    }

    // Last-resort fallback (not cryptographically strong)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
