import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { Expressions } from "../expressions";
import { ITypeExplorer } from "../type-explorers/type-explorer";
import { ExpressionExplorerFactory } from "../type-explorers/expression-explorer.factory";
import { ReplicatesPresetFactory } from "./replicates-preset.factory";
import { InteractionPlayer } from "./interaction-player";
import { ObjectExplorerFactory } from "../type-explorers/object-explorer.factory";

describe("Replicates preset factory", () => {

    it("Returns preset", () => {
        const origin = {};
        const invocable = () => true;
        const target = <ExpectedExpressions<any>>{};
        const expressionExplorer = <ITypeExplorer>{};
        const originExplorer = <ITypeExplorer>{};
        const expression = <Expressions>{};
        const result = {};

        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        interactionPlayer.play
            .withArgs(expression, origin)
            .and.returnValue(result);

        const expressionExplorerFactory = jasmine.createSpyObj<ExpressionExplorerFactory>("", ["get"]);
        expressionExplorerFactory.get.withArgs(target).and.returnValue(expressionExplorer);

        const objectExplorerFactory = jasmine.createSpyObj<ObjectExplorerFactory>("", ["get"]);
        objectExplorerFactory.get.withArgs(origin).and.returnValue(originExplorer);

        const factory = new ReplicatesPresetFactory(expressionExplorerFactory, objectExplorerFactory, interactionPlayer);
        const actual = factory.get(target, invocable, origin);

        expect(actual.target).toBe(target);
        expect(actual.invocable).toBe(invocable);
        expect(actual.invoke(expression)).toBe(result);
        expect(actual.explorable()).toEqual([expressionExplorer, originExplorer]);
    });
});
