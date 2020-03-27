import { Tracker } from "../tracker";
import { GetPropertyInteraction } from "../interactions";
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
        private hasMethodExplorer: HasMethodExplorer,
        private spyFunctionProvider: SpyFunctionProvider) {

    }

    public intercept(property: PropertyKey): any {
        const interaction = new GetPropertyInteraction(property);

        this.tracker.add(interaction);

        if (this.propertiesValueStorage.has(property)) {
            return this.propertiesValueStorage.get(property);
        }

        if (this.hasPropertyExplorer.has(property)) {
            return this.interactionPlayer.play(interaction);
        }

        if (this.hasMethodExplorer.has(property)) {
            return this.spyFunctionProvider.get(property);
        }

        return this.interactionPlayer.play(interaction);
    }
}
