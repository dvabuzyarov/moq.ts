import { Presets } from "./presets";
import { PresetBuilderFactory } from "./preset-builder.factory";
import { SetupFactory } from "./setup.factory";
import { RootMockProvider } from "../auto-mocking/root-mock.provider";
import { AutoMockProvider } from "../auto-mocking/auto-mock.provider";
import { CallbackPresetFactory } from "./factories/callback-preset.factory";
import { MimicsPresetFactory } from "./factories/mimics-preset.factory";
import { ReturnsAsyncPresetFactory } from "./factories/returns-async-preset.factory";
import { ReturnsPresetFactory } from "./factories/returns-preset.factory";
import { ThrowsAsyncPresetFactory } from "./factories/throws-async-preset.factory";
import { ThrowsPresetFactory } from "./factories/throws-preset.factory";
import { ResolvedPromiseFactory } from "./resolved-promise.factory";
import { RejectedPromiseFactory } from "./rejected-promise.factory";

/**
 * @hidden
 */
export const presetsProviders = [
    {provide: SetupFactory, useClass: SetupFactory, deps: [PresetBuilderFactory, AutoMockProvider]},
    {provide: Presets, useClass: Presets, deps: []},
    {provide: ResolvedPromiseFactory, useClass: ResolvedPromiseFactory, deps: []},
    {provide: RejectedPromiseFactory, useClass: RejectedPromiseFactory, deps: []},
    {provide: ReturnsPresetFactory, useClass: ReturnsPresetFactory, deps: [RootMockProvider, Presets]},
    {provide: ThrowsPresetFactory, useClass: ThrowsPresetFactory, deps: [RootMockProvider, Presets]},
    {provide: CallbackPresetFactory, useClass: CallbackPresetFactory, deps: [RootMockProvider, Presets]},
    {provide: MimicsPresetFactory, useClass: MimicsPresetFactory, deps: [RootMockProvider, Presets]},
    {
        provide: ReturnsAsyncPresetFactory,
        useClass: ReturnsAsyncPresetFactory,
        deps: [RootMockProvider, Presets, ResolvedPromiseFactory]
    },
    {
        provide: ThrowsAsyncPresetFactory,
        useClass: ThrowsAsyncPresetFactory,
        deps: [RootMockProvider, Presets, RejectedPromiseFactory]
    },
    {
        provide: PresetBuilderFactory, useClass: PresetBuilderFactory, deps: [
            ReturnsPresetFactory,
            ThrowsPresetFactory,
            MimicsPresetFactory,
            CallbackPresetFactory,
            ReturnsAsyncPresetFactory,
            ThrowsAsyncPresetFactory
        ]
    },
];
