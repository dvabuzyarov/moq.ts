import {
    GetPropertyExpression, MethodExpression, NamedMethodExpression,
    SetPropertyExpression
} from './expressions';
import {IInterceptorCallbacksStrategy} from './interceptor-callbacks/interceptor-callbacks';

declare var Proxy: any;

export class Interceptor<T> {


    private _proxy: T;
    private _prototype: any;
    private _values = {};

    constructor(private interceptorCallbacks: IInterceptorCallbacksStrategy) {
        this._prototype = Function;
    }

    public object(): T {
        if (this._proxy === undefined) {
            this._proxy = this.createObject();
        }

        return this._proxy;
    }

    public prototypeof(prototype?: any): any {
        if (prototype !== undefined)
            this._prototype = prototype;

        return this._prototype;
    }

    private createObject(): T {
        const options = {
            get: (target, name) => {
                const getPropertyExpression = new GetPropertyExpression(name);
                const getPropertyResult = this.interceptorCallbacks.intercepted(getPropertyExpression);

                if (this._values.hasOwnProperty(name) === true)
                    return this._values[name];

                if (this.interceptorCallbacks.hasNamedMethod(name, this._prototype) === false)
                    return getPropertyResult;

                return (...args) => {
                    const namedMethodExpression = new NamedMethodExpression(name, args);
                    return this.interceptorCallbacks.intercepted(namedMethodExpression);
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
            },

            getPrototypeOf: (target) => {
                if (this._prototype === null)
                    return null;
                return this._prototype.prototype;
            },
            setPrototypeOf: (target, prototype) => {
                if (prototype !== undefined)
                    this._prototype = prototype;
                return true;
            }
        };

        return new Proxy(function () {
        }, options);
    }
}