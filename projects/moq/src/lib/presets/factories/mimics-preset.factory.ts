import { InjectionFactory } from "../../injector/injection-factory";
import { IMock, IPlayable } from "../../moq";
import { Presets } from "../presets";
import { Expressions } from "../../reflector/expressions";
import { MimicsPreset } from "../presets/mimics.preset";

/**
 * @Hidden
 */
export class MimicsPresetFactory<T, TValue = any> implements InjectionFactory {
    constructor(private readonly rootMock: IMock<T>,
                private readonly presets: Presets<T>) {
        return this.factory() as any;
    }

    factory() {
        return (target: Expressions<T>, playable: IPlayable, origin: T) => {
            const preset = new MimicsPreset(playable, target, origin);
            this.presets.add(preset);
            return this.rootMock;
        };
    }
}
