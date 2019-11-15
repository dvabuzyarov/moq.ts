import { IPreset } from "../presets/preset";
import { Interactions } from "../interactions";
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

    public get(interaction: Interactions): IPreset<unknown> | undefined {
        for (const preset of this.presets.get()) {
            if (this.matcher.matched(interaction, preset.target) && preset.invocable() === true) {
                return preset;
            }
        }
    }
}
