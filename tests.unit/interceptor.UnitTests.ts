import {
    MethodExpression, GetPropertyExpression, SetPropertyExpression,
    NamedMethodExpression
} from '../lib/expressions';
import {Interceptor} from '../lib/interceptor';
import {getName} from './getName';
import {IInterceptorCallbacksStrategy} from '../lib/interceptor-callbacks/interceptor-callbacks';

describe('Mock interceptor', () => {

    function callbacksFactory(): IInterceptorCallbacksStrategy {
        return jasmine.createSpyObj('callbacks', [
            getName<IInterceptorCallbacksStrategy>(instance => instance.intercepted),
            getName<IInterceptorCallbacksStrategy>(instance => instance.hasNamedMethod)]);
    }

    it('Returns proxy object', () => {
        const interceptor = new Interceptor(undefined);
        const actual = interceptor.object();

        expect(actual).not.toBeUndefined();
    });

    it('Returns the same proxy object', () => {
        const interceptor = new Interceptor(undefined);
        const first = interceptor.object();
        const second = interceptor.object();

        expect(first === second).toBe(true);
    });

    it('Notifies about method interception', () => {
        const arg = 'argument';
        const callbacks = callbacksFactory();
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        object(arg);

        const expected = new MethodExpression([arg]);
        expect(callbacks.intercepted).toHaveBeenCalledWith(expected);
    });

    it('Notifies about get property interception', () => {
        const name = 'some_property_name';
        const callbacks = callbacksFactory();
        (callbacks.hasNamedMethod as jasmine.Spy).and.returnValue(false);
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        object[name];

        const expected = new GetPropertyExpression(name);
        expect(callbacks.intercepted).toHaveBeenCalledWith(expected);
    });

    it('Notifies about set property interception', () => {
        const arg = 'argument';
        const name = 'some_property_name';
        const callbacks = callbacksFactory();
        (callbacks.intercepted as jasmine.Spy).and.returnValue(true);
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        object[name] = arg;

        const expected = new SetPropertyExpression(name, arg);
        expect(callbacks.intercepted).toHaveBeenCalledWith(expected);
    });

    it('Notifies about named method interception', () => {
        const arg = 'argument';
        const name = 'some_property_name';
        const callbacks = callbacksFactory();
        (callbacks.hasNamedMethod as jasmine.Spy).and.returnValue(true);

        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        object[name](arg);

        const expectedGetPropertyExpression = new GetPropertyExpression(name);
        const expectedNamedMethodExpression = new NamedMethodExpression(name, [arg]);
        expect(callbacks.intercepted).toHaveBeenCalledWith(expectedGetPropertyExpression);
        expect(callbacks.intercepted).toHaveBeenCalledWith(expectedNamedMethodExpression);
    });

    it('Returns value from method interception', () => {
        const expected = 'returned value';
        const callbacks = callbacksFactory();
        (callbacks.intercepted as jasmine.Spy).and.returnValue(expected);
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        const actual = object();

        expect(actual).toBe(expected);
    });

    it('Accepts set property interception', () => {
        const arg = 'argument';
        const name = 'some_property_name';
        const callbacks = callbacksFactory();
        (callbacks.intercepted as jasmine.Spy).and.returnValue(true);
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        object[name] = arg;
    });

    it('Accepts set property interception by default', () => {
        const arg = 'argument';
        const name = 'some_property_name';
        const callbacks = callbacksFactory();
        (callbacks.intercepted as jasmine.Spy).and.returnValue(undefined);
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        object[name] = arg;
    });

    it('Returns the last set value on a property', () => {
        const arg = 'argument';
        const name = 'some_property_name';
        const callbacks = callbacksFactory();
        (callbacks.intercepted as jasmine.Spy).and.returnValue(true);
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        object[name] = arg;

        expect(object[name]).toBe(arg);
    });

    it('Returns the previous set value on a property if set operation is not allowed', () => {
        const arg1 = 'argument 1';
        const arg2 = 'argument 2';
        const name = 'some_property_name';
        const callbacks = callbacksFactory();
        (callbacks.intercepted as jasmine.Spy).and.returnValues(true, false);
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        object[name] = arg1;
        try {
            object[name] = arg2;
        } catch (e) {
        }

        expect(object[name]).toBe(arg1);
    });

    it('Throws TypeError from set property interception', () => {
        const arg = 'argument';
        const name = 'some_property_name';
        const callbacks = callbacksFactory();
        (callbacks.intercepted as jasmine.Spy).and.returnValue(false);
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        expect(() => {
            object[name] = arg
        }).toThrow(jasmine.any(TypeError));
    });

    it('Returns value from get property interception', () => {
        const expected = 'returned value';
        const name = 'some_property_name';
        const callbacks = callbacksFactory();
        (callbacks.intercepted as jasmine.Spy).and.returnValue(expected);
        (callbacks.hasNamedMethod as jasmine.Spy).and.returnValue(false);
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        const actual = object[name];

        expect(actual).toBe(expected);
    });

    it('Returns value from named method interception', () => {
        const expected = 'returned value';
        const name = 'some_property_name';
        const callbacks = callbacksFactory();
        (callbacks.hasNamedMethod as jasmine.Spy).and.returnValue(true);
        (callbacks.intercepted as jasmine.Spy).and.returnValue(expected);

        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        const actual = object[name]();

        expect(actual).toBe(expected);
    });

    it('Returns object that instanceof is a function by default', ()=>{
        const callbacks = callbacksFactory();
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        expect(object instanceof Function).toBe(true);
    });

    it('Returns object that instanceof is of provided type', ()=>{
        class PrototypeClass {}

        const callbacks = callbacksFactory();
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();
        const actual = interceptor.prototypeof(PrototypeClass);

        expect(object instanceof PrototypeClass).toBe(true);
        expect(object instanceof Function).toBe(false);
        expect(object instanceof Array).toBe(false);

        expect(actual).toBe(PrototypeClass);
    });


    it('Returns the current prototype', ()=>{
        class PrototypeClass {}

        const callbacks = callbacksFactory();
        const interceptor = new Interceptor<Function>(callbacks);
        interceptor.prototypeof(PrototypeClass);

        const actual = interceptor.prototypeof();

        expect(actual).toEqual(PrototypeClass);
    });

    it('Sets null as instanceof value', ()=>{
        const callbacks = callbacksFactory();
        const interceptor = new Interceptor<Function>(callbacks);
        interceptor.prototypeof(null);
        const object = interceptor.object();

        const actual = interceptor.prototypeof();

        expect(actual).toBeNull();
        expect(Object.getPrototypeOf(object)).toBeNull();
    });

    it('Returns prototype of object set through setPrototypeOf', ()=>{
        class PrototypeClass {}

        const callbacks = callbacksFactory();
        const interceptor = new Interceptor<Function>(callbacks);
        const object = interceptor.object();

        Object.setPrototypeOf(object, PrototypeClass);
        const actual = interceptor.prototypeof();

        expect(object instanceof PrototypeClass).toBe(true);
        expect(object instanceof Function).toBe(false);
        expect(object instanceof Array).toBe(false);

        expect(actual).toBe(PrototypeClass);
    });
});