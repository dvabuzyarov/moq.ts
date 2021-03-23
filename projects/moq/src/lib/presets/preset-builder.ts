import { IMock, IPlayable, IPresetBuilder, PromisedType } from "../moq";
import { Expressions } from "../reflector/expressions";
import { Interaction } from "../interactions";
import { PlayTimes } from "../playables/play-times";
import { TypeOfInjectionFactory } from "../injector/injection-factory";
import { ReturnsPresetFactory } from "./factories/returns-preset.factory";
import { MimicsPresetFactory } from "./factories/mimics-preset.factory";
import { CallbackPresetFactory } from "./factories/callback-preset.factory";
import { ThrowsPresetFactory } from "./factories/throws-preset.factory";
import { ReturnsAsyncPresetFactory } from "./factories/returns-async-preset.factory";
import { ThrowsAsyncPresetFactory } from "./factories/throws-async-preset.factory";

/**
 * The default implementation of {@link IPresetBuilder} interface.
 * Is it not intended to be used outside of the moq library.
 *
 * @hidden
 */
export class PresetBuilder<T, TValue = any> implements IPresetBuilder<T> {

    constructor(
        private readonly returnsPresetFactory: TypeOfInjectionFactory<ReturnsPresetFactory<T, TValue>>,
        private readonly throwsPresetFactory: TypeOfInjectionFactory<ThrowsPresetFactory<T, TValue>>,
        private readonly mimicsPresetFactory: TypeOfInjectionFactory<MimicsPresetFactory<T, TValue>>,
        private readonly callbackPresetFactory: TypeOfInjectionFactory<CallbackPresetFactory<T, TValue>>,
        private readonly returnsAsyncPresetFactory: TypeOfInjectionFactory<ReturnsAsyncPresetFactory<T, TValue>>,
        private readonly throwsAsyncPresetFactory: TypeOfInjectionFactory<ThrowsAsyncPresetFactory<T, TValue>>,
        private readonly target: Expressions<T>,
        private playable: IPlayable = PlayTimes.Always()) {

    }

    public returnsAsync(value: PromisedType<TValue>): IMock<T> {
        return this.returnsAsyncPresetFactory(this.target, this.playable, value);
    }

    public throwsAsync<TException>(exception: TException): IMock<T> {
        return this.throwsAsyncPresetFactory(this.target, this.playable, exception);
    }

    public mimics(origin: T): IMock<T> {
        return this.mimicsPresetFactory(this.target, this.playable, origin);
    }

    public returns(value: TValue): IMock<T> {
        return this.returnsPresetFactory(this.target, this.playable, value);
    }

    public throws<TException>(exception: TException): IMock<T> {
        return this.throwsPresetFactory(this.target, this.playable, exception);
    }

    public callback(callback: (interaction: Interaction) => TValue): IMock<T> {
        return this.callbackPresetFactory(this.target, this.playable, callback);
    }

    public play(playable: IPlayable): IPresetBuilder<T> {
        this.playable = playable;
        return this;
    }
}
