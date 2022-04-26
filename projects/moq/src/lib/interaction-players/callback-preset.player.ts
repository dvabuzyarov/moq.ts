import { Expression } from "../reflector/expressions";

/**
 * @hidden
 */
export class CallbackPresetPlayer {
    public play<TValue>(callback: (interaction: Expression) => TValue, interaction: Expression): any {
        return callback.apply(undefined, [interaction]);
    }
}
