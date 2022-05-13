import { ArgumentsEqualityComparer } from "./arguments.equality-comparer";
import { It } from "../reflector/expression-predicates";
import { MethodExpression } from "../reflector/expressions";
import { InstanceMethodEqualityComparer } from "./instance-method.equality-comparer";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { Times } from "moq.ts";
import { ConstantEqualityComparer } from "./constant.equality-comparer";

describe("Instance method expression equality comparer", () => {

    beforeEach(() => {
        createInjector(InstanceMethodEqualityComparer, [ArgumentsEqualityComparer]);
    });

    it("Returns true when they are equal", () => {
        const arguments1 = [];
        const arguments2 = [];

        const name = "name";
        const left = new MethodExpression(name, arguments1);
        const right = new MethodExpression(name, arguments2);

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
        const left = new MethodExpression(name, arguments1);
        const right = new MethodExpression(name, arguments2);

        resolveMock(ArgumentsEqualityComparer)
            .setup(instance => instance.equals(arguments1, arguments2))
            .returns(false);

        const comparer = resolve2(InstanceMethodEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when left does not equal to right by name", () => {
        const args = [];

        const left = new MethodExpression("left name", args);
        const right = new MethodExpression("right name", args);

        resolveMock(ArgumentsEqualityComparer)
            .setup(instance => instance.equals(args, args))
            .returns(true);

        const comparer = resolve2(InstanceMethodEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });

    it("Does not call args matcher when names are not equal", () => {
        const args = [];

        const left = new MethodExpression("left name", args);
        const right = new MethodExpression("right name", args);

        const comparer = resolve2(InstanceMethodEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
        resolveMock(ArgumentsEqualityComparer)
            .verify(instance => instance.equals(It.IsAny(), It.IsAny()), Times.Never());
    });

});
