import { Presets } from "../../preset/presets";
import { ExpressionMatcher } from "../../expression-matchers/expression-matcher";
import { Interactions } from "../../interactions";

/**
 * @hidden
 */
export class HasInteractionExplorer {
    constructor(
        private presets: Presets<unknown>,
        private matcher = new ExpressionMatcher()) {

    }
// todo: inconsistency with invocable behaviour, it should not change the internal state
    public has(interaction: Interactions): boolean {
        return this.presets
            .get()
            .find(preset => this.matcher.matched(interaction, preset.target)
                && preset.invocable() === true) !== undefined;
    }
}
