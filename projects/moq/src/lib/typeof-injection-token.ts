import { InjectionToken } from "./static.injector/injection_token";

export type typeofInjectionToken<Type> = Type extends InjectionToken<infer X> ? X : never;
