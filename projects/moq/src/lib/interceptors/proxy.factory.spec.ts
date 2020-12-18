/*eslint-disable max-classes-per-file*/
import { ProxyFactory } from "./proxy.factory";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { GetTrap } from "./get.trap";
import { SetTrap } from "./set.trap";
import { ApplyTrap } from "./apply.trap";
import { GetPrototypeOfTrap } from "./get-prototype-of.trap";
import { SetPrototypeOfTrap } from "./set-prototype-of.trap";
import { HasTrap } from "./has.trap";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";

describe("Proxy factory", () => {

    beforeEach(() => {
        createInjector2(ProxyFactory, [
            MOCK_OPTIONS,
            GetTrap,
            SetTrap,
            HasTrap,
            ApplyTrap,
            GetPrototypeOfTrap,
            SetPrototypeOfTrap
        ]);
    });

    it("Returns proxy object", () => {
        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.target)
            .returns(() => undefined);

        const interceptor = resolve2(ProxyFactory);
        const actual = interceptor.object();

        expect(actual).not.toBeUndefined();
    });

    it("Returns the same proxy object", () => {
        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.target)
            .returns(() => undefined);

        const interceptor = resolve2(ProxyFactory);
        const first = interceptor.object();
        const second = interceptor.object();

        expect(first === second).toBe(true);
    });

    it("Traps get", () => {
        const name = "some_property_name";
        const value = {};
        const target = () => undefined;

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.target)
            .returns(target);

        resolveMock(GetTrap)
            .setup(instance => instance.intercept(name))
            .returns(value);

        const interceptor = resolve2(ProxyFactory);
        const object = interceptor.object();
        const actual = object[name];

        expect(actual).toBe(value);
    });

    it("Traps set", () => {
        const name = "some_property_name";
        const value = {};
        const target = () => undefined;

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.target)
            .returns(target);
        resolveMock(SetTrap)
            .setup(instance => instance.intercept(target, name, value))
            .returns(true);

        const interceptor = resolve2(ProxyFactory);
        const object = interceptor.object();
        const actual = object[name] = value;

        expect(actual).toBe(value);
    });

    it("Traps set with false", () => {
        const name = "some_property_name";
        const value = {};
        const target = () => undefined;

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.target)
            .returns(target);

        resolveMock(SetTrap)
            .setup(instance => instance.intercept(target, name, value))
            .returns(false);

        const interceptor = resolve2(ProxyFactory);
        const object = interceptor.object();
        expect(() => {
            object[name] = value;
        }).toThrow(jasmine.any(TypeError));
    });

    it("Traps has", () => {
        const name = "some_property_name";
        const value = true;
        const target = () => undefined;

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.target)
            .returns(target);
        resolveMock(HasTrap)
            .setup(instance => instance.intercept(name))
            .returns(value);

        const interceptor = resolve2<ProxyFactory<() => void>>(ProxyFactory);
        const object = interceptor.object();
        const actual = name in object;

        expect(actual).toBe(value);
    });

    it("Traps apply", () => {
        const arg = "argument";
        const value = {};
        const target = () => undefined;

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.target)
            .returns(target);

        resolveMock(ApplyTrap)
            .setup(instance => instance.intercept(target, undefined, [arg]))
            .returns(value);

        const interceptor = resolve2<ProxyFactory<(...args) => undefined>>(ProxyFactory);
        const object = interceptor.object();

        const actual = object(arg);

        expect(actual).toBe(value);
    });

    it("Traps get prototype of", () => {
        class Prototype {
        }

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.target)
            .returns(() => undefined);
        resolveMock(GetPrototypeOfTrap)
            .setup(instance => instance.intercept())
            .returns(Prototype.prototype);

        const interceptor = resolve2(ProxyFactory);
        const object = interceptor.object();

        expect(object instanceof Prototype).toBe(true);
    });

    it("Traps set prototype of", () => {
        class Prototype {
        }

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.target)
            .returns(() => undefined);
        resolveMock(SetPrototypeOfTrap)
            .setup(instance => instance.intercept(Prototype.prototype))
            .returns(true);

        const interceptor = resolve2(ProxyFactory);
        const object = interceptor.object();
        Object.setPrototypeOf(object, Prototype.prototype);

        resolveMock(SetPrototypeOfTrap)
            .verify(instance => instance.intercept(Prototype.prototype));
    });

    it("Traps set prototype of with false", () => {
        class Prototype {
        }

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.target)
            .returns(() => undefined);
        resolveMock(SetPrototypeOfTrap)
            .setup(instance => instance.intercept(Prototype.prototype))
            .returns(false);

        const interceptor = resolve2(ProxyFactory);
        const object = interceptor.object();

        expect(() => {
            Object.setPrototypeOf(object, Prototype.prototype);
        }).toThrow(jasmine.any(TypeError));
    });

    it("Returns object that typeof is typeof of provided target", () => {
        class Prototype {
        }

        resolveMock(MOCK_OPTIONS)
            .setup(instance => instance.target)
            .returns(Prototype);
        resolveMock(GetPrototypeOfTrap)
            .setup(instance => instance.intercept())
            .returns(Prototype.prototype);

        const interceptor = resolve2(ProxyFactory);
        const object = interceptor.object();

        expect(typeof object).toBe(typeof Prototype);
        expect(object instanceof Prototype).toBe(true);
    });
});
