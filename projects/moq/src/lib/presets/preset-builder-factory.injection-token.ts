import { Expressions } from "../reflector/expressions";
import { PresetBuilder } from "./preset-builder";
import { InjectionToken } from "../static.injector/injection_token";

/**
 * @hidden
 */
export const PRESET_BUILDER_FACTORY = new InjectionToken<<T>(target: Expressions<T>) => PresetBuilder<T>>("PRESET_BUILDER_FACTORY");
