import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { Preset } from "./preset";
import { ExpressionExplorerFactory } from "./expression-explorer.factory";
import { InteractionPlayer } from "./interaction-player";
import { ObjectExplorerFactory } from "./object-explorer.factory";
import { Expressions } from "../expressions";

export class ReplicatesPresetFactory {
    constructor(private expressionExplorerFactory: ExpressionExplorerFactory = new ExpressionExplorerFactory(),
                private objectExplorerFactory: ObjectExplorerFactory = new ObjectExplorerFactory(),
                private interactionPlayer: InteractionPlayer = new InteractionPlayer()) {

    }

    public get<T>(target: ExpectedExpressions<T>, invocable: () => boolean, origin: T): Preset<T> {
        const expressionExplorer = this.expressionExplorerFactory.get(target);
        const objectExplorer = this.objectExplorerFactory.get(origin);
        const interactionPlayer = this.interactionPlayer;

        return new Preset<T>(
            target,
            invocable,
            function (expression: Expressions) {
                return <any>interactionPlayer.play(expression, origin);
            },
            function () {
                return [expressionExplorer, objectExplorer];
            }
        );
    }
}
