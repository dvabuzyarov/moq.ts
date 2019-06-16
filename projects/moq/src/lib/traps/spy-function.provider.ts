import { Tracker } from "../tracker";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { NamedMethodExpression } from "../expressions";

/**
 * @hidden
 */
export class SpyFunctionProvider {
    constructor(
        private tracker: Tracker,
        private interactionPlayer: InteractionPlayer) {

    }

    public get(property: PropertyKey): (...args) => any {
        return (...args): any => {
            const expression = new NamedMethodExpression(property, args);
            this.tracker.add(expression);
            return this.interactionPlayer.play(expression);
        };
    }
}
