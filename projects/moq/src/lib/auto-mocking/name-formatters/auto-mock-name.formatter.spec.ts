import { AutoMockNameFormatter } from "./auto-mock-name.formatter";
import { MethodFormatter } from "../../formatters/method.formatter";
import { PropertyKeyFormatter } from "../../formatters/property-key.formatter";
import { NamedMethodFormatter } from "../../formatters/named-method.formatter";
import { ConstantFormatter } from "../../formatters/constant.formatter";
import { NamePrefixProvider } from "./name-prefix.provider";
import {
    GetPropertyExpression,
    MethodExpression,
    NamedMethodExpression,
    NewOperatorExpression, SetPropertyExpression
} from "../../reflector/expressions";
import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";

describe("Auto mock name formatter", () => {

    beforeEach(() => {
        createInjector2(AutoMockNameFormatter, [
            NamePrefixProvider,
            MethodFormatter,
            PropertyKeyFormatter,
            NamedMethodFormatter,
            ConstantFormatter
        ]);
    });

    it("Returns mock name for MethodExpression", () => {
        const expression = new MethodExpression(undefined);
        const name = "mock name";
        const prefix = "instance";
        const postfix = "postfix";

        resolveMock(NamePrefixProvider)
            .setup(instance => instance.get(name))
            .returns(prefix);

        resolveMock(MethodFormatter)
            .setup(instance => instance.format(expression))
            .returns(postfix);

        const provider = resolve2(AutoMockNameFormatter);
        const actual = provider.format(name, expression);

        expect(actual).toEqual(`${prefix}.${postfix}`);
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
        const expression = new NamedMethodExpression(undefined, undefined);
        const name = "mock name";
        const prefix = "instance";
        const postfix = "postfix";

        resolveMock(NamePrefixProvider)
            .setup(instance => instance.get(name))
            .returns(prefix);

        resolveMock(NamedMethodFormatter)
            .setup(instance => instance.format(expression))
            .returns(postfix);

        const provider = resolve2(AutoMockNameFormatter);
        const actual = provider.format(name, expression);

        expect(actual).toEqual(`${prefix}.${postfix}`);
    });

    it("Returns mock name for NewOperatorExpression", () => {
        const args = [];
        const expression = new NewOperatorExpression(args);
        const name = "mock name";
        const prefix = "instance";
        const postfix = "postfix";

        resolveMock(NamePrefixProvider)
            .setup(instance => instance.get(name))
            .returns(prefix);

        resolveMock(ConstantFormatter)
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
