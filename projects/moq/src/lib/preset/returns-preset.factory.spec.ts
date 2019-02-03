import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { ReturnsPresetFactory } from "./returns-preset.factory";
import { Expressions } from "../expressions";
import { ITypeExplorer } from "./preset";
import { ExpressionExplorerFactory } from "./expression-explorer.factory";

describe("Returns preset factory", () => {

    it("Returns preset", () => {
        const value = "value";
        const invocable = () => true;
        const target = <ExpectedExpressions<any>>{};
        const explorer = <ITypeExplorer>{};

        const expressionExplorerFactory = jasmine.createSpyObj<ExpressionExplorerFactory>("", ["get"]);
        expressionExplorerFactory.get.withArgs(target).and.returnValue(explorer);

        const factory = new ReturnsPresetFactory(expressionExplorerFactory);
        const actual = factory.get(target, invocable, value);

        expect(actual.target).toBe(target);
        expect(actual.invocable).toBe(invocable);
        expect(actual.invoke(<Expressions>undefined)).toBe(value);
        expect(actual.explorable()).toEqual([explorer]);
    });
});
