export const toCamelCase = (str: string ): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|[\s+\-_\/])/g, function(match, index) {
    //remove white space or hypens or underscores
    if (/[\s+\-_\/]/.test(match)) return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export function createSpyObj(name: string, prototype: any) {
  if (!prototype) {
    throw Error('obj to fake required');
  }
  if (!name) {
    throw Error('name for the fake obj required');
  }

  const obj: any = {};

  for (let key in prototype) {
    obj[key] = jest.fn();
  }

  return obj;
}

export const toHyphenCase = (str: string): string => {
  const camel = toCamelCase(str);

  return camel.replace(/[A-Z]/, (match, offset) =>
    (offset ? '-' : '') + match.toLowerCase());
};
