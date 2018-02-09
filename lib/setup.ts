///<reference path="moq.d.ts"/>
import { IMock, IPlayTimesProvider, ISetup, ISetupInvoke } from "./moq";

export class Setup<T> implements ISetupInvoke<T>, IPlayTimesProvider {

    private action: Function;
    private playTimes: number;

    constructor(private mock: IMock<T>) {

    }

    public invoke<TResult>(args?: any[]): TResult {
        return this.action(args);
    }

    public returns<TValue>(value: TValue): IMock<T> {
        this.action = () => value;
        return this.mock;
    }

    public throws<TException>(exception: TException): IMock<T> {
        this.action = () => {
            throw exception;
        };
        return this.mock;
    }

    public callback<TValue>(callback: (args: any[]) => TValue): IMock<T> {
        this.action = (args?: any[]) => callback.apply(undefined, args);
        return this.mock;
    }

    public play(times: number): ISetup<T> {
        this.playTimes = times;
        return this;
    }

    public getPlayTimes(): number {
        return this.playTimes;
    }
}
