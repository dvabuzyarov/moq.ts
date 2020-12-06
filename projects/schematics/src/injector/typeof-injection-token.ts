import { InjectionToken } from "@angular/core";

export type typeofInjectionToken<Type> = Type extends InjectionToken<infer X> ? X : never;
