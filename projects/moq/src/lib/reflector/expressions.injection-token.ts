import { InjectionToken } from "../static.injector/injection_token";
import { Expressions } from "./expressions";

/**
 * @hidden
 */
export const EXPRESSIONS = new InjectionToken<Expressions<unknown>[]>("reflected expressions");
