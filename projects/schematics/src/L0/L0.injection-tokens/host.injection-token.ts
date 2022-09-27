import { Tree } from "@angular-devkit/schematics";
import { InjectionToken } from "../../static.injector/injection_token";

export const HOST = new InjectionToken<Tree>("Tree host");
