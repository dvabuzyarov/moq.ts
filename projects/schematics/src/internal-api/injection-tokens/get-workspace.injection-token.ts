import { InjectionToken } from "@angular/core";
import { getWorkspace } from "@angular/cli/utilities/config";

export const GETWORKSPACE = new InjectionToken<typeof getWorkspace>("GetWorkspace");
