import { InjectionToken } from "../static.injector/injection_token";

export type TypeofInjectionToken<Type> = Type extends InjectionToken<infer X> ? X : never;
