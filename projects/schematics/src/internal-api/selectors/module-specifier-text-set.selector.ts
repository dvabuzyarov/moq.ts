import { Injectable } from "@angular/core";
import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { createSelector } from "../../L4/L4.ngrx/create-selector";
import { ExportDeclarationsSelector } from "./export-declarations.selector";
import { StringLiteral } from "typescript";
import { normalize } from "@angular-devkit/core";

@Injectable()
export class ModuleSpecifierTextSetSelector implements InjectionFactory {
    constructor(private readonly exportDeclarationsSelector: ExportDeclarationsSelector) {
        return this.factory() as any;
    }

    factory() {
        return createSelector(
            this.exportDeclarationsSelector,
            declarations => {
                const values = declarations
                    .map(({moduleSpecifier}) => normalize((moduleSpecifier as StringLiteral).text));
                return new Set(values);
            }
        );
    }
}
