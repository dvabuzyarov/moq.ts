import { IMock, IPresetBuilder } from "../moq";
import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { InvocableFactory } from "./invocable.factory";
import { IPreset } from "../presets/preset";
import { MimicsPreset } from "../presets/mimics.preset";
import { ReturnsPreset } from "../presets/returns.preset";
import { ThrowsPreset } from "../presets/throws.preset";
import { CallbacksPreset } from "../presets/callbacks.preset";

/**
 * The default implementation of {@link IPresetBuilder} interface.
 * Is it not intended to be used outside of the moq library.
 * @hidden
 */
export class PresetBuilder<T> implements IPresetBuilder<T> {

    constructor(
        private mock: IMock<T>,
        private set: (preset: IPreset<T>) => void,
        private target: ExpectedExpressions<T>,
        private invocableFactory: InvocableFactory = new InvocableFactory()) {

    }

    public mimics(origin: T): IMock<T> {
        const invocable = this.invocableFactory.get();
        const preset = new MimicsPreset(invocable, this.target, origin);
        this.set(preset);
        return this.mock;
    }

    public returns<TValue>(value: TValue): IMock<T> {
        const invocable = this.invocableFactory.get();
        const preset = new ReturnsPreset(invocable, this.target, value);
        this.set(preset);
        return this.mock;
    }

    public throws<TException>(exception: TException): IMock<T> {
        const invocable = this.invocableFactory.get();
        const preset = new ThrowsPreset(invocable, this.target, exception);
        this.set(preset);
        return this.mock;
    }

    public callback<TValue>(callback: (args: any[]) => TValue): IMock<T> {
        const invocable = this.invocableFactory.get();
        const preset = new CallbacksPreset(invocable, this.target, callback);
        this.set(preset);
        return this.mock;
    }

    public play(predicate: () => boolean): IPresetBuilder<T> {
        this.invocableFactory.set(predicate);
        return this;
    }
}
