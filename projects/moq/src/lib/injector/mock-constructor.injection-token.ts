import { IMock, IMockOptions } from "../moq";
import { InjectionToken } from "../static.injector/injection_token";

/**
 * @Hidden
 */
export const MOCK_CONSTRUCTOR = new InjectionToken<(opts: IMockOptions<unknown>) => IMock<unknown>>("IMock constructor");
