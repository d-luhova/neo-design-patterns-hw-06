import { IMessageService } from "./IMessageService";

export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number
): IMessageService {
  let lastCallTime = 0;

  return new Proxy(service, {
    get(target, prop) {
      if (prop === "send" && typeof target[prop] === "function") {
        return function (message: string) {
          const now = Date.now();
          if (now - lastCallTime < intervalMs) {
            console.log("[RateLimit] skipped");
            return;
          }
          lastCallTime = now;
          return target[prop](message);
        };
      }
      return (target as any)[prop];
    },
  });
}