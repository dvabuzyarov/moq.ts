import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { Expressions } from "./expressions";
import { SingleExpressionReflector } from "./single.expression-reflector";
import { FullExpressionReflector } from "./full.expression-reflector";

describe("Single expression Reflector", () => {

    beforeEach(() => {
        createInjector2(SingleExpressionReflector, [FullExpressionReflector]);
    });

    it("Returns the first expression", () => {
        const expression = instance => instance;
        const first = {} as Expressions<any>;
        const second = {} as Expressions<any>;

        resolveMock(FullExpressionReflector)
            .setup(instance => instance.reflect(expression))
            .returns([first, second]);

        const reflector = resolve2(SingleExpressionReflector);
        const actual = reflector.reflect(expression);

        expect(actual).toEqual([first]);
    });
});
