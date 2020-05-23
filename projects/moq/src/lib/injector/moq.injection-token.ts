import { IMock } from "../moq";
import { InjectionToken } from "../static.injector/injection_token";

/**
 * @Hidden
 */
export const MOCK = new InjectionToken<IMock<unknown>>("IMock");
