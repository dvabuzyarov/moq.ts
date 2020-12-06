import { createMoqInjector, get, resolve } from "../../L1.unit-test.components/createMoqInjector";
import { StatementsSelector } from "./statements.selector";
import { dataMock } from "../../L1.unit-test.components/data-mock";
import { ExportDeclaration, NodeArray, SourceFile, Statement, SyntaxKind } from "typescript";
import { ExportDeclarationsSelector } from "./export-declarations.selector";

describe("Export declarations selector", () => {
    beforeEach(() => {
        createMoqInjector(ExportDeclarationsSelector);
    });

    it("Should be resolved", () => {
        const actual = get<ExportDeclarationsSelector>();
        expect(actual).toEqual(jasmine.any(Function));
    });

    it("Returns export declarations", () => {
        const statement = dataMock<ExportDeclaration>({kind: SyntaxKind.ExportDeclaration});
        const statements = dataMock<NodeArray<Statement>>([statement]);

        const sourceFile = dataMock<SourceFile>({});

        resolve(StatementsSelector)
            .setup(instance => instance(sourceFile))
            .returns(statements);

        const selector = get<ExportDeclarationsSelector>();
        const actual = selector(sourceFile);

        expect(actual).toEqual([statement]);
    });

    it("Does not return non export declarations", () => {
        const statement = dataMock<ExportDeclaration>({kind: SyntaxKind.Block});
        const statements = dataMock<NodeArray<Statement>>([statement]);

        const sourceFile = dataMock<SourceFile>({});

        resolve(StatementsSelector)
            .setup(instance => instance(sourceFile))
            .returns(statements);

        const selector = get<ExportDeclarationsSelector>();
        const actual = selector(sourceFile);

        expect(actual).toEqual([]);
    });
});
