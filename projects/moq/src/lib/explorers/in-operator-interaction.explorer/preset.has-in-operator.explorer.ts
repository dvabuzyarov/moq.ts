import { IPreset } from "../../presets/preset";
import { InOperatorInteraction } from "../../interactions";
import { ExpectedInOperatorExpression } from "../../expected-expressions/expected-expressions";
import { It } from "../../expected-expressions/expression-predicates";

/**
 * @hidden
 */
export class PresetHasInOperatorExplorer {
    public has(name: PropertyKey, preset: IPreset<unknown>): boolean {
        if (preset.invocable() === false) {
            return false;
        }

        if (preset.target instanceof ExpectedInOperatorExpression) {
            return preset.target.name === name;
        }
        if (preset.target instanceof It) {
            return preset.target.test(new InOperatorInteraction(name));
        }

        return false;
    }
}
