import {MethodExpression, GetPropertyExpression, SetPropertyExpression, NamedMethodExpression} from './expressions';

export interface IInterceptorCallbacks {
    intercepted(expression: MethodExpression | GetPropertyExpression | SetPropertyExpression): any;
    interceptedNamedMethod (expression: NamedMethodExpression, getPropertyExpression: GetPropertyExpression): any;
    hasNamedMethod(methodName: string): boolean;
}

export class Interceptor<T> {

    private _object: T;
    private _values = {};

    constructor(private interceptorCallbacks: IInterceptorCallbacks) {

    }

    public get object(): T {
        if (this._object === undefined) {
            this._object = this.createObject();
        }

        return this._object;
    }

    private createObject(): T {
        const options = {
            get: (target, name) => {
                const getPropertyExpression = new GetPropertyExpression(name);
                const getPropertyResult = this.interceptorCallbacks.intercepted(getPropertyExpression);

                if (this._values.hasOwnProperty(name) === true)
                    return this._values[name];

                if (this.interceptorCallbacks.hasNamedMethod(name) === false)
                    return getPropertyResult;

                return (...args) => {
                    const namedMethodExpression = new NamedMethodExpression(name, args);
                    return this.interceptorCallbacks.interceptedNamedMethod(namedMethodExpression, getPropertyExpression);
                }
            },

            set: (target, name, value) => {
                const expression = new SetPropertyExpression(name, value);
                const accepted = this.interceptorCallbacks.intercepted(expression);
                if (accepted === true || accepted === undefined) {
                    this._values[name] = value;
                }

                return accepted === undefined ? true : accepted;
            },

            apply: (target, thisArg, args) => {
                const expression = new MethodExpression(args);
                return this.interceptorCallbacks.intercepted(expression);
            }
        };

        return new Proxy(function () {
        }, options);
    }
}