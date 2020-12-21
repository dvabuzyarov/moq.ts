import { Tracker } from "../tracker/tracker";
import { NewOperatorInteraction } from "../interactions";
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
        const interaction = new NewOperatorInteraction(args);
        this.tracker.add(interaction);
        return this.interactionPlayer.play(interaction);
    }
}
