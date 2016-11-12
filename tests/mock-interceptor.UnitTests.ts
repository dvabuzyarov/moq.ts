import {MockInterceptor} from '../lib/mock-interceptor';
import {MethodInfo, GetPropertyInfo, NamedMethodInfo, SetPropertyInfo} from '../lib/expression-reflector';
import lastOrUndefined = ts.lastOrUndefined;

describe('Mock interceptor', () => {

    it('Returns proxy object', ()=> {
        const interceptor = new MockInterceptor(undefined, undefined, undefined);
        const actual = interceptor.object;

        expect(actual).not.toBeUndefined();
    });

    it('Notifies about method interception', ()=> {
        const arg = 'argument';
        const intercepted = jasmine.createSpy('intercepted');
        const interceptor = new MockInterceptor<Function>(intercepted, undefined, undefined);
        const object = interceptor.object;

        object(arg);

        const expected = new MethodInfo([arg]);
        expect(intercepted).toHaveBeenCalledWith(expected);
    });

    it('Notifies about get property interception', ()=> {
        const name = 'some_property_name';
        const intercepted = jasmine.createSpy('intercepted');
        const hasNamedMethod = jasmine.createSpy('has named method').and.returnValue(false);
        const interceptor = new MockInterceptor<Function>(intercepted, undefined, hasNamedMethod);
        const object = interceptor.object;

        object[name];

        const expected = new GetPropertyInfo(name);
        expect(intercepted).toHaveBeenCalledWith(expected);
    });

    it('Notifies about set property interception', ()=> {
        const arg = 'argument';
        const name = 'some_property_name';
        const intercepted = jasmine.createSpy('intercepted callback').and.returnValue(true);
        const interceptor = new MockInterceptor<Function>(intercepted, undefined, undefined);
        const object = interceptor.object;

        object[name] = arg;

        const expected = new SetPropertyInfo(name, arg);
        expect(intercepted).toHaveBeenCalledWith(expected);
    });

    it('Notifies about named method interception', ()=> {
        const arg = 'argument';
        const name = 'some_property_name';
        const intercepted = jasmine.createSpy('intercepted callback');
        const hasNamedMethod = jasmine.createSpy('has named method').and.returnValue(true);
        const namedMethodCallback = (namedMethodInfo: NamedMethodInfo, getPropertyInfo: GetPropertyInfo) =>{
            expect(namedMethodInfo.name).toEqual(name);
            expect(namedMethodInfo.arguments).toEqual([arg]);
            expect(getPropertyInfo.name).toEqual(name);
        };

        const interceptor = new MockInterceptor<Function>(intercepted, namedMethodCallback, hasNamedMethod);
        const object = interceptor.object;

        object[name](arg);
    });

    it('Returns value from method interception', ()=> {
        const expected = 'returned value';
        const intercepted = jasmine.createSpy('intercepted callback').and.returnValue(expected);
        const interceptor = new MockInterceptor<Function>(intercepted, undefined, undefined);
        const object = interceptor.object;

        const actual = object();

        expect(actual).toBe(expected);
    });

    it('Accepts set property interception', ()=> {
        const arg = 'argument';
        const name = 'some_property_name';
        const intercepted = jasmine.createSpy('intercepted callback').and.returnValue(true);
        const interceptor = new MockInterceptor<Function>(intercepted, undefined, undefined);
        const object = interceptor.object;

        object[name] = arg;
    });

    it('Throws TypeError from set property interception', ()=> {
        const arg = 'argument';
        const name = 'some_property_name';
        const intercepted = jasmine.createSpy('intercepted callback').and.returnValue(false);
        const interceptor = new MockInterceptor<Function>(intercepted, undefined, undefined);
        const object = interceptor.object;

        expect(()=> {object[name] = arg}).toThrow(jasmine.any(TypeError));
    });

    it('Returns value from get property interception', ()=> {
        const expected = 'returned value';
        const name = 'some_property_name';
        const intercepted = jasmine.createSpy('intercepted callback').and.returnValue(expected);
        const hasNamedMethod = jasmine.createSpy('has named method').and.returnValue(false);
        const interceptor = new MockInterceptor<Function>(intercepted, undefined, hasNamedMethod);
        const object = interceptor.object;

        const actual = object[name];

        expect(actual).toBe(expected);
    });

    it('Returns value from named method interception', ()=> {
        const expected = 'returned value';
        const name = 'some_property_name';
        const intercepted = jasmine.createSpy('intercepted callback');
        const hasNamedMethod = jasmine.createSpy('has named method').and.returnValue(true);
        const namedMethodCallback = jasmine.createSpy('named method callback').and.returnValue(expected);

        const interceptor = new MockInterceptor<Function>(intercepted, namedMethodCallback, hasNamedMethod);
        const object = interceptor.object;

        const actual = object[name]();

        expect(actual).toBe(expected);
    });
});