import { performance } from "perf_hooks";
import log4js from "log4js";

const logger = log4js.getLogger("default");

export const logMethodExecutionTime = (
  target: any,
  propertyKey: any,
  descriptor: any,
) => {
  const originalMethod = descriptor.value;

  descriptor.value = async (...args: any) => {
    const startTime = performance.now();
    const result = await originalMethod.apply(target, args);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    logger.info(`Method ${propertyKey} executed in ${executionTime}ms`);
    return result;
  };

  return descriptor;
};
