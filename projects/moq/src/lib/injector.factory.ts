import { Injector, StaticProvider } from "@angular/core";
import { Mock } from "./mock";
import { presetsProviders } from "./presets/presets.providers";
import { reflectorProviders } from "./expected-expressions/reflector.providers";
import { trackerProviders } from "./tracker/tracker.providers";
import { mockOptionsProviders } from "./mock-options/mock-options.providers";
import { verificationProviders } from "./verification/verification.providers";
import { interceptorsProviders } from "./interceptors/interceptors.providers";
import { playablesProviders } from "./playables/playables.providers";
import { interactionPlayersProviders } from "./interaction-players/interaction-players.providers";
import { formattersProviders } from "./formatters/formatters.providers";
import { expressionMatchersProviders } from "./expression-matchers/expression-matchers.providers";
import { typeExplorersProviders } from "./explorers/type-explorers.providers";
import { IMockOptions } from "./moq";

export function injectorFactory<T>(mockProvider: StaticProvider, options: IMockOptions<T>) {
    return Injector.create({
        providers: [
            mockProvider,
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
        ]
    });
}
