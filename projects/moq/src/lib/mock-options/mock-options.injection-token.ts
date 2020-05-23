import { IMockOptions } from "../moq";
import { InjectionToken } from "../static.injector/injection_token";

/**
 * @hidden
 */
export const MOCK_OPTIONS = new InjectionToken<IMockOptions<any>>("mock options");
