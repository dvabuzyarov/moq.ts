import { createMoqInjector, get } from "../../L1.unit-test.components/createMoqInjector";
import { StatementsSelector } from "./statements.selector";
import { dataMock } from "../../L1.unit-test.components/data-mock";
import { NodeArray, SourceFile, Statement } from "typescript";

describe("Statements selector", () => {
    beforeEach(() => {
        createMoqInjector(StatementsSelector);
    });

    it("Should be resolved", () => {
        const actual = get<StatementsSelector>();
        expect(actual).toEqual(jasmine.any(Function));
    });

    it("Returns statements", () => {
        const statements = dataMock<NodeArray<Statement>>([]);
        const sourceFile = dataMock<SourceFile>({statements});

        const selector = get<StatementsSelector>();
        const actual = selector(sourceFile);

        expect(actual).toBe(statements);
    });
});
