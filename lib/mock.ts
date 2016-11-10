import {IExpression} from './expression';

export interface ISetup<T>{
    returns<TValue>(value: TValue): IMock<T>;
    throws<TException>(exception: TException): IMock<T>;
    callback<TValue>(callback: (...args: any[])=> TValue): IMock<T>;
}

export interface ISetupInvoke<T> extends ISetup<T> {
    invoke<TResult>(args?: any[]): TResult;
}

export interface IMock<T>{
    object:T;
    setup(expression: IExpression): ISetup<T>;
}

export class Mock<T> implements IMock<T> {

    public setup(expression: IExpression): ISetup<T> {
        throw new Error('Not implemented');
    }

    public get object(): T{
        throw new Error('Not implemented');
    }
}