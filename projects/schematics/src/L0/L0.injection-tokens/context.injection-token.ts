import { InjectionToken } from "@angular/core";
import { SchematicContext } from "@angular-devkit/schematics";

export const CONTEXT = new InjectionToken<SchematicContext>("SchematicContext");
