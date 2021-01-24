import { IMock, IPlayable, IPresetBuilder } from "../moq";
import { Expressions } from "../reflector/expressions";
import { MimicsPreset } from "./presets/mimics.preset";
import { ReturnsPreset } from "./presets/returns.preset";
import { ThrowsPreset } from "./presets/throws.preset";
import { CallbacksPreset } from "./presets/callbacks.preset";
import { Interaction } from "../interactions";
import { PlayTimes } from "../playables/play-times";
import { Presets } from "./presets";
import { RootProvider } from "../auto-mocks/root.provider";

/**
 * The default implementation of {@link IPresetBuilder} interface.
 * Is it not intended to be used outside of the moq library.
 *
 * @hidden
 */
export class PresetBuilder<T, TValue = any> implements IPresetBuilder<T> {

    constructor(
        private readonly rootProvider: RootProvider,
        private readonly presets: Presets<T>,
        private readonly target: Expressions<T>,
        private playable: IPlayable = PlayTimes.Always()) {

    }

    public mimics(origin: T): IMock<T> {
        const preset = new MimicsPreset(this.playable, this.target, origin);
        this.presets.add(preset);
        return this.rootProvider.get() as IMock<T>;
    }

    public returns(value: TValue): IMock<T> {
        const preset = new ReturnsPreset(this.playable, this.target, value);
        this.presets.add(preset);
        return this.rootProvider.get() as IMock<T>;
    }

    public throws<TException>(exception: TException): IMock<T> {
        const preset = new ThrowsPreset(this.playable, this.target, exception);
        this.presets.add(preset);
        return this.rootProvider.get() as IMock<T>;
    }

    public callback(callback: (interaction: Interaction) => TValue): IMock<T> {
        const preset = new CallbacksPreset(this.playable, this.target, callback);
        this.presets.add(preset);
        return this.rootProvider.get() as IMock<T>;
    }

    public play(playable: IPlayable): IPresetBuilder<T> {
        this.playable = playable;
        return this;
    }
}
