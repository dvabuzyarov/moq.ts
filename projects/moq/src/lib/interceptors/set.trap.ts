import { Tracker } from "../tracker/tracker";
import { SetPropertyExpression } from "../reflector/expressions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { MoqAPI } from "../moq";
import { PropertyIsReadOnlyTester } from "../explorers/has-property.explorer/property-is-read-only.tester";

/**
 * @hidden
 */
export class SetTrap {
    constructor(
        private tracker: Tracker,
        private propertiesValueStorage: PropertiesValueStorage,
        private interactionPlayer: InteractionPlayer,
        private propertyIsReadOnlyTester: PropertyIsReadOnlyTester) {

    }

    public intercept(target: any, property: PropertyKey, value: any): boolean {
        const expression = new SetPropertyExpression(property, value);

        this.tracker.add(expression);

        if (property === MoqAPI) {
            return false;
        }

        if (this.propertyIsReadOnlyTester.isReadOnly(property) === true) {
            return false;
        }

        const accepted = this.interactionPlayer.play(expression);
        if (accepted === true || accepted === undefined) {
            this.propertiesValueStorage.set(property, value);
        }

        return accepted === undefined ? true : accepted;
    }
}
