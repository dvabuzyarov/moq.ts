import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { Expressions } from "../expressions";
import { ITypeExplorer } from "../type-explorers/type-explorer";
import { ExpressionExplorerFactory } from "../type-explorers/expression-explorer.factory";
import { CallbacksPresetFactory } from "./callbacks-preset.factory";

describe("Callbacks preset factory", () => {

    it("Returns preset", () => {
        const callback = jasmine.createSpy();
        const invocable = () => true;
        const target = <ExpectedExpressions<any>>{};
        const explorer = <ITypeExplorer>{};
        const expression = <Expressions>{};
        const result = {};

        const invocationAdapter = jasmine.createSpy()
            .withArgs(expression, callback)
            .and.returnValue(result);

        const expressionExplorerFactory = jasmine.createSpyObj<ExpressionExplorerFactory>("", ["get"]);

        expressionExplorerFactory.get.withArgs(target).and.returnValue(explorer);
        const factory = new CallbacksPresetFactory(expressionExplorerFactory, invocationAdapter);

        const actual = factory.get(target, invocable, callback);
        expect(actual.target).toBe(target);
        expect(actual.invocable).toBe(invocable);
        expect(actual.invoke(expression)).toBe(result);
        expect(actual.explorable()).toEqual([explorer]);
    });
});
