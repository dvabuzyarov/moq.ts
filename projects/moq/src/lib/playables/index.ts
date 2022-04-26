import { PresetPlayablesUpdater } from "./preset-playables.updater";
import { Presets } from "../presets/presets";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";

/**
 * @hidden
 */
export default [
    {provide: PresetPlayablesUpdater, useClass: PresetPlayablesUpdater, deps: [Presets, ExpressionEqualityComparer]}
];
