import { createMoqInjector, resolve, resolveMock } from "../../L1.unit-test.components/createMoqInjector";
import { dataMock } from "../../L1.unit-test.components/data-mock";
import { ExportDeclaration, SourceFile, StringLiteral } from "typescript";
import { ExportDeclarationsSelector } from "./export-declarations.selector";
import { ModuleSpecifierTextSetSelector } from "./module-specifier-text-set.selector";

describe("Module specifier text set selector", () => {
    beforeEach(() => {
        createMoqInjector(ModuleSpecifierTextSetSelector);
    });

    it("Should be resolved", () => {
        const actual = resolve<ModuleSpecifierTextSetSelector>();
        expect(actual).toEqual(jasmine.any(Function));
    });

    it("Returns set of module paths", () => {
        const text = "/module/path";
        const moduleSpecifier = dataMock<StringLiteral>({text});
        const statement = dataMock<ExportDeclaration>({moduleSpecifier});
        const sourceFile = dataMock<SourceFile>({});

        resolveMock(ExportDeclarationsSelector)
            .setup(instance => instance(sourceFile))
            .returns([statement]);

        const selector = resolve<ModuleSpecifierTextSetSelector>();
        const actual = selector(sourceFile);

        expect(actual).toEqual(new Set([text]));
    });
});
