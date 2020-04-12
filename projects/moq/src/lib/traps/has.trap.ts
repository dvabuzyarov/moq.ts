import { Tracker } from "../tracker";
import { InOperatorInteraction } from "../interactions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { InOperatorInteractionExplorer } from "../explorers/in-operator-interaction.explorer/in-operator-interaction.explorer";
import { PresetPlayablesUpdater } from "../playables/preset-playables.updater";

/**
 * @hidden
 */
export class HasTrap {
    constructor(
        private tracker: Tracker,
        private propertiesValueStorage: PropertiesValueStorage,
        private interactionPlayer: InteractionPlayer,
        private inOperatorInteractionExplorer: InOperatorInteractionExplorer,
        private hasPropertyExplorer: HasPropertyExplorer,
        private hasMethodExplorer: HasMethodExplorer,
        private presetPlayablesUpdater: PresetPlayablesUpdater) {

    }

    public intercept(property: PropertyKey): any {
        const interaction = new InOperatorInteraction(property);
        this.tracker.add(interaction);

        if (this.propertiesValueStorage.has(property)) {
            return true;
        }

        if (this.inOperatorInteractionExplorer.has(property)) {
            return this.interactionPlayer.play(interaction);
        }

        this.presetPlayablesUpdater.update(interaction, undefined);

        if (this.hasPropertyExplorer.has(property)) {
            return true;
        }

        if (this.hasMethodExplorer.has(property)) {
            return true;
        }

        return false;
    }
}
