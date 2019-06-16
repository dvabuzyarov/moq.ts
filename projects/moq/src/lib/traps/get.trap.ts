import { Tracker } from "../tracker";
import { GetPropertyExpression } from "../expressions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { SpyFunctionProvider } from "./spy-function.provider";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { PrototypeStorage } from "./prototype.storage";

/**
 * @hidden
 */
export class GetTrap {
    constructor(
        private tracker: Tracker,
        private propertiesValueStorage: PropertiesValueStorage,
        private interactionPlayer: InteractionPlayer,
        private hasPropertyExplorer: HasPropertyExplorer,
        private hasMethodExplorer: HasMethodExplorer,
        private spyFunctionProvider: SpyFunctionProvider,
        private prototypeStorage: PrototypeStorage) {

    }

    public intercept(property: PropertyKey): any {
        const expression = new GetPropertyExpression(property);

        this.tracker.add(expression);

        if (this.propertiesValueStorage.has(property)) {
            return this.propertiesValueStorage.get(property);
        }

        if (this.hasPropertyExplorer.has(property)) {
            return this.interactionPlayer.play(expression);
        }

        if (this.hasMethodExplorer.has(property)) {
            return this.spyFunctionProvider.get(property);
        }

        if (this.prototypeStorage.prototype && this.prototypeStorage.prototype[property] instanceof Function) {
            return this.spyFunctionProvider.get(property);
        }

        return undefined;
    }
}
