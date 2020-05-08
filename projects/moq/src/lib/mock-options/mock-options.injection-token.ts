import { InjectionToken } from "@angular/core";
import { IMockOptions } from "../moq";

/**
 * @hidden
 */
export const MOCK_OPTIONS = new InjectionToken<IMockOptions<any>>("mock options");
