import { InjectionToken } from "./static.injector";

export type typeofInjectionToken<Type> = Type extends InjectionToken<infer X> ? X : never;
