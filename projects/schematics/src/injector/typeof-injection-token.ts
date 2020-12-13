import { InjectionToken } from "@angular/core";

export type TypeofInjectionToken<Type> = Type extends InjectionToken<infer X> ? X : never;
