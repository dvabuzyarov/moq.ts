import { InjectionFactory, TypeOfInjectionFactory } from "../../injector/injection-factory";
import { IMock, IPlayable, PromisedType } from "../../moq";
import { Presets } from "../presets";
import { Expressions } from "../../reflector/expressions";
import { MimicsPreset } from "../presets/mimics.preset";
import { RejectedPromiseFactory } from "../rejected-promise.factory";

/**
 * @Hidden
 */
export class MimicsRejectedAsyncPresetFactory<T, TValue = any> implements InjectionFactory {
    constructor(private readonly rootMock: IMock<T>,
                private readonly presets: Presets<T>,
                private readonly rejectedPromise: TypeOfInjectionFactory<RejectedPromiseFactory>) {
        return this.factory() as any;
    }

    factory() {
        return (target: Expressions<T>, playable: IPlayable, value: PromisedType<TValue>) => {
            const preset = new MimicsPreset(playable, target, this.rejectedPromise(value));
            this.presets.add(preset);
            return this.rootMock;
        };
    }
}
