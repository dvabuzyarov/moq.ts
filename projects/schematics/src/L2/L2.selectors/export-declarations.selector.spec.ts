import { createInjector, resolve, resolveMock } from "../../L1.unit-test.components/createMoqInjector";
import { StatementsSelector } from "./statements.selector";
import { dataMock } from "../../L1.unit-test.components/data-mock";
import { ExportDeclarationsSelector } from "./export-declarations.selector";

import typescript, { ExportDeclaration, NodeArray, SourceFile, Statement } from "typescript";

const {SyntaxKind} = typescript;

describe("Export declarations selector", () => {
    beforeEach(() => {
        createInjector(ExportDeclarationsSelector, [StatementsSelector]);
    });

    it("Should be resolved", () => {
        const actual = resolve<ExportDeclarationsSelector>();
        expect(actual).toEqual(jasmine.any(Function));
    });

    it("Returns export declarations", () => {
        const statement = dataMock<ExportDeclaration>({kind: SyntaxKind.ExportDeclaration});
        const statements = dataMock<NodeArray<Statement>>([statement]);

        const sourceFile = dataMock<SourceFile>({});

        resolveMock(StatementsSelector)
            .setup(instance => instance(sourceFile))
            .returns(statements);

        const selector = resolve<ExportDeclarationsSelector>();
        const actual = selector(sourceFile);

        expect(actual).toEqual([statement]);
    });

    it("Does not return non export declarations", () => {
        const statement = dataMock<ExportDeclaration>({kind: SyntaxKind.Block});
        const statements = dataMock<NodeArray<Statement>>([statement]);

        const sourceFile = dataMock<SourceFile>({});

        resolveMock(StatementsSelector)
            .setup(instance => instance(sourceFile))
            .returns(statements);

        const selector = resolve<ExportDeclarationsSelector>();
        const actual = selector(sourceFile);

        expect(actual).toEqual([]);
    });
});
