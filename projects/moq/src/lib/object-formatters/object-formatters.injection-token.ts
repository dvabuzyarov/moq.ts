import { InjectionToken } from "../static.injector/injection_token";
import { IObjectFormatter } from "./object-formatter.type";

export const OBJECT_FORMATTERS = new InjectionToken<IObjectFormatter[]>("OBJECT_FORMATTERS");
