import { ArgumentsEqualityComparer } from "./arguments.equality-comparer";
import { It } from "../reflector/expression-predicates";
import { NamedMethodInteraction } from "../interactions";
import { InstanceMethodEqualityComparer } from "./instance-method.equality-comparer";
import { NamedMethodExpression } from "../reflector/expressions";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { Times } from "moq.ts";

describe("Instance method expression equality comparer", () => {

    beforeEach(() => {
        createInjector2(InstanceMethodEqualityComparer, [ArgumentsEqualityComparer]);
    });

    it("Returns true when they are equal", () => {
        const arguments1 = [];
        const arguments2 = [];

        const name = "name";
        const left = new NamedMethodInteraction(name, arguments1);
        const right = new NamedMethodExpression(name, arguments2);

        resolveMock(ArgumentsEqualityComparer)
            .setup(instance => instance.equals(arguments1, arguments2))
            .returns(true);

        const comparer = resolve2(InstanceMethodEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right by args", () => {
        const arguments1 = [];
        const arguments2 = [];

        const name = "name";
        const left = new NamedMethodInteraction(name, arguments1);
        const right = new NamedMethodExpression(name, arguments2);

        resolveMock(ArgumentsEqualityComparer)
            .setup(instance => instance.equals(arguments1, arguments2))
            .returns(false);

        const comparer = resolve2(InstanceMethodEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when left does not equal to right by name", () => {
        const args = [];

        const left = new NamedMethodInteraction("left name", args);
        const right = new NamedMethodExpression("right name", args);

        resolveMock(ArgumentsEqualityComparer)
            .setup(instance => instance.equals(args, args))
            .returns(true);

        const comparer = resolve2(InstanceMethodEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });

    it("Does not call args matcher when names are not equal", () => {
        const args = [];

        const left = new NamedMethodInteraction("left name", args);
        const right = new NamedMethodExpression("right name", args);

        const comparer = resolve2(InstanceMethodEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
        resolveMock(ArgumentsEqualityComparer)
            .verify(instance => instance.equals(It.IsAny(), It.IsAny()), Times.Never());
    });

});
