import {reflectExpression, IExpressionInfo} from '../lib/expression';
import {It} from '../lib/expression-predicates';

describe('Expression', () => {

    it('Resolves undefined expression', ()=> {
        const actual = reflectExpression(instance => undefined);

        const expected: IExpressionInfo = {};
        expect(actual).toEqual(expected);
    });

    it('Resolves empty', ()=> {
        const actual = reflectExpression(instance => instance);

        const expected: IExpressionInfo = {};
        expect(actual).toEqual(expected);
    });

    it('Resolves empty call', ()=> {
        const actual = reflectExpression(instance => instance());

        const expected: IExpressionInfo = {
            arguments: []
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves argument', ()=> {
        const arg = 'argument';
        const actual = reflectExpression(instance => instance(arg));

        const expected: IExpressionInfo = {
            arguments: [arg]
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves name', ()=> {
        const actual = reflectExpression(instance => instance.member);

        const expected: IExpressionInfo = {
            name: 'member'
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves name and argument', ()=> {
        const arg = 'argument';
        const actual = reflectExpression(instance => instance.member(arg));

        const expected: IExpressionInfo = {
            name: 'member',
            arguments: [arg],
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves expression predicate', ()=> {
        const actual = reflectExpression(instance => It.Is(()=> {}));

        expect(actual).toEqual(jasmine.any(It));
    });

});