import {It} from '../lib/expression-predicates';
import {
    ExpressionReflector, MethodInfo, GetPropertyInfo, SetPropertyInfo,
    NamedMethodInfo
} from '../lib/expression-reflector';

describe('Expression', () => {

    it('Resolves undefined expression', ()=> {
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => undefined);

        expect(actual).toBeUndefined();
    });

    it('Resolves empty', ()=> {
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance);

        expect(actual).toBeUndefined();
    });

    it('Resolves empty method call', ()=> {
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance());

        const expected = new MethodInfo();
        expected.arguments = [];
        expect(actual).toEqual(expected);
    });

    it('Resolves method call with argument', ()=> {
        const arg = 'argument';
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance(arg));

        const expected = new MethodInfo();
        expected.arguments = [arg];
        expect(actual).toEqual(expected);
    });

    it('Resolves get property', ()=> {
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance.member);

        const expected = new GetPropertyInfo();
        expected.name = 'member';
        expect(actual).toEqual(expected);
    });

    it('Resolves set property', ()=> {
        const arg = 'argument';
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => {instance.member = arg});

        const expected = new SetPropertyInfo();
        expected.name = 'member';
        expected.value = arg;
        expect(actual).toEqual(expected);
    });

    it('Resolves named method call', ()=> {
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance.member());

        const expected = new NamedMethodInfo();
        expected.name = 'member';
        expected.arguments = [];
        expect(actual).toEqual(expected);
    });

    it('Resolves named method call with argument', ()=> {
        const arg = 'argument';
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => instance.member(arg));

        const expected = new NamedMethodInfo();
        expected.name = 'member';
        expected.arguments = [arg];
        expect(actual).toEqual(expected);
    });

    it('Resolves expression predicate', ()=> {
        const reflector = new ExpressionReflector();
        const actual = reflector.reflect(instance => It.Is(()=> {
        }));

        expect(actual).toEqual(jasmine.any(It));
    });

});