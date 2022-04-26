import { IInjectorConfig, IMockOptions } from "../moq";
import { trackerProviders } from "../tracker/tracker.providers";
import reflectorProviders from "../reflector";
import { presetsProviders } from "../presets/presets.providers";
import { verificationProviders } from "../verification/verification.providers";
import interceptorsProviders from "../interceptors";
import { playablesProviders } from "../playables/playables.providers";
import { interactionPlayersProviders } from "../interaction-players/interaction-players.providers";
import { formattersProviders } from "../formatters/formatters.providers";
import { typeExplorersProviders } from "../explorers/type-explorers.providers";
import { mockOptionsProviders } from "../mock-options/mock-options.providers";
import { StaticProvider } from "../static.injector/interface/provider";
import { mockCoreProviders } from "../core/mock-core.providers";
import autoMockingProviders from "../auto-mocking";
import expressionEqualityComparersProviders from "../expression.equality-comparers";

/**
 * Provides the default configuration for an angular based injector that would be used internally by {@link Mock} instance.
 */
export class DefaultInjectorConfig implements IInjectorConfig {
    constructor(private readonly providers: StaticProvider[] = []) {
    }

    get(options: IMockOptions<unknown>, providers: StaticProvider[]): StaticProvider[] {
        return [
            ...providers,
            ...mockOptionsProviders(options),
            ...trackerProviders,
            ...reflectorProviders,
            ...presetsProviders,
            ...autoMockingProviders,
            ...verificationProviders,
            ...interceptorsProviders,
            ...playablesProviders,
            ...interactionPlayersProviders,
            ...formattersProviders,
            ...expressionEqualityComparersProviders,
            ...typeExplorersProviders,
            ...mockCoreProviders,
            ...this.providers,
        ];
    }
}
