import { IMockOptions } from "../moq";
import { InjectionToken } from "../static.injector";

/**
 * @hidden
 */
export const MOCK_OPTIONS = new InjectionToken<IMockOptions<any>>("mock options");
