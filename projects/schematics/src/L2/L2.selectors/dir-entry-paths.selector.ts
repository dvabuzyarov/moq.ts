import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { createSelector } from "../../L4/L4.ngrx/create-selector";
import { DirEntry } from "@angular-devkit/schematics";

export class DirEntryPathsSelector implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return createSelector(
            (source: DirEntry) => source,
            source => {
                const paths: string[] = [];
                source.visit((path) => paths.push(path));
                return paths;
            }
        );
    }
}
