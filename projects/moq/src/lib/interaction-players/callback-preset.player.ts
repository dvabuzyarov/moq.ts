import { Interactions, MethodInteraction, NamedMethodInteraction, SetPropertyInteraction } from "../interactions";

/**
 * @hidden
 */
export class CallbackPresetPlayer {
    public play<TValue>(callback: (args: any[]) => TValue, interaction: Interactions): any {
        if (interaction instanceof SetPropertyInteraction) {
            return callback.apply(undefined, [interaction.value]);
        }
        if (interaction instanceof MethodInteraction) {
            return callback.apply(undefined, interaction.args);
        }
        if (interaction instanceof NamedMethodInteraction) {
            return callback.apply(undefined, interaction.args);
        }
        return callback.apply(undefined, []);
    }
}
