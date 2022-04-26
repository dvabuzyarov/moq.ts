import { InjectionFactory } from "../../injector/injection-factory";
import { IMock, IPlayable } from "../../moq";
import { Presets } from "../presets";
import { Expressions } from "../../reflector/expressions";
import { CallbacksPreset } from "../presets/callbacks.preset";
import { Expression } from "../../reflector/expressions";

/**
 * @Hidden
 */
export class CallbackPresetFactory<T, TValue = any> implements InjectionFactory {
    constructor(private readonly rootMock: IMock<T>,
                private readonly presets: Presets<T>) {
        return this.factory() as any;
    }

    factory() {
        return (target: Expressions<T>, playable: IPlayable, callback: (interaction: Expression) => TValue) => {
            const preset = new CallbacksPreset(playable, target, callback);
            this.presets.add(preset);
            return this.rootMock;
        };
    }
}
