import { IInjectorConfig, IMock, IPresetBuilder, ISequenceVerifier } from "./moq";
import { createInjector2, resolveMock } from "../tests.components/resolve.builder";
import { MOCK } from "./injector/mock.injection-token";
import { DefaultInjectorConfig } from "./injector/default-injector.config";
import * as injectorFactory from "./injector/injector.factory";
import { MockCore } from "./core/mock-core";
import { Mock } from "./mock";
import * as moq from "moq.ts";
import { InjectionToken } from "./static.injector/injection_token";
import { Times } from "./times";
import { MOCK_CONSTRUCTOR } from "./injector/mock-constructor.injection-token";

describe("Mock", () => {
    beforeEach(() => {
        const injector = createInjector2(Mock, [MockCore]);
        spyOn(injectorFactory, "injectorFactory").and.returnValue(injector);
    });

    it("Exposes mock name", () => {
        const name = "mock name";

        resolveMock(MockCore)
            .setup(instance => instance.name)
            .returns(name);

        const mock = new Mock();
        const actual = mock.name;

        expect(actual).toBe(name);
    });

    it("Exposes mock options", () => {
        const options = {};

        resolveMock(MockCore)
            .setup(instance => instance.options)
            .returns(options);

        const mock = new Mock();
        expect(mock.options).toBe(options);
    });

    it("Returns object", () => {
        const object = {};

        resolveMock(MockCore)
            .setup(instance => instance.object())
            .returns(object);

        const mock = new Mock();
        const actual = mock.object();

        expect(actual).toBe(object);
    });

    it("Returns resolved service", () => {
        const object = {};
        const token = new InjectionToken<any>("test");

        resolveMock(MockCore)
            .setup(instance => instance.resolve(token))
            .returns(object);

        const mock = new Mock();
        const actual = mock.resolve(token);

        expect(actual).toBe(object);
    });

    it("Verifies an expression", () => {
        const expected = {} as IMock<unknown>;
        const expression = instance => instance["property"];

        resolveMock(MockCore)
            .setup(instance => instance.verify(expression, Times.Once()))
            .returns(expected);

        const mock = new Mock();

        const actual = mock.verify(expression);

        expect(actual).toBe(expected);
    });

    it("Setups mock", () => {
        const builder = {} as IPresetBuilder<any>;
        const expression = instance => instance["property"];

        resolveMock(MockCore)
            .setup(instance => instance.setup(expression))
            .returns(builder);

        const mock = new Mock();
        const actual = mock.setup(expression);

        expect(actual).toBe(builder);
    });

    it("Sets prototype of mock", () => {
        const prototype = {};
        const expected = {} as IMock<unknown>;

        resolveMock(MockCore)
            .setup(instance => instance.prototypeof(prototype))
            .returns(expected);

        const mock = new Mock();
        const actual = mock.prototypeof(prototype);

        expect(actual).toBe(expected);
    });

    it("Adds verified expression into sequence verifier", () => {
        const expression = instance => instance["property"];
        const expected = {} as IMock<unknown>;

        const sequenceVerifier = new moq.Mock<ISequenceVerifier>()
            .object();

        resolveMock(MockCore)
            .setup(instance => instance.insequence(sequenceVerifier, expression))
            .returns(expected);

        const mock = new Mock();
        const actual = mock.insequence(sequenceVerifier, expression);

        expect(actual).toBe(expected);
    });

    it("Returns default static Mock options", () => {
        const {target, injectorConfig, name} = Mock.options;

        expect(injectorConfig).toEqual(new DefaultInjectorConfig());
        expect(typeof target === "function").toBe(true);
        expect(name).toBe(undefined);
    });

    it("Invokes injectorFactory with static provider of self", () => {
        const mock = new Mock();
        const providers = [
            {provide: MOCK, useValue: mock, deps: []},
            {provide: MOCK_CONSTRUCTOR, useValue: jasmine.any(Function), deps: []},
        ];
        expect(injectorFactory.injectorFactory).toHaveBeenCalledWith(Mock.options, providers);
    });

    it("Invokes injectorFactory with overridden static options", () => {
        const name = "name";
        const target = () => undefined;
        const injectorConfig = jasmine.createSpyObj<IInjectorConfig>(["get"]);
        Mock.options = {name, target, injectorConfig};

        const mock = new Mock();

        // Since this one is a static singleton we have to restore it
        Mock.options = undefined;

        const providers = [
            {provide: MOCK, useValue: mock, deps: []},
            {provide: MOCK_CONSTRUCTOR, useValue: jasmine.any(Function), deps: []},
        ];
        expect(injectorFactory.injectorFactory).toHaveBeenCalledWith({
            name,
            target,
            injectorConfig
        }, providers);
    });

    it("Invokes injectorFactory with overridden instance options", () => {
        const name = "name";
        const target = () => undefined;
        const injectorConfig = jasmine.createSpyObj<IInjectorConfig>(["get"]);

        const mock = new Mock({name, target, injectorConfig});

        const providers = [
            {provide: MOCK, useValue: mock, deps: []},
            {provide: MOCK_CONSTRUCTOR, useValue: jasmine.any(Function), deps: []},
        ];
        expect(injectorFactory.injectorFactory).toHaveBeenCalledWith({
            name,
            target,
            injectorConfig
        }, providers);
    });
});
