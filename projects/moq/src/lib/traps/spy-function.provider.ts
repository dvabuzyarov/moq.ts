import { Tracker } from "../tracker";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { NamedMethodInteraction } from "../interactions";

/**
 * @hidden
 */
export class SpyFunctionProvider {
    private map = {};

    constructor(
        private tracker: Tracker,
        private interactionPlayer: InteractionPlayer) {

    }

    public get(property: PropertyKey): (...args) => any {
        if (Reflect.has(this.map, property) === false) {
            this.map[property] = (...args): any => {
                const interaction = new NamedMethodInteraction(property, args);
                this.tracker.add(interaction);
                return this.interactionPlayer.play(interaction);
            };
        }
        return this.map[property];
    }
}
