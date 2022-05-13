import { EXPRESSION_REFLECTOR } from "../../lib/reflector/expression-reflector";
import reflectorProviders from "../../lib/reflector";
import { createInjectorFromProviders, resolve2 } from "../../tests.components/resolve.builder";
import { nameof } from "../../tests.components/nameof";
import { GetPropertyExpression, MethodExpression } from "../../lib/reflector/expressions";

describe("Complex expression reflector", () => {

    beforeEach(() => {
        createInjectorFromProviders(reflectorProviders);
    });

    it("Returns expressions for instance => instance.get(name).prop", () => {
        interface T { get(name: string): { prop: number } }
        const name = "some name";

        const reflector = resolve2(EXPRESSION_REFLECTOR);
        const actual = reflector.reflect<T>(instance => instance.get(name).prop);

        const expected = [
            new MethodExpression(nameof<T>("get"), [name]),
            new GetPropertyExpression("prop"),
        ];
        expect(actual).toEqual(expected);
    });
});
