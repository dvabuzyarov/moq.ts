import { Expressions } from "../reflector/expressions";
import { PresetBuilder } from "./preset-builder";
import { InjectionFactory, TypeOfInjectionFactory } from "../injector/injection-factory";
import { ReturnsPresetFactory } from "./factories/returns-preset.factory";
import { ThrowsPresetFactory } from "./factories/throws-preset.factory";
import { MimicsPresetFactory } from "./factories/mimics-preset.factory";
import { CallbackPresetFactory } from "./factories/callback-preset.factory";
import { ReturnsAsyncPresetFactory } from "./factories/returns-async-preset.factory";
import { ThrowsAsyncPresetFactory } from "./factories/throws-async-preset.factory";

/**
 * @hidden
 */
export class PresetBuilderFactory<T> implements InjectionFactory {
    constructor(private readonly returnsPresetFactory: TypeOfInjectionFactory<ReturnsPresetFactory<T>>,
                private readonly throwsPresetFactory: TypeOfInjectionFactory<ThrowsPresetFactory<T>>,
                private readonly mimicsPresetFactory: TypeOfInjectionFactory<MimicsPresetFactory<T>>,
                private readonly callbackPresetFactory: TypeOfInjectionFactory<CallbackPresetFactory<T>>,
                private readonly returnsAsyncPresetFactory: TypeOfInjectionFactory<ReturnsAsyncPresetFactory<T>>,
                private readonly throwsAsyncPresetFactory: TypeOfInjectionFactory<ThrowsAsyncPresetFactory<T>>) {
        return this.factory() as any;
    }

    public factory() {
        return (target: Expressions<T>) => new PresetBuilder<T>(
            this.returnsPresetFactory,
            this.throwsPresetFactory,
            this.mimicsPresetFactory,
            this.callbackPresetFactory,
            this.returnsAsyncPresetFactory,
            this.throwsAsyncPresetFactory,
            target);
    }
}
