import { IObjectMatcher } from "./object-matcher.type";
import { InjectionToken } from "../static.injector";

export const OBJECT_MATCHERS = new InjectionToken<IObjectMatcher[]>("OBJECT_MATCHERS");
