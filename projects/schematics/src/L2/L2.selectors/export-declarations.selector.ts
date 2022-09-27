import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { createSelector } from "../../L4/L4.ngrx/create-selector";
import { StatementsSelector } from "./statements.selector";
import typescript, { ExportDeclaration } from "typescript";

const {SyntaxKind} = typescript;

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
