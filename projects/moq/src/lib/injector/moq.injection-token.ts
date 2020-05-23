import { IMock } from "../moq";
import { InjectionToken } from "../static.injector";

/**
 * @Hidden
 */
export const MOCK = new InjectionToken<IMock<unknown>>("IMock");
