import { IPreset } from "../presets/preset";
import { Expressions } from "../expressions";
import { ExpressionMatcher } from "../expression-matchers/expression-matcher";
import { Presets } from "../preset/presets";

/**
 * @hidden
 */
export class InteractionPresetProvider {

    constructor(
        private presets: Presets<unknown>,
        private matcher = new ExpressionMatcher()) {

    }

    public get(interaction: Expressions): IPreset<unknown> | undefined {
        for (const preset of this.presets.get()) {
            if (this.matcher.matched(interaction, preset.target) && preset.invocable() === true) {
                return preset;
            }
        }
    }
}
