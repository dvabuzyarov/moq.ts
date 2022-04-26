import { IPresetBuilder } from "../moq";
import { Expressions } from "../reflector/expressions";
import { PresetBuilderFactory } from "./preset-builder.factory";
import { TypeOfInjectionFactory } from "../injector/injection-factory";
import { AutoMockProvider } from "../auto-mocking/auto-mock.provider";
import { ComplexExpressionGuard } from "../auto-mocking/expression.guards/complex-expression.guard";

/**
 * @Hidden
 */
export class SetupFactory<T> {
    constructor(
        private readonly presetBuilderFactory: TypeOfInjectionFactory<PresetBuilderFactory<T>>,
        private readonly autoMockProvider: AutoMockProvider,
        private readonly expressionGuard: ComplexExpressionGuard) {

    }

    public create<R = unknown>([shallow, ...rest]: Expressions<T>[]): IPresetBuilder<T, R> {
        this.expressionGuard.verify([shallow, ...rest]);
        const preset = this.presetBuilderFactory(shallow);
        if (rest.length === 0) {
            return preset;
        }

        const mock = this.autoMockProvider.getOrCreate(shallow);
        preset.returns(mock.object());
        const setup = mock.resolve(SetupFactory);
        return setup.create(rest) as IPresetBuilder<T, R>;
    }
}
