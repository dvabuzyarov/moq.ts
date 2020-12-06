import { InjectionToken } from "@angular/core";
import { Tree } from "@angular-devkit/schematics";

export const HOST = new InjectionToken<Tree>("Tree host");
