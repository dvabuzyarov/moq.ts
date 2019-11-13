import { Tracker } from "../tracker";
import { GetPropertyInteraction } from "../interactions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { SpyFunctionProvider } from "./spy-function.provider";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { PrototypeStorage } from "./prototype.storage";
import { HasInteractionExplorer } from "../explorers/has-interaction.explorer/has-interaction.explorer";

/**
 * @hidden
 */
export class GetTrap {
    constructor(
        private tracker: Tracker,
        private propertiesValueStorage: PropertiesValueStorage,
        private interactionPlayer: InteractionPlayer,
        private hasPropertyExplorer: HasPropertyExplorer,
        private hasInteractionExplorer: HasInteractionExplorer,
        private hasMethodExplorer: HasMethodExplorer,
        private spyFunctionProvider: SpyFunctionProvider,
        private prototypeStorage: PrototypeStorage) {

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

        const prototype = this.prototypeStorage.get();
        if (prototype && prototype[property] instanceof Function) {
            return this.spyFunctionProvider.get(property);
        }

        if (this.hasInteractionExplorer.has(interaction)) {
            return this.interactionPlayer.play(interaction);
        }

        return undefined;
    }
}
