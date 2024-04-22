
import { performance } from 'perf_hooks';

export const logMethodExecutionTime = (target, propertyKey, descriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async (...args) => {
    const startTime = performance.now();
    const result = await originalMethod.apply(target, args);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    console.log(`Method ${propertyKey} executed in ${executionTime}ms`);
    return result;
  };

  return descriptor;
};