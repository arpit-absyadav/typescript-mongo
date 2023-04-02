import * as NodeCache from 'node-cache';

const cache = new NodeCache();

export function Cache(time: number): any {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]): Promise<any> {
      const cacheKey = `${propertyKey}:${JSON.stringify(args)}`;
      console.log(cacheKey);

      const cachedValue = cache.get(cacheKey);

      if (cachedValue !== undefined) {
        console.log('Using cached value');
        return Promise.resolve(cachedValue);
      }

      return originalMethod.apply(this, args).then((result: any) => {
        cache.set(cacheKey, result, time);
        console.log('Caching result');
        return result;
      });
    };

    return descriptor;
  };
}
