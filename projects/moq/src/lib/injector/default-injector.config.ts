import { IInjectorConfig, IMockOptions } from "../moq";
import trackerProviders from "../tracker/index";
import reflectorProviders from "../reflector/index";
import presetsProviders from "../presets/index";
import verificationProviders from "../verification/index";
import interceptorsProviders from "../interceptors/index";
import playablesProviders from "../playables/index";
import interactionPlayersProviders from "../interaction-players/index";
import formattersProviders from "../formatters/index";
import typeExplorersProviders from "../explorers/index";
import { mockOptionsProviders } from "../mock-options/mock-options.providers";
import { StaticProvider } from "../static.injector/interface/provider";
import mockCoreProviders from "../core/index";
import autoMockingProviders from "../auto-mocking/index";
import expressionEqualityComparersProviders from "../expression.equality-comparers/index";

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
