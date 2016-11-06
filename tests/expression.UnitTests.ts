import {expression, IExpressionInfo} from '../lib/expression';

describe('Expression', () => {

    it('Resolves undefined expression', ()=> {
        const actual = expression(instance => undefined);
        const expected: IExpressionInfo = {
            name: undefined,
            arguments: undefined
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves empty', ()=> {
        const actual = expression(instance => instance);
        const expected: IExpressionInfo = {
            name: undefined,
            arguments: undefined
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves argument', ()=> {
        const arg = 'argument';
        const actual = expression(instance => instance(arg));
        const expected: IExpressionInfo = {
            name: undefined,
            arguments: [arg],
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves name', ()=> {
        const actual = expression(instance => instance.member);
        const expected: IExpressionInfo = {
            name: 'member',
            arguments: undefined,
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves name and argument', ()=> {
        const arg = 'argument';
        const actual = expression(instance => instance.member(arg));
        const expected: IExpressionInfo = {
            name: 'member',
            arguments: [arg],
        };
        expect(actual).toEqual(expected);
    });

});