import { Tracker } from "../tracker/tracker";
import { NewOperatorExpression } from "../reflector/expressions";
import { InteractionPlayer } from "../interaction-players/interaction.player";

/**
 * @hidden
 */
export class ConstructTrap {
    constructor(
        private tracker: Tracker,
        private interactionPlayer: InteractionPlayer) {

    }

    public intercept(args: any[]): any {
        const interaction = new NewOperatorExpression(args);
        this.tracker.add(interaction);
        return this.interactionPlayer.play(interaction);
    }
}
