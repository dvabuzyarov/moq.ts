import {ExpectedExpressionReflector} from '../../lib/expected-expressions/expected-expression-reflector';
import {
    ExpectedMethodExpression,
    ExpectedGetPropertyExpression, ExpectedSetPropertyExpression, ExpectedNamedMethodExpression
} from '../../lib/expected-expressions/expected-expressions';
import {It} from '../../lib/expected-expressions/expression-predicates';

describe('Expected Expression Reflector', () => {

    it('Resolves undefined expression', ()=> {
        const reflector = new ExpectedExpressionReflector();
        const actual = reflector.reflect(instance => undefined);

        expect(actual).toBeUndefined();
    });

    it('Resolves empty expression', ()=> {
        const reflector = new ExpectedExpressionReflector();
        const actual = reflector.reflect(instance => instance);

        expect(actual).toBeUndefined();
    });

    it('Resolves empty method call', ()=> {
        const reflector = new ExpectedExpressionReflector();
        const actual = reflector.reflect<Function>(instance => instance());

        const expected = new ExpectedMethodExpression([]);
        expect(actual).toEqual(expected);
    });

    it('Resolves method call with argument', ()=> {
        const arg = 'argument';
        const reflector = new ExpectedExpressionReflector();
        const actual = reflector.reflect<any>(instance => instance(arg));

        const expected = new ExpectedMethodExpression([arg]);
        expect(actual).toEqual(expected);
    });

    it('Resolves get property', ()=> {
        const name = 'member_name';
        const reflector = new ExpectedExpressionReflector();
        const actual = reflector.reflect(instance => instance[name]);

        const expected = new ExpectedGetPropertyExpression(name);
        expect(actual).toEqual(expected);
    });

    it('Resolves set property', ()=> {
        const name = 'member_name';
        const arg = 'argument';
        const reflector = new ExpectedExpressionReflector();
        const actual = reflector.reflect(instance => {instance[name] = arg});

        const expected = new ExpectedSetPropertyExpression(name, arg);
        expect(actual).toEqual(expected);
    });

    it('Resolves set property with it', ()=> {
        const name = 'member_name';
        const arg = 'argument';
        const reflector = new ExpectedExpressionReflector();
        const it = It.Is(value => value === arg);
        const actual = reflector.reflect(instance => {instance[name] = it});

        const expected = new ExpectedSetPropertyExpression(name, it);
        expect(actual).toEqual(expected);
    });

    it('Resolves named method call', ()=> {
        const name = 'member_name';
        const reflector = new ExpectedExpressionReflector();
        const actual = reflector.reflect(instance => instance[name]());

        const expected = new ExpectedNamedMethodExpression(name, []);
        expect(actual).toEqual(expected);
    });

    it('Resolves named method call with argument', ()=> {
        const name = 'member_name';
        const arg = 'argument';
        const reflector = new ExpectedExpressionReflector();
        const actual = reflector.reflect(instance => instance[name](arg));

        const expected = new ExpectedNamedMethodExpression(name, [arg]);
        expect(actual).toEqual(expected);
    });

    it('Resolves expression predicate', ()=> {
        const reflector = new ExpectedExpressionReflector();
        const actual = reflector.reflect(instance => It.Is(()=> undefined));

        expect(actual).toEqual(jasmine.any(It));
    });

});