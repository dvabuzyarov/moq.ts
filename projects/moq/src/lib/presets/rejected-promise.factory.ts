import { InjectionFactory } from "../injector/injection-factory";

/**
 * This service is an adapter for a rejected promise.
 */
export class RejectedPromiseFactory implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return <T>(value: T) => {
            const promise = Promise.reject<T>(value);
            promise.then = promise.then.bind(promise);
            promise.catch = promise.catch.bind(promise);
            promise.finally = promise.finally.bind(promise);
            return promise;
        };
    }
}
