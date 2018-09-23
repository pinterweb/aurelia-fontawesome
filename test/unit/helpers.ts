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
