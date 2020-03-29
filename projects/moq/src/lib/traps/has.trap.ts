import { Tracker } from "../tracker";
import { GetPropertyInteraction, InOperatorInteraction } from "../interactions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { SpyFunctionProvider } from "./spy-function.provider";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";

/**
 * @hidden
 */
export class HasTrap {
    constructor(
        private tracker: Tracker,
        private propertiesValueStorage: PropertiesValueStorage,
        private interactionPlayer: InteractionPlayer,
        private hasPropertyExplorer: HasPropertyExplorer,
        private hasMethodExplorer: HasMethodExplorer) {

    }

    public intercept(property: PropertyKey): any {
        const interaction = new InOperatorInteraction(property);
        this.tracker.add(interaction);

        if (this.propertiesValueStorage.has(property)) {
            return true;
        }

        if (this.hasPropertyExplorer.has(property)) {
            return this.interactionPlayer.play(interaction);
        }

        if (this.hasMethodExplorer.has(property)) {
            return true;
        }

        return this.interactionPlayer.play(interaction);
    }
}
