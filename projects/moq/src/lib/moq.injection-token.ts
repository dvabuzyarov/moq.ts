import { InjectionToken } from "@angular/core";
import { IMock } from "./moq";

export const MOCK = new InjectionToken<IMock<unknown>>("IMock");
