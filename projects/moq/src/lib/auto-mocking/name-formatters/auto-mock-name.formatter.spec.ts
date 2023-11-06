import { AutoMockNameFormatter } from "./auto-mock-name.formatter";
import { FunctionExpressionFormatter } from "../../formatters/function-expression.formatter";
import { PropertyKeyFormatter } from "../../formatters/property-key.formatter";
import { MethodExpressionFormatter } from "../../formatters/method-expression.formatter";
import { NamePrefixProvider } from "./name-prefix.provider";
import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import {
    FunctionExpression,
    GetPropertyExpression,
    MethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../../reflector/expressions";
import { ObjectFormatter } from "../../object-formatters/object.formatter";

describe("Auto mock name formatter", () => {

    beforeEach(() => {
        createInjector(AutoMockNameFormatter, [
            NamePrefixProvider,
            FunctionExpressionFormatter,
            PropertyKeyFormatter,
            MethodExpressionFormatter,
            ObjectFormatter
        ]);
    });

    it("Returns mock name for MethodExpression", () => {
        const expression = new FunctionExpression(undefined);
        const name = "mock name";
        const prefix = "instance";
        const postfix = "postfix";

        resolveMock(NamePrefixProvider)
            .setup(instance => instance.get(name))
            .returns(prefix);

        resolveMock(FunctionExpressionFormatter)
            .setup(instance => instance.format(expression))
            .returns(postfix);

        const provider = resolve2(AutoMockNameFormatter);
        const actual = provider.format(name, expression);

        expect(actual).toEqual(`${prefix}${postfix}`);
    });

    it("Returns mock name for GetPropertyExpression", () => {
        const propertyKey = "propertyKey";
        const expression = new GetPropertyExpression(propertyKey);
        const name = "mock name";
        const prefix = "instance";
        const postfix = "postfix";

        resolveMock(NamePrefixProvider)
            .setup(instance => instance.get(name))
            .returns(prefix);

        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(propertyKey))
            .returns(postfix);

        const provider = resolve2(AutoMockNameFormatter);
        const actual = provider.format(name, expression);

        expect(actual).toEqual(`${prefix}.${postfix}`);
    });

    it("Returns mock name for NamedMethodExpression", () => {
        const expression = new MethodExpression(undefined, undefined);
        const name = "mock name";
        const prefix = "instance";
        const postfix = "postfix";

        resolveMock(NamePrefixProvider)
            .setup(instance => instance.get(name))
            .returns(prefix);

        resolveMock(MethodExpressionFormatter)
            .setup(instance => instance.format(expression))
            .returns(postfix);

        const provider = resolve2(AutoMockNameFormatter);
        const actual = provider.format(name, expression);

        expect(actual).toEqual(`${prefix}.${postfix}`);
    });

    it("Returns mock name for NewOperatorInteraction", () => {
        const args = [];
        const expression = new NewOperatorExpression(args);
        const name = "mock name";
        const prefix = "instance";
        const postfix = "postfix";

        resolveMock(NamePrefixProvider)
            .setup(instance => instance.get(name))
            .returns(prefix);

        resolveMock(ObjectFormatter)
            .setup(instance => instance.format(args))
            .returns(postfix);

        const provider = resolve2(AutoMockNameFormatter);
        const actual = provider.format(name, expression);

        expect(actual).toEqual(`new ${name}(${postfix})`);
    });

    it("Returns default value", () => {
        const expression = new SetPropertyExpression(undefined, undefined);
        const name = "mock name";
        const prefix = "instance";

        resolveMock(NamePrefixProvider)
            .setup(instance => instance.get(name))
            .returns(prefix);

        const provider = resolve2(AutoMockNameFormatter);
        const actual = provider.format(name, expression);

        expect(actual).toEqual(`${name}[${expression}]`);
    });
});
