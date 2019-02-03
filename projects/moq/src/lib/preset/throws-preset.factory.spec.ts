import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { Expressions } from "../expressions";
import { ITypeExplorer } from "../type-explorers/type-explorer";
import { ExpressionExplorerFactory } from "../type-explorers/expression-explorer.factory";
import { ThrowsPresetFactory } from "./throws-preset.factory";

describe("Throws preset factory", () => {

    it("Returns preset", () => {
        const error = new Error();
        const invocable = () => true;
        const target = <ExpectedExpressions<any>>{};
        const explorer = <ITypeExplorer>{};

        const expressionExplorerFactory = jasmine.createSpyObj<ExpressionExplorerFactory>("", ["get"]);
        expressionExplorerFactory.get.withArgs(target).and.returnValue(explorer);

        const factory = new ThrowsPresetFactory(expressionExplorerFactory);
        const actual = factory.get(target, invocable, error);

        expect(actual.target).toBe(target);
        expect(actual.invocable).toBe(invocable);
        expect(() => actual.invoke(<Expressions>undefined)).toThrow(error);
        expect(actual.explorable()).toEqual([explorer]);
    });
});
