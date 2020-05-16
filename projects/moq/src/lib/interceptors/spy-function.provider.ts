import { Tracker } from "../tracker/tracker";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { NamedMethodInteraction } from "../interactions";

/**
 * @hidden
 */
export class SpyFunctionProvider {
    private map = new Map<PropertyKey, (...args) => any>();

    constructor(
        private tracker: Tracker,
        private interactionPlayer: InteractionPlayer) {

    }

    public get(property: PropertyKey): (...args) => any {
        if (this.map.has(property) === false) {
            this.map.set(property, (...args): any => {
                const interaction = new NamedMethodInteraction(property, args);
                this.tracker.add(interaction);
                return this.interactionPlayer.play(interaction);
            });
        }
        return this.map.get(property);
    }
}
