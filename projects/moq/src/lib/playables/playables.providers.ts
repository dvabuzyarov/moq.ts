import { PresetPlayablesUpdater } from "./preset-playables.updater";
import { Presets } from "../presets/presets";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";

/**
 * @hidden
 */
export const playablesProviders = [
    {provide: PresetPlayablesUpdater, useClass: PresetPlayablesUpdater, deps: [Presets, ExpressionMatcher]}
];
