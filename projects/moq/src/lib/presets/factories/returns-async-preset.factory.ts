import { InjectionFactory, TypeOfInjectionFactory } from "../../injector/injection-factory";
import { IMock, IPlayable, PromisedType } from "../../moq";
import { Presets } from "../presets";
import { Expressions } from "../../reflector/expressions";
import { ResolvedPromiseFactory } from "../resolved-promise.factory";
import { ReturnsPreset } from "../presets/returns.preset";

/**
 * @Hidden
 */
export class ReturnsAsyncPresetFactory<T, TValue = any> implements InjectionFactory {
    constructor(private readonly rootMock: IMock<T>,
                private readonly presets: Presets<T>,
                private readonly resolvedPromise: TypeOfInjectionFactory<ResolvedPromiseFactory>) {
        return this.factory() as any;
    }

    factory() {
        return (target: Expressions<T>, playable: IPlayable, values: PromisedType<TValue>[]) => {
            const preset = new ReturnsPreset(playable, target, values.map(v => this.resolvedPromise(v)));
            this.presets.add(preset);
            return this.rootMock;
        };
    }
}
