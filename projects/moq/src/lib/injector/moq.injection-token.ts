import { InjectionToken } from "@angular/core";
import { IMock } from "../moq";

/**
 * @Hidden
 */
export const MOCK = new InjectionToken<IMock<unknown>>("IMock");
