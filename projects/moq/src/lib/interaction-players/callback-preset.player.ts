import { Interaction } from "../interactions";

/**
 * @hidden
 */
export class CallbackPresetPlayer {
    public play<TValue>(callback: (interaction: Interaction) => TValue, interaction: Interaction): any {
        return callback.apply(undefined, [interaction]);
    }
}
