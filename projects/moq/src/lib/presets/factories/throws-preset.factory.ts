import { InjectionFactory } from "../../injector/injection-factory";
import { IMock, IPlayable } from "../../moq";
import { Presets } from "../presets";
import { Expressions } from "../../reflector/expressions";
import { ThrowsPreset } from "../presets/throws.preset";

/**
 * @Hidden
 */
export class ThrowsPresetFactory<T, TValue = any> implements InjectionFactory {
    constructor(private readonly rootMock: IMock<T>,
                private readonly presets: Presets<T>) {
        return this.factory() as any;
    }

    factory() {
        return <TException>(target: Expressions<T>, playable: IPlayable, exception: TException) => {
            const preset = new ThrowsPreset(playable, target, exception);
            this.presets.add(preset);
            return this.rootMock;
        };
    }
}
