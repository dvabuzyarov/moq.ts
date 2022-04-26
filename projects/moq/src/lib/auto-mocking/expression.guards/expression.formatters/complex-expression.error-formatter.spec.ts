import { ComplexExpressionErrorFormatter } from "./complex-expression.error-formatter";
import { MOCK_OPTIONS } from "../../../mock-options/mock-options.injection-token";
import { NamePrefixProvider } from "../../name-formatters/name-prefix.provider";
import { ExpressionFormatter } from "./expression.formatter";
import { StringErrorStyler } from "./string.error-styler";
import { createInjector, resolve2, resolveMock } from "../../../../tests.components/resolve.builder";
import { Expressions } from "../../../reflector/expressions";

describe("Complex expression error formatter", () => {

    beforeEach(() => {
        createInjector(ComplexExpressionErrorFormatter, [MOCK_OPTIONS, NamePrefixProvider, ExpressionFormatter, StringErrorStyler]);
    });

    it("Returns styled string representation for expressions", () => {
        const name = "name";
        const instanceName = "instance";
        const firstExpression = {first: true} as any as Expressions<unknown>;
        const secondExpression = {second: true} as any as Expressions<unknown>;
        const firstRepresentation = "first representation";
        const secondRepresentation = "second representation";
        const styledFirstRepresentation = "styled first representation";

        const expressions = [[firstExpression, false], [secondExpression, true]] as [Expressions<unknown>, boolean][];
        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.name)
            .returns(name);
        resolveMock(NamePrefixProvider)
            .setup(instance => instance.get(name))
            .returns(instanceName);
        resolveMock(ExpressionFormatter)
            .setup(instance => instance.format(firstExpression, instanceName))
            .returns(firstRepresentation)
            .setup(instance => instance.format(secondExpression, instanceName))
            .returns(secondRepresentation);
        resolveMock(StringErrorStyler)
            .setup(instance => instance.style(firstRepresentation))
            .returns(styledFirstRepresentation);

        const formatter = resolve2(ComplexExpressionErrorFormatter);
        const actual = formatter.format(expressions);

        const expected = `${instanceName}${styledFirstRepresentation}${secondRepresentation}`;
        expect(actual).toEqual(expected);
    });
});
