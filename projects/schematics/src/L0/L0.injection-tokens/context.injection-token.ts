import { SchematicContext } from "@angular-devkit/schematics";
import { InjectionToken } from "../../static.injector/injection_token";

export const CONTEXT = new InjectionToken<SchematicContext>("SchematicContext");
