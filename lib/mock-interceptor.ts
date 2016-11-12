import {MethodInfo, GetPropertyInfo, NamedMethodInfo, SetPropertyInfo} from './expression-reflector';

export class MockInterceptor<T>{

    constructor(
        private intercepted: (expression: MethodInfo | GetPropertyInfo | SetPropertyInfo)=> any,
        private interceptedNamedMethodInfo: (expression: NamedMethodInfo, getPropertyExpression: GetPropertyInfo) => any,
        private hasNamedMethod: (methodName: string)=> boolean){

    }

    public get object(): T{

        const options = {
            get: (target, name) => {
                const propertyInfo = new GetPropertyInfo(name);
                const getPropertyResult = this.intercepted(propertyInfo);

                if (this.hasNamedMethod(name) === false)
                    return getPropertyResult;

                return (...args)=> {
                    const namedMethodInfo = new NamedMethodInfo(name, args);
                    return this.interceptedNamedMethodInfo(namedMethodInfo, propertyInfo);
                }
            },

            set: (target, name, value, receiver) => {
                const info = new SetPropertyInfo(name, value);
                return this.intercepted(info);
            },

            apply: (target, thisArg, args) => {
                const info = new MethodInfo(args);
                return this.intercepted(info);
            }
        };

        return new Proxy(function () {  }, options);
    }

}