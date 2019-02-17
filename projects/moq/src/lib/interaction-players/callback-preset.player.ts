import { Expressions, MethodExpression, NamedMethodExpression, SetPropertyExpression } from "../expressions";

/**
 * @hidden
 */
export class CallbackPresetPlayer {
    public play<TValue>(callback: (args: any[]) => TValue, interaction: Expressions): any {
        if (interaction instanceof SetPropertyExpression) {
            return callback.apply(undefined, [interaction.value]);
        }
        if (interaction instanceof MethodExpression) {
            return callback.apply(undefined, interaction.args);
        }
        if (interaction instanceof NamedMethodExpression) {
            return callback.apply(undefined, interaction.args);
        }
        return callback.apply(undefined, []);
    }
}
