import {It} from '../lib/expression-predicates';
import {
    ExpressionReflector, MethodInfo, GetPropertyInfo, SetPropertyInfo,
    NamedMethodInfo
} from '../lib/expression-reflector';

describe('Expression Reflector', () => {

    it('Resolves undefined expression', ()=> {
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => undefined);

        expect(actual).toBeUndefined();
    });

    it('Resolves empty expression', ()=> {
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance);

        expect(actual).toBeUndefined();
    });

    it('Resolves empty method call', ()=> {
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance());

        const expected = new MethodInfo([]);
        expect(actual).toEqual(expected);
    });

    it('Resolves method call with argument', ()=> {
        const arg = 'argument';
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance(arg));

        const expected = new MethodInfo([arg]);
        expect(actual).toEqual(expected);
    });

    it('Resolves get property', ()=> {
        const name = 'member_name';
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance[name]);

        const expected = new GetPropertyInfo(name);
        expect(actual).toEqual(expected);
    });

    it('Resolves set property', ()=> {
        const name = 'member_name';
        const arg = 'argument';
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => {instance[name] = arg});

        const expected = new SetPropertyInfo(name, arg);
        expect(actual).toEqual(expected);
    });

    it('Resolves named method call', ()=> {
        const name = 'member_name';
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance[name]());

        const expected = new NamedMethodInfo(name, []);
        expect(actual).toEqual(expected);
    });

    it('Resolves named method call with argument', ()=> {
        const name = 'member_name';
        const arg = 'argument';
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance[name](arg));

        const expected = new NamedMethodInfo(name, [arg]);
        expect(actual).toEqual(expected);
    });

    it('Resolves expression predicate', ()=> {
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => It.Is(()=> {
        }));

        expect(actual).toEqual(jasmine.any(It));
    });

});