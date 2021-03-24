﻿import { SetPropertyInteraction } from "../interactions";
import { SetPropertyExpressionMatcher } from "./set-property.matcher";
import { SetPropertyExpression } from "../reflector/expressions";
import { ConstantMatcher } from "./constant.matcher";
import { It } from "../reflector/expression-predicates";
import { createInjector, resolve } from "../../tests.components/resolve.builder";

describe("Set property expression matcher", () => {
    beforeEach(() => {
        const constantMatcher = jasmine.createSpyObj<ConstantMatcher>("", ["matched"]);
        createInjector([
            {provide: ConstantMatcher, useValue: constantMatcher, deps: []},
            {provide: SetPropertyExpressionMatcher, useClass: SetPropertyExpressionMatcher, deps: [ConstantMatcher]},
        ]);
    });

    it("Returns true when they are equal", () => {
        const name = "name";
        const value = "value";
        const left = new SetPropertyInteraction(name, value);
        const right = new SetPropertyExpression(name, value);

        resolve(ConstantMatcher)
            .matched.withArgs(value, value).and.returnValue(true);

        const matcher = resolve(SetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when right is predicate that returns true", () => {
        const left = new SetPropertyInteraction("name", "value");

        const right = It.Is((value) => {
            expect(value).toBe(left);
            return true;
        });

        const matcher = resolve(SetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right by name", () => {
        const value = "value";
        const left = new SetPropertyInteraction("left name", value);
        const right = new SetPropertyExpression("right name", value);

        resolve(ConstantMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const matcher = resolve(SetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when left does not equal to right by value", () => {
        const name = "name";
        const leftValue = "left value";
        const rightValue = "right value";

        const left = new SetPropertyInteraction(name, leftValue);
        const right = new SetPropertyExpression(name, rightValue);

        resolve(ConstantMatcher)
            .matched.withArgs(leftValue, rightValue).and.returnValue(false);

        const matcher = resolve(SetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when right is predicate that returns false", () => {
        const left = new SetPropertyInteraction("name", "value");
        const right = It.Is((value) => {
            expect(value).toBe(left);
            return false;
        });

        const matcher = resolve(SetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});
