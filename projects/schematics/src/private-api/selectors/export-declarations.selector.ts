import { Injectable } from "@angular/core";
import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { createSelector } from "../../L4/L4.ngrx/create-selector";
import { StatementsSelector } from "./statements.selector";
import { ExportDeclaration, SyntaxKind } from "typescript";

@Injectable()
export class ExportDeclarationsSelector implements InjectionFactory {
    constructor(private readonly statementsSelector: StatementsSelector) {
        return this.factory() as any;
    }

    factory() {
        return createSelector(
            this.statementsSelector,
            statements => statements
                .filter(({kind}) => kind === SyntaxKind.ExportDeclaration)
                .map(item => item as ExportDeclaration)
        );
    }
}
