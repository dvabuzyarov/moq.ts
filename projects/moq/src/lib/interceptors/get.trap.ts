import { GetPropertyExpression } from "../reflector/expressions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { SpyFunctionProvider } from "./spy-function.provider";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { MoqAPI } from "../moq";
import { Tracker } from "../tracker/tracker";
import { TypeofInjectionToken } from "../injector/typeof-injection-token";
import { MOCK } from "../injector/mock.injection-token";

/**
 * @hidden
 */
export class GetTrap {
    constructor(
        private mock: TypeofInjectionToken<typeof MOCK>,
        private tracker: Tracker,
        private propertiesValueStorage: PropertiesValueStorage,
        private interactionPlayer: InteractionPlayer,
        private hasPropertyExplorer: HasPropertyExplorer,
        private hasMethodExplorer: HasMethodExplorer,
        private spyFunctionProvider: SpyFunctionProvider) {

    }

    public intercept(property: PropertyKey): any {
        const interaction = new GetPropertyExpression(property);

        this.tracker.add(interaction);

        if (property === MoqAPI) {
            return this.mock;
        }

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
