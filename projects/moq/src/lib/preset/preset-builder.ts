import { IMock, IPlayable, IPresetBuilder } from "../moq";
import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { IPreset } from "../presets/preset";
import { MimicsPreset } from "../presets/mimics.preset";
import { ReturnsPreset } from "../presets/returns.preset";
import { ThrowsPreset } from "../presets/throws.preset";
import { CallbacksPreset } from "../presets/callbacks.preset";
import { Interaction } from "../interactions";
import { PlayTimes } from "../playables/play-times";

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
        private playable: IPlayable = PlayTimes.Always()) {

    }

    public mimics(origin: T): IMock<T> {
        const preset = new MimicsPreset(this.playable, this.target, origin);
        this.set(preset);
        return this.mock;
    }

    public returns<TValue>(value: TValue): IMock<T> {
        const preset = new ReturnsPreset(this.playable, this.target, value);
        this.set(preset);
        return this.mock;
    }

    public throws<TException>(exception: TException): IMock<T> {
        const preset = new ThrowsPreset(this.playable, this.target, exception);
        this.set(preset);
        return this.mock;
    }

    public callback<TValue>(callback: (interaction: Interaction) => TValue): IMock<T> {
        const preset = new CallbacksPreset(this.playable, this.target, callback);
        this.set(preset);
        return this.mock;
    }

    public play(playable: IPlayable): IPresetBuilder<T> {
        this.playable = playable;
        return this;
    }
}
