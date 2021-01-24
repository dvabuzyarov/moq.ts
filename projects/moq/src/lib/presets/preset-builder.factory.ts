import { Expressions } from "../reflector/expressions";
import { PresetBuilder } from "./preset-builder";
import { InjectionFactory } from "../injector/injection-factory";
import { Presets } from "./presets";
import { RootProvider } from "../auto-mocks/root.provider";

/**
 * @hidden
 */
export class PresetBuilderFactory implements InjectionFactory {
    constructor(private readonly rootProvider: RootProvider,
                private readonly presets: Presets<unknown>) {
        return this.factory() as any;
    }

    public factory() {
        return <T>(target: Expressions<T>) => new PresetBuilder<T>(this.rootProvider, this.presets, target);
    }
}
