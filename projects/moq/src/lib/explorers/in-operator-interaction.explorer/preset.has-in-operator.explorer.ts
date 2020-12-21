import { IPreset } from "../../presets/presets/preset";
import { InOperatorInteraction } from "../../interactions";
import { InOperatorExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";

/**
 * @hidden
 */
export class PresetHasInOperatorExplorer {
    public has(name: PropertyKey, preset: IPreset<unknown>): boolean {
        const {playable: {isPlayable}} = preset;

        if (isPlayable() === false) {
            return false;
        }

        if (preset.target instanceof InOperatorExpression) {
            return preset.target.name === name;
        }

        if (preset.target instanceof It) {
            return preset.target.test(new InOperatorInteraction(name));
        }

        return false;
    }
}
