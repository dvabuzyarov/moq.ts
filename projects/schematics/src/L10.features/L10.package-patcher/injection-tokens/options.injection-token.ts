import { JsonObject } from "@angular-devkit/core";
import { ISchema } from "../schema";
import { InjectionToken } from "../../../static.injector/injection_token";

export const OPTIONS = new InjectionToken<JsonObject & ISchema>("Options");
