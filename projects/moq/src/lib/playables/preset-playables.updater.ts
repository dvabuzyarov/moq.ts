import { IPreset } from "../presets/presets/preset";
import { Expression } from "../reflector/expressions";
import { Presets } from "../presets/presets";
import { PlayableUpdateReason } from "../moq";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";

/**
 * @hidden
 */
export class PresetPlayablesUpdater {

    constructor(
        private presets: Presets<unknown>,
        private matcher: ExpressionEqualityComparer) {

    }

    public update(interaction: Expression, playable: IPreset<unknown>) {
        for (const preset of this.presets.get()) {
            const {target, playable: {update}} = preset;
            if (this.matcher.equals(interaction, target)) {
                const reason = preset === playable ?
                    PlayableUpdateReason.OwnSetupWouldBePlayed :
                    PlayableUpdateReason.OtherSetupWouldBePlayed;
                update(reason);
            }
        }
    }
}
