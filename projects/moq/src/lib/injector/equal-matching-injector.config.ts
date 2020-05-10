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
import { equalMatchersProviders } from "../equal-matchers/equal-matchers.providers";
import { OBJECT_MATCHERS } from "../equal-matchers/object-matchers.injection-token";
import { DateMatcher } from "../equal-matchers/date.matcher";
import { MapMatcher } from "../equal-matchers/map.matcher";
import { IteratorMatcher } from "../equal-matchers/iterator.matcher";
import { POJOMatcher } from "../equal-matchers/pojo.matcher";

/**
 * Provides the configuration for an angular injector that would use equal logic for comparing values.
 * In case if there is need in a custom matcher it could be done like this:
 * ``` typescript
 *
 * ```
 */
export class EqualMatchingInjectorConfig implements IInjectorConfig {
    constructor(private matchers: StaticProvider[] = []) {
    }

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
            ...typeExplorersProviders,
            ...equalMatchersProviders,
            ...this.matchers,
            {provide: OBJECT_MATCHERS, useClass: DateMatcher, multi: true, deps: []},
            {provide: OBJECT_MATCHERS, useExisting: MapMatcher, multi: true, deps: []},
            {provide: OBJECT_MATCHERS, useExisting: IteratorMatcher, multi: true, deps: []},
            {provide: OBJECT_MATCHERS, useExisting: POJOMatcher, multi: true, deps: []},
        ];
    }
}
