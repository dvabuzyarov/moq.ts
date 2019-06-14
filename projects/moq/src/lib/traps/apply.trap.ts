import { Tracker } from "../tracker";
import { MethodExpression } from "../expressions";
import { InteractionPlayer } from "../interaction-players/interaction.player";

/**
 * @hidden
 */
export class ApplyTrap {
    constructor(
        private tracker: Tracker,
        private interactionPlayer: InteractionPlayer) {

    }

    public intercept(target: any, thisArg: any, argArray?: any): any {
        const expression = new MethodExpression(argArray);

        this.tracker.add(expression);

        return this.interactionPlayer.play(expression);
    }
}
