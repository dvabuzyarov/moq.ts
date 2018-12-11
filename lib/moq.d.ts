import {IExpectedExpression} from './expected-expressions/expected-expression-reflector';
import {Tracker} from './tracker';
import {Times} from './times';
import {MockBehavior} from './interceptor-callbacks/interceptor-callbacks';

export interface ISetup<T> {
    returns<TValue>(value: TValue): IMock<T>;
    throws<TException>(exception: TException): IMock<T>;

    /**
     * @param callback A callback function that will intercept the invoked setup.
     * @returns The call back function may returns a value that will be provided as result.
     * @example
     * ```typescript
     *     const ipcRendererMock = new StrictMock<typeof ipcRenderer>()
     *     .setup(instance => instance.on(ipcRendererChannelName, It.IsAny()))
     *     .callback((channel, listener) => listener(undefined, response));
     * ```
     */
    callback<TValue>(callback: (...args: any[])=> TValue): IMock<T>;

    /**
     * Plays the setup when predicate returns true otherwise the setup will be ignored.
     * As predicate {@link PlayTimes} could be used.
     * @param {() => boolean} predicate
     * @returns {ISetup<T>}
     */
    play(predicate:()=> boolean): ISetup<T>;
}

/**
 * @internal
 */
/** @internal */
export interface ISetupInvoke<T> extends ISetup<T> {
    playable(): boolean;
    invoke<TResult>(args?: any[]): TResult;
}

export interface IMock<T> {
    name?:string;
    object(): T;
    setup(expression: IExpectedExpression<T>): ISetup<T>;
    tracker: Tracker;
    verify(expression: IExpectedExpression<T>, times?: Times): IMock<T>;
    prototypeof(prototype?:any): IMock<T>;

    /**
     * @deprecated use custom setup as described ["How to throw an exception on missed setup?"](https://github.com/dvabuzyarov/moq.ts/wiki/How-to-throw-an-exception-on-missed-setup%3F).
     * @obsolete
     * @param behaviorStrategy
     */
    setBehaviorStrategy(behaviorStrategy: MockBehavior): IMock<T>;

    /**
     * @experimental
     * @param sequence
     * @param expression
     */
    insequence(sequence: ISequenceVerifier, expression: IExpectedExpression<T>): IMock<T>;
}

export interface ISequenceVerifier {
    add<T>(mock: IMock<T>, expression: IExpectedExpression<T>): ISequenceVerifier;
    verify(times?: Times): void;
}
