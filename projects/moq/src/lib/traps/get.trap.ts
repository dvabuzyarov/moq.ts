import { Tracker } from "../tracker";
import { GetPropertyExpression } from "../expressions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { SpyFunctionProvider } from "./spy-function.provider";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";

/**
 * @hidden
 */
export class GetTrap {
    private _prototype: any;

    constructor(
        private tracker: Tracker,
        private propertiesValueStorage: PropertiesValueStorage,
        private interactionPlayer: InteractionPlayer,
        private hasPropertyExplorer: HasPropertyExplorer,
        private hasMethodExplorer: HasMethodExplorer,
        private spyFunctionProvider: SpyFunctionProvider) {

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

        if (this._prototype && this._prototype[property] instanceof Function) {
            return this.spyFunctionProvider.get(property);
        }

        return undefined;
    }

    public prototypeof(prototype: any): void {
        this._prototype = prototype;
    }
}
