import { StaticProvider } from "@angular/core";
import { IInjectorConfig, IMockOptions } from "../moq";
import { trackerProviders } from "../tracker/tracker.providers";
import { reflectorProviders } from "../expected-expressions/reflector.providers";
import { presetsProviders } from "../presets/presets.providers";
import { verificationProviders } from "../verification/verification.providers";
import { interceptorsProviders } from "../interceptors/interceptors.providers";
import { playablesProviders } from "../playables/playables.providers";
import { interactionPlayersProviders } from "../interaction-players/interaction-players.providers";
import { formattersProviders } from "../formatters/formatters.providers";
import { expressionMatchersProviders } from "../expression-matchers/expression-matchers.providers";
import { typeExplorersProviders } from "../explorers/type-explorers.providers";
import { mockOptionsProviders } from "../mock-options/mock-options.providers";

/**
 * Provides the default configuration for an angular injector that would be used internally by {@link Mock} instance.
 */
export class DefaultInjectorConfig implements IInjectorConfig {
    get(options: IMockOptions<unknown>, providers: StaticProvider[]): StaticProvider[] {
        return [
            ...providers,
            ...mockOptionsProviders(options),
            ...trackerProviders,
            ...reflectorProviders,
            ...presetsProviders,
            ...verificationProviders,
            ...interceptorsProviders,
            ...playablesProviders,
            ...interactionPlayersProviders,
            ...formattersProviders,
            ...expressionMatchersProviders,
            ...typeExplorersProviders
        ];
    }
}
