import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { PresetBuilder } from "./preset-builder";
import { Presets } from "./presets";
import { MOCK } from "../injector/moq.injection-token";
import { PRESET_BUILDER_FACTORY } from "./preset-builder-factory.injection-token";

/**
 * @hidden
 */
export const presetsProviders = [
    {provide: Presets, useClass: Presets, deps: []},
    {
        provide: PRESET_BUILDER_FACTORY, useFactory: (mock, presets) => <T>(target: ExpectedExpressions<T>) =>
            new PresetBuilder<T>(mock, preset => presets.add(preset), target), deps: [MOCK, Presets]
    }
];
