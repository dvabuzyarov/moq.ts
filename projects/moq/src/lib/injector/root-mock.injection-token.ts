import { IMock } from "../moq";
import { InjectionToken } from "../static.injector/injection_token";

/**
 * @Hidden
 */
export const ROOT_MOCK = new InjectionToken<IMock<unknown>>("ROOT MOCK");
