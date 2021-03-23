import { InjectionFactory } from "../../injector/injection-factory";
import { IMock, IPlayable } from "../../moq";
import { Presets } from "../presets";
import { ReturnsPreset } from "../presets/returns.preset";
import { Expressions } from "../../reflector/expressions";

/**
 * @Hidden
 */
export class ReturnsPresetFactory<T, TValue = any> implements InjectionFactory {
    constructor(private readonly rootMock: IMock<T>,
                private readonly presets: Presets<T>) {
        return this.factory() as any;
    }

    factory() {
        return (target: Expressions<T>, playable: IPlayable, value: TValue) => {
            const preset = new ReturnsPreset(playable, target, value);
            this.presets.add(preset);
            return this.rootMock;
        };
    }
}
