import {IExpressionInfo} from '../lib/expression';
import {It} from '../lib/expression-predicates';
import {ExpressionMatcher} from '../lib/expression-matcher';
import {IArgumentsMatcher} from '../lib/arguments-matcher';

describe('Expression matcher', () => {

    function ArgumebtsMatcherFactory(matched?: (left: any[], right: (any|It<any>)[])=> boolean): IArgumentsMatcher {
        return {
            matched: matched
        }
    }

    it('Returns true when both are undefined', ()=> {
        const left = undefined;
        const right = undefined;

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory());
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when both are null', ()=> {
        const left = null;
        const right = null;

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory());
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when both are the same object', ()=> {
        const expressionInfo: IExpressionInfo = {};

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory());
        const actual = matcher.matched(expressionInfo, expressionInfo);

        expect(actual).toBe(true);
    });

    it('Returns true when both are empty', ()=> {
        const left: IExpressionInfo = {};
        const right: IExpressionInfo = {};

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory());
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when left is not empty but right is empty', ()=> {
        const left: IExpressionInfo = {name: 'name', arguments: []};
        const right: IExpressionInfo = {};

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory());
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when left fits right by name', ()=> {
        const name = 'name';
        const left: IExpressionInfo = {name: name};
        const right: IExpressionInfo = {name: name};

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBeUndefined();
            expect(rvalue).toBeUndefined();
            return true;
        };

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when left fits right by arguments', ()=> {
        const left: IExpressionInfo = {arguments: []};
        const right: IExpressionInfo = {arguments: []};

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(left.arguments);
            expect(rvalue).toBe(right.arguments);
            return true;
        };

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when left fits right by name and arguments', ()=> {
        const name = 'name';
        const left: IExpressionInfo = {name: name, arguments: []};
        const right: IExpressionInfo = {name: name, arguments: []};

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(left.arguments);
            expect(rvalue).toBe(right.arguments);
            return true;
        };

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns false when left does not fit right by name', ()=> {
        const left: IExpressionInfo = {name: 'left name'};
        const right: IExpressionInfo = {name: 'right name'};

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBeUndefined();
            expect(rvalue).toBeUndefined();
            return true;
        };

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when left does not fit right by arguments', ()=> {
        const left: IExpressionInfo = {arguments: []};
        const right: IExpressionInfo = {arguments: []};

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(left.arguments);
            expect(rvalue).toBe(right.arguments);
            return false;
        };

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when left fits right by name but does not fit by arguments', ()=> {
        const name = 'name';
        const left: IExpressionInfo = {name: name, arguments: []};
        const right: IExpressionInfo = {name: name, arguments: []};

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(left.arguments);
            expect(rvalue).toBe(right.arguments);
            return false;
        };

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it('Returns false when left does not fit right by name but fits by arguments', ()=> {
        const left: IExpressionInfo = {name: 'left name', arguments: []};
        const right: IExpressionInfo = {name: 'right name', arguments: []};

        const matched = (lvalue, rvalue): boolean =>{
            expect(lvalue).toBe(left.arguments);
            expect(rvalue).toBe(right.arguments);
            return true;
        };

        const matcher = new ExpressionMatcher(ArgumebtsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});