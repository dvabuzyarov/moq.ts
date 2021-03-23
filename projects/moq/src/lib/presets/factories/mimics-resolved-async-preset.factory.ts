import { InjectionFactory, TypeOfInjectionFactory } from "../../injector/injection-factory";
import { IMock, IPlayable, PromisedType } from "../../moq";
import { Presets } from "../presets";
import { Expressions } from "../../reflector/expressions";
import { ResolvedPromiseFactory } from "../resolved-promise.factory";
import { ReturnsPreset } from "../presets/returns.preset";
import { MimicsPreset } from "../presets/mimics.preset";

/**
 * @Hidden
 */
export class MimicsResolvedAsyncPresetFactory<T, TValue = any> implements InjectionFactory {
    constructor(private readonly rootMock: IMock<T>,
                private readonly presets: Presets<T>,
                private readonly resolvedPromise: TypeOfInjectionFactory<ResolvedPromiseFactory>) {
        return this.factory() as any;
    }

    factory() {
        return (target: Expressions<T>, playable: IPlayable, value: PromisedType<TValue>) => {
            const preset = new MimicsPreset(playable, target, this.resolvedPromise(value));
            this.presets.add(preset);
            return this.rootMock;
        };
    }
}
