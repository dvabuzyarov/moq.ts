import {It} from "../expected-expressions/expression-predicates";
import {ArgumentsMatcher} from "./arguments.matcher";
import {MethodInteraction} from "../interactions";
import {ExpectedMethodExpression} from "../expected-expressions/expected-expressions";
import {MethodExpressionMatcher} from "./method.matcher";

describe("Method expression matcher", () => {

    function argumentsMatcherFactory(matched?: (left: any[], right: (any|It<any>)[]) => boolean): ArgumentsMatcher {
        return (<any>{
            matched: matched
        } as ArgumentsMatcher);
    }

    it("Returns true when they are equal", () => {
        const arguments1 = [];
        const arguments2 = [];

        const left = new MethodInteraction(arguments1);
        const right = new ExpectedMethodExpression(arguments2);

        const matched = (lvalue, rvalue): boolean => {
            expect(lvalue).toBe(arguments1);
            expect(rvalue).toBe(arguments2);
            return true;
        };

        const matcher = new MethodExpressionMatcher(argumentsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when right is predicate that returns true", () => {
        const left = new MethodInteraction([]);

        const right = It.Is((value) => {
            expect(value).toBe(left);
            return true;
        });

        const matcher = new MethodExpressionMatcher(argumentsMatcherFactory(undefined));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const arguments1 = [];
        const arguments2 = [];

        const left = new MethodInteraction(arguments1);
        const right = new ExpectedMethodExpression(arguments2);

        const matched = (lvalue, rvalue): boolean => {
            expect(lvalue).toBe(arguments1);
            expect(rvalue).toBe(arguments2);
            return false;
        };

        const matcher = new MethodExpressionMatcher(argumentsMatcherFactory(matched));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right is predicate that returns false", () => {
        const left = new MethodInteraction([]);
        const right = It.Is((value) => {
            expect(value).toBe(left);
            return false;
        });

        const matcher = new MethodExpressionMatcher(argumentsMatcherFactory(undefined));
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});
