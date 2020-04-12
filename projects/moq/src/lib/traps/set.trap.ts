import { Tracker } from "../tracker";
import { SetPropertyInteraction } from "../interactions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { MoqAPI } from "../moq";

/**
 * @hidden
 */
export class SetTrap {
    constructor(
        private tracker: Tracker,
        private propertiesValueStorage: PropertiesValueStorage,
        private interactionPlayer: InteractionPlayer) {

    }

    public intercept(target: any, property: PropertyKey, value: any): boolean {
        const expression = new SetPropertyInteraction(property, value);

        this.tracker.add(expression);

        if (property === MoqAPI)
            return false;

        const accepted = this.interactionPlayer.play(expression);
        if (accepted === true || accepted === undefined) {
            this.propertiesValueStorage.set(property, value);
        }

        return accepted === undefined ? true : accepted;
    }
}
