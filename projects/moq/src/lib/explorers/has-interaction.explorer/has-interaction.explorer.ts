import { Presets } from "../../preset/presets";
import { ExpressionMatcher } from "../../expression-matchers/expression-matcher";
import { Expressions } from "../../expressions";

/**
 * @hidden
 */
export class HasInteractionExplorer {
    constructor(
        private presets: Presets<unknown>,
        private matcher = new ExpressionMatcher()) {

    }

    public has(interaction: Expressions): boolean {
        return this.presets
            .get()
            .find(preset => this.matcher.matched(interaction, preset.target)) !== undefined;
    }
}
