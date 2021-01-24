import { IPresetBuilder } from "../moq";
import { Expressions } from "../reflector/expressions";
import { PresetBuilderFactory } from "./preset-builder.factory";
import { TypeOfInjectionFactory } from "../injector/injection-factory";
import { AutoMocks } from "../auto-mocks/auto-mocks";

/**
 * @Hidden
 */
// todo: doc
export class SetupFactory<T> {
    constructor(
        private readonly presetBuilderFactory: TypeOfInjectionFactory<PresetBuilderFactory>,
        private readonly autoMocks: AutoMocks<T>) {

    }

    public create<R = unknown>([shallow, ...rest]: Expressions<T>[]): IPresetBuilder<T, R> {
        const preset = this.presetBuilderFactory(shallow);
        if (rest.length === 0)
            return preset;

        const mock = this.autoMocks.get(shallow);
        preset.returns(mock.object());
        const setup = mock.resolve(SetupFactory);
        return setup.create(rest) as IPresetBuilder<T, R>;
    }
}
