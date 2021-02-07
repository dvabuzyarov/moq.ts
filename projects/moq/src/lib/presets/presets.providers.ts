import { Presets } from "./presets";
import { PresetBuilderFactory } from "./preset-builder.factory";
import { SetupFactory } from "./setup.factory";
import { RootMockProvider } from "../auto-mocking/root-mock.provider";
import { AutoMockProvider } from "../auto-mocking/auto-mock.provider";

/**
 * @hidden
 */
export const presetsProviders = [
    {provide: SetupFactory, useClass: SetupFactory, deps: [PresetBuilderFactory, AutoMockProvider]},
    {provide: Presets, useClass: Presets, deps: []},
    {provide: PresetBuilderFactory, useClass: PresetBuilderFactory, deps: [RootMockProvider, Presets]},
];
