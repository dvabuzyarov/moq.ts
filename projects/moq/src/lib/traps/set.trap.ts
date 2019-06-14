import { Tracker } from "../tracker";
import { SetPropertyExpression } from "../expressions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";

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
        const expression = new SetPropertyExpression(property, value);

        this.tracker.add(expression);

        const accepted = this.interactionPlayer.play(expression);
        if (accepted === true || accepted === undefined) {
            this.propertiesValueStorage.set(property, value);
        }

        return accepted === undefined ? true : accepted;
    }
}
