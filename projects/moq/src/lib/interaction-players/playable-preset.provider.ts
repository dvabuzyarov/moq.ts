import { IPreset } from "../presets/presets/preset";
import { Expression } from "../reflector/expressions";
import { Presets } from "../presets/presets";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";

/**
 * @hidden
 */
export class PlayablePresetProvider {

    constructor(
        private presets: Presets<unknown>,
        private matcher: ExpressionEqualityComparer) {

    }

    public get(interaction: Expression): IPreset<unknown> | undefined {
        for (const preset of this.presets.get()) {
            const {target, playable: {isPlayable}} = preset;
            if (this.matcher.equals(interaction, target) && isPlayable() === true) {
                return preset;
            }
        }
    }
}
