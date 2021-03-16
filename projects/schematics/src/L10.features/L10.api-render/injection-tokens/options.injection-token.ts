import { InjectionToken } from "@angular/core";
import { JsonObject } from "@angular-devkit/core";
import { ISchema } from "../schema";

export const OPTIONS = new InjectionToken<JsonObject & ISchema>("Options");
