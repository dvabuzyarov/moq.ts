import { Expressions } from "../reflector/expressions";
import { PresetBuilder } from "./preset-builder";
import { InjectionFactory, TypeOfInjectionFactory } from "../injector/injection-factory";
import { Presets } from "./presets";
import { RootMockProvider } from "../auto-mocking/root-mock.provider";
import { IMock } from "../moq";

/**
 * @hidden
 */
export class PresetBuilderFactory implements InjectionFactory {
    constructor(private readonly rootMock: TypeOfInjectionFactory<RootMockProvider>,
                private readonly presets: Presets<unknown>) {
        return this.factory() as any;
    }

    public factory() {
        return <T>(target: Expressions<T>) => new PresetBuilder<T>(this.rootMock as IMock<T>, this.presets, target);
    }
}
