import {IExpectedExpression} from './expected-expressions/expected-expression-reflector';
import {Tracker} from './tracker';
import {Times} from './times';

export interface ISetup<T> {
    returns<TValue>(value: TValue): IMock<T>;
    throws<TException>(exception: TException): IMock<T>;
    callback<TValue>(callback: (...args: any[])=> TValue): IMock<T>;
}

export interface ISetupInvoke<T> extends ISetup<T> {
    invoke<TResult>(args?: any[]): TResult;
}

export interface IMock<T> {
    name?:string;
    object: T;
    setup(expression: IExpectedExpression<T>): ISetup<T>;
    tracker: Tracker;
    verify(expression: IExpectedExpression<T>, times?: Times): void;
}