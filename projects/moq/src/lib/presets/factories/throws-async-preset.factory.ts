import { InjectionFactory, TypeOfInjectionFactory } from "../../injector/injection-factory";
import { IMock, IPlayable } from "../../moq";
import { Presets } from "../presets";
import { Expressions } from "../../reflector/expressions";
import { RejectedPromiseFactory } from "../rejected-promise.factory";
import { ReturnsPreset } from "../presets/returns.preset";

/**
 * @Hidden
 */
export class ThrowsAsyncPresetFactory<T, TValue = any> implements InjectionFactory {
    constructor(private readonly rootMock: IMock<T>,
                private readonly presets: Presets<T>,
                private readonly rejectedPromise: TypeOfInjectionFactory<RejectedPromiseFactory>) {
        return this.factory() as any;
    }

    factory() {
        return <TException>(target: Expressions<T>, playable: IPlayable, exception: TException) => {
            const preset = new ReturnsPreset(playable, target, this.rejectedPromise(exception));
            this.presets.add(preset);
            return this.rootMock;
        };
    }
}
