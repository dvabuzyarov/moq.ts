import { InjectionToken } from "@angular/core";
import { IObjectMatcher } from "./object-matcher.type";

export const OBJECT_MATCHERS = new InjectionToken<IObjectMatcher[]>("OBJECT_MATCHERS");
