import { IMock, ISetup, ISetupInvoke } from "./moq";

export class Setup<T> implements ISetupInvoke<T> {

    private action: Function;
    private until: (...args: any[]) => boolean;

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

    public playUntil(until: (...args: any[]) => boolean): ISetup<T> {
        this.until = until;
        return this;
    }

    public playable(args?: any[]): boolean {
        if (this.until === undefined) return true;
        return this.until.apply(undefined, args);
    }
}
