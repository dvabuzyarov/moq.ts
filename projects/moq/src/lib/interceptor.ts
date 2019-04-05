import { GetPropertyExpression, MethodExpression, NamedMethodExpression, SetPropertyExpression } from "./expressions";
import { IInterceptorCallbacksStrategy } from "./interceptor-callbacks/interceptor-callbacks";
import { IMockOptions } from "./moq";

/**
 * @hidden
 */
export class Interceptor<T> {

    private _proxy: T;
    private _prototype: any = null;
    private _values = {};
    private options: IMockOptions;

    constructor(private interceptorCallbacks: IInterceptorCallbacksStrategy,
                options: IMockOptions) {
        this.options = {...{target: () => undefined}, ...options};
        this._prototype = Object.getPrototypeOf(this.options.target);
    }

    public object(): T {
        if (this._proxy === undefined) {
            this._proxy = this.createObject();
        }

        return this._proxy;
    }

    public prototypeof(prototype?: any): any {
        if (prototype !== undefined) {
            this._prototype = prototype;
        }

        return this._prototype;
    }

    private createObject(): T {
        const options = {
            get: (target, name) => {
                const getPropertyExpression = new GetPropertyExpression(name);
                this.interceptorCallbacks.intercepted(getPropertyExpression);

                if (this.interceptorCallbacks.hasNamedMethod(name, this._prototype) === false) {

                    if (this._values.hasOwnProperty(name) === true) {
                        return this._values[name];
                    }

                    return this.interceptorCallbacks.invoke(getPropertyExpression);
                }

                return (...args) => {
                    const namedMethodExpression = new NamedMethodExpression(name, args);
                    this.interceptorCallbacks.intercepted(namedMethodExpression);
                    return this.interceptorCallbacks.invoke(namedMethodExpression);
                };
            },

            set: (target, name, value) => {
                const expression = new SetPropertyExpression(name, value);
                this.interceptorCallbacks.intercepted(expression);
                const accepted = this.interceptorCallbacks.invoke(expression);
                if (accepted === true || accepted === undefined) {
                    this._values[name] = value;
                }

                return accepted === undefined ? true : accepted;
            },

            apply: (target, thisArg, args) => {
                const expression = new MethodExpression(args);
                this.interceptorCallbacks.intercepted(expression);
                return this.interceptorCallbacks.invoke(expression);
            },

            getPrototypeOf: (target) => this._prototype,
            setPrototypeOf: (target, prototype) => {
                if (prototype !== undefined) {
                    this._prototype = prototype;
                    return true;
                }
                return false;
            }
        };

        if (this.options.name) {
            options["mockName"] = this.options.name;
        }

        return new Proxy(this.options.target, options);
    }
}
