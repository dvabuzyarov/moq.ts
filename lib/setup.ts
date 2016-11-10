import {IMock, ISetupInvoke} from './mock';

export class Setup<T> implements ISetupInvoke<T> {
    private action: Function;

    constructor(private mock: IMock<T>) {

    }

    public invoke<TResult>(args?: any[]): TResult {
        return this.action(args);
    }

    public returns<TValue>(value: TValue): IMock<T> {
        this.action = ()=> value;
        return this.mock;
    }

    public throws<TException>(exception: TException): IMock<T> {
        this.action = ()=> { throw exception; };
        return this.mock;
    }

    public callback<TValue>(callback: (...args: any[])=> TValue): IMock<T> {
        this.action = (args?: any[])=> callback(args);
        return this.mock;
    }
}