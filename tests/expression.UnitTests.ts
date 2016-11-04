import {expression, IExpressionInfo} from '../lib/expression';

describe('Expression', () => {

    it('Resolves empty', ()=> {
        const actual = expression(instance => instance);
        const expected: IExpressionInfo = {
            name: undefined,
            arguments: undefined,
            next: undefined
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves argument', ()=> {
        const arg = 'argument';
        const actual = expression(instance => instance(arg));
        const expected: IExpressionInfo = {
            name: undefined,
            arguments: [arg],
            next: undefined
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves name', ()=> {
        const actual = expression(instance => instance.member);
        const expected: IExpressionInfo = {
            name: 'member',
            arguments: undefined,
            next: undefined
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves name and argument', ()=> {
        const arg = 'argument';
        const actual = expression(instance => instance.member(arg));
        const expected: IExpressionInfo = {
            name: 'member',
            arguments: [arg],
            next: undefined
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves complex name', ()=> {
        const actual = expression(instance => instance.member1.member2);
        const expected: IExpressionInfo = {
            name: 'member1',
            arguments: undefined,
            next: {
                name: 'member2',
                arguments: undefined,
                next: undefined
            }
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves complex name and argument', ()=> {
        const arg = 'argument';
        const actual = expression(instance => instance.member1.member2(arg));
        const expected: IExpressionInfo = {
            name: 'member1',
            arguments: undefined,
            next: {
                name: 'member2',
                arguments: [arg],
                next: undefined
            }
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves complex name with arguments and argument', ()=> {
        const arg1 = 'argument 1';
        const arg2 = 'argument 2';
        const actual = expression(instance => instance.member1(arg1).member2(arg2));
        const expected: IExpressionInfo = {
            name: 'member1',
            arguments: [arg1],
            next: {
                name: 'member2',
                arguments: [arg2],
                next: undefined
            }
        };
        expect(actual).toEqual(expected);
    });

    it('Resolves complex name with arguments, function and name with argument', ()=> {
        const arg1 = 'argument 1';
        const arg2 = 'argument 2';
        const arg3 = 'argument 3';
        const actual = expression(instance => instance.member1(arg1)(arg2).member3(arg3));
        const expected: IExpressionInfo = {
            name: 'member1',
            arguments: [arg1],
            next: {
                name: undefined,
                arguments: [arg2],
                next: {
                    name: 'member3',
                    arguments: [arg3],
                    next: undefined
                }
            }
        };
        expect(actual).toEqual(expected);
    });

});