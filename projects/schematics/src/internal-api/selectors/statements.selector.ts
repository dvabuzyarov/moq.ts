import { SourceFile } from "typescript";
import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Injectable } from "@angular/core";
import { createSelector } from "../../L4/L4.ngrx/create-selector";

@Injectable()
export class StatementsSelector implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return createSelector(
            (source: SourceFile) => source,
            source => source.statements
        );
    }
}
