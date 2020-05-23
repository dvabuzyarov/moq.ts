import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { PresetBuilder } from "./preset-builder";
import { InjectionToken } from "../static.injector/injection_token";

/**
 * @hidden
 */
export const PRESET_BUILDER_FACTORY = new InjectionToken<<T>(target: ExpectedExpressions<T>) => PresetBuilder<T>>("PRESET_BUILDER_FACTORY");
