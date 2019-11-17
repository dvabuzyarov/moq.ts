import { Interactions } from "../interactions";

/**
 * @hidden
 */
export class CallbackPresetPlayer {
    public play<TValue>(callback: (interaction: Interactions) => TValue, interaction: Interactions): any {
        return callback.apply(undefined, [interaction]);
    }
}
