type SrcSetDescriptorType = 'w' | 'x';

interface ISrcSetCandidate {
  url: string;
  type: SrcSetDescriptorType;
  value: number;
}

interface IExpectedSrcInfo {
  expected: string;
  dpr: number;
  neededWidth: number | null;
  sourceSize: number | null;
  type: SrcSetDescriptorType | 'src';
}

const DEFAULT_GALLERY_SELECTOR = '.reacg-gallery img';

const toAbs = (url: string): string => {
  try {
    return new URL(url, document.baseURI).href;
  } catch {
    return url;
  }
};

const isSrcSetCandidate = (
  candidate: ISrcSetCandidate | null
): candidate is ISrcSetCandidate => Boolean(candidate);

const parseSrcset = (srcset: string | null): ISrcSetCandidate[] => {
  if (!srcset) return [];

  return srcset
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item): ISrcSetCandidate | null => {
      const [url, descriptor] = item.split(/\s+/);

      if (!url) return null;
      if (!descriptor) return {url: toAbs(url), type: 'x', value: 1};

      if (descriptor.endsWith('w')) {
        return {url: toAbs(url), type: 'w', value: parseInt(descriptor, 10)};
      }

      if (descriptor.endsWith('x')) {
        return {url: toAbs(url), type: 'x', value: parseFloat(descriptor)};
      }

      return null;
    })
    .filter(isSrcSetCandidate);
};

const getExpectedInfo = (
  img: HTMLImageElement,
  renderedWidth: number
): IExpectedSrcInfo => {
  const srcset = parseSrcset(img.getAttribute('srcset'));
  const dpr = window.devicePixelRatio || 1;

  if (srcset.length === 0) {
    return {
      expected: toAbs(img.src),
      dpr,
      neededWidth: null,
      sourceSize: null,
      type: 'src',
    };
  }

  const type = srcset[0].type;
  const sorted = [...srcset].sort((a, b) => a.value - b.value);

  if (type === 'x') {
    return {
      expected: (
        sorted.find((candidate) => candidate.value >= dpr) ||
        sorted[sorted.length - 1]
      ).url,
      dpr,
      neededWidth: null,
      sourceSize: null,
      type: 'x',
    };
  }

  const sourceSize = renderedWidth;
  const neededWidth = sourceSize * dpr;

  return {
    expected: (
      sorted.find((candidate) => candidate.value >= neededWidth) ||
      sorted[sorted.length - 1]
    ).url,
    dpr,
    neededWidth,
    sourceSize,
    type: 'w',
  };
};

export const checkGallerySrcset = (
  selector = DEFAULT_GALLERY_SELECTOR
): void => {
  const images = document.querySelectorAll<HTMLImageElement>(selector);

  images.forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    const info = getExpectedInfo(img, rect.width);
    const actual = toAbs(img.currentSrc || img.src);
    const match = info.expected === actual;

    console.group(`${match ? '[OK]' : '[FAIL]'} Image ${index + 1}`);
    console.log('element:', img);
    console.log(
      'rendered:',
      `${Math.round(rect.width)} x ${Math.round(rect.height)}`
    );
    console.log('dpr:', info.dpr);
    console.log('sizes:', img.getAttribute('sizes'));
    console.log('srcset:', img.getAttribute('srcset'));
    if (info.type === 'w') {
      console.log('source size:', Math.round(info.sourceSize ?? 0));
      console.log(
        'needed width:',
        Math.round(info.neededWidth ?? 0),
        `(${Math.round(info.sourceSize ?? 0)} * ${info.dpr})`
      );
    }
    console.log('expected:', info.expected);
    console.log('actual:', actual);
    console.log('match:', match);
    console.groupEnd();
  });
};

declare global {
  interface Window {
    checkGallerySrcset: typeof checkGallerySrcset;
  }
}

window.checkGallerySrcset = checkGallerySrcset;
