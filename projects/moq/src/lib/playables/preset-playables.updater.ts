import { IPreset } from "../presets/presets/preset";
import { Interaction } from "../interactions";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";
import { Presets } from "../presets/presets";
import { PlayableUpdateReason } from "../moq";

/**
 * @hidden
 */
export class PresetPlayablesUpdater {

    constructor(
        private presets: Presets<unknown>,
        private matcher: ExpressionMatcher) {

    }

    public update(interaction: Interaction, playable: IPreset<unknown>) {
        for (const preset of this.presets.get()) {
            const {target, playable: {update}} = preset;
            if (this.matcher.matched(interaction, target)) {
                const reason = preset === playable ?
                    PlayableUpdateReason.OwnSetupWouldBePlayed :
                    PlayableUpdateReason.OtherSetupWouldBePlayed;
                update(reason);
            }
        }
    }
}
