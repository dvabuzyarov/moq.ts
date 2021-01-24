import { Presets } from "./presets";
import { PresetBuilderFactory } from "./preset-builder.factory";
import { SetupFactory } from "./setup.factory";
import { AutoMocks } from "../auto-mocks/auto-mocks";
import { RootProvider } from "../auto-mocks/root.provider";

/**
 * @hidden
 */
export const presetsProviders = [
    {provide: SetupFactory, useClass: SetupFactory, deps: [PresetBuilderFactory, AutoMocks]},
    {provide: Presets, useClass: Presets, deps: []},
    {provide: PresetBuilderFactory, useClass: PresetBuilderFactory, deps: [RootProvider, Presets]},
];
