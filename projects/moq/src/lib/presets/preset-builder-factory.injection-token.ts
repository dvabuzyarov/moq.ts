import { InjectionToken } from "@angular/core";
import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { PresetBuilder } from "./preset-builder";

/**
 * @hidden
 */
export const PRESET_BUILDER_FACTORY = new InjectionToken<<T>(target: ExpectedExpressions<T>) => PresetBuilder<T>>("PRESET_BUILDER_FACTORY");
