import { ProxyFactory } from "./proxy.factory";
import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { GetTrap } from "./get.trap";
import { SetTrap } from "./set.trap";
import { ApplyTrap } from "./apply.trap";
import { GetPrototypeOfTrap } from "./get-prototype-of.trap";
import { SetPrototypeOfTrap } from "./set-prototype-of.trap";
import { HasTrap } from "./has.trap";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";

describe("Proxy factory", () => {

    beforeEach(() => {
        const getTrap = jasmine.createSpyObj<GetTrap>("", ["intercept"]);
        const setTrap = jasmine.createSpyObj<SetTrap>("", ["intercept"]);
        const hasTrap = jasmine.createSpyObj<HasTrap>("", ["intercept"]);
        const applyTrap = jasmine.createSpyObj<ApplyTrap>("", ["intercept"]);
        const getPrototypeOfTrap = jasmine.createSpyObj<GetPrototypeOfTrap>("", ["intercept"]);
        const setPrototypeOfTrap = jasmine.createSpyObj<SetPrototypeOfTrap>("", ["intercept"]);

        createInjector([
            {
                provide: ProxyFactory, useClass: ProxyFactory, deps: [
                    MOCK_OPTIONS,
                    GetTrap,
                    SetTrap,
                    HasTrap,
                    ApplyTrap,
                    GetPrototypeOfTrap,
                    SetPrototypeOfTrap
                ]
            },
            {provide: GetTrap, useValue: getTrap, deps: []},
            {provide: SetTrap, useValue: setTrap, deps: []},
            {provide: HasTrap, useValue: hasTrap, deps: []},
            {provide: ApplyTrap, useValue: applyTrap, deps: []},
            {provide: GetPrototypeOfTrap, useValue: getPrototypeOfTrap, deps: []},
            {provide: SetPrototypeOfTrap, useValue: setPrototypeOfTrap, deps: []},
            {provide: MOCK_OPTIONS, useValue: {}, deps: []},
        ]);
    });

    it("Returns proxy object", () => {
        Object.defineProperty(resolve(MOCK_OPTIONS), "target", {value: () => undefined});

        const interceptor = resolve(ProxyFactory);
        const actual = interceptor.object();

        expect(actual).not.toBeUndefined();
    });

    it("Returns the same proxy object", () => {
        Object.defineProperty(resolve(MOCK_OPTIONS), "target", {value: () => undefined});

        const interceptor = resolve(ProxyFactory);
        const first = interceptor.object();
        const second = interceptor.object();

        expect(first === second).toBe(true);
    });

    it("Traps get", () => {
        const name = "some_property_name";
        const value = {};
        const target = () => undefined;

        Object.defineProperty(resolve(MOCK_OPTIONS), "target", {value: target});

        resolve(GetTrap)
            .intercept.withArgs(name).and.returnValue(value);

        const interceptor = resolve(ProxyFactory);
        const object = interceptor.object();
        const actual = object[name];

        expect(actual).toBe(value);
    });

    it("Traps set", () => {
        const name = "some_property_name";
        const value = {};
        const target = () => undefined;

        Object.defineProperty(resolve(MOCK_OPTIONS), "target", {value: target});
        resolve(SetTrap)
            .intercept.withArgs(target, name, value).and.returnValue(true);

        const interceptor = resolve(ProxyFactory);
        const object = interceptor.object();
        const actual = object[name] = value;

        expect(actual).toBe(value);
    });

    it("Traps set with false", () => {
        const name = "some_property_name";
        const value = {};
        const target = () => undefined;
        Object.defineProperty(resolve(MOCK_OPTIONS), "target", {value: target});

        resolve(SetTrap)
            .intercept.withArgs(target, name, value).and.returnValue(false);

        const interceptor = resolve(ProxyFactory);
        const object = interceptor.object();
        expect(() => {
            object[name] = value;
        }).toThrow(jasmine.any(TypeError));
    });

    it("Traps has", () => {
        const name = "some_property_name";
        const value = true;
        const target = () => undefined;

        Object.defineProperty(resolve(MOCK_OPTIONS), "target", {value: target});
        resolve(HasTrap)
            .intercept.withArgs(name).and.returnValue(value);

        const interceptor = resolve(ProxyFactory) as ProxyFactory<Function>;
        const object = interceptor.object();
        const actual = name in object;

        expect(actual).toBe(value);
    });

    it("Traps apply", () => {
        const arg = "argument";
        const value = {};
        const target = () => undefined;

        Object.defineProperty(resolve(MOCK_OPTIONS), "target", {value: target});

        resolve(ApplyTrap)
            .intercept.withArgs(target, undefined, [arg]).and.returnValue(value);

        const interceptor = resolve(ProxyFactory) as ProxyFactory<Function>;
        const object = interceptor.object();

        const actual = object(arg);

        expect(actual).toBe(value);
    });

    it("Traps get prototype of", () => {
        class Prototype {
        }

        Object.defineProperty(resolve(MOCK_OPTIONS), "target", {value: () => undefined});
        resolve(GetPrototypeOfTrap)
            .intercept.withArgs().and.returnValue(Prototype.prototype);

        const interceptor = resolve(ProxyFactory);
        const object = interceptor.object();

        expect(object instanceof Prototype).toBe(true);
    });

    it("Traps set prototype of", () => {
        class Prototype {
        }

        Object.defineProperty(resolve(MOCK_OPTIONS), "target", {value: () => undefined});
        resolve(SetPrototypeOfTrap)
            .intercept.withArgs(Prototype.prototype).and.returnValue(true);

        const interceptor = resolve(ProxyFactory);
        const object = interceptor.object();
        Object.setPrototypeOf(object, Prototype.prototype);

        expect(resolve(SetPrototypeOfTrap).intercept).toHaveBeenCalledWith(Prototype.prototype);
    });

    it("Traps set prototype of with false", () => {
        class Prototype {
        }

        Object.defineProperty(resolve(MOCK_OPTIONS), "target", {value: () => undefined});
        resolve(SetPrototypeOfTrap)
            .intercept.withArgs(Prototype.prototype).and.returnValue(false);

        const interceptor = resolve(ProxyFactory);
        const object = interceptor.object();

        expect(() => {
            Object.setPrototypeOf(object, Prototype.prototype);
        }).toThrow(jasmine.any(TypeError));
    });

    it("Returns object that typeof is typeof of provided target", () => {
        class Prototype {
        }

        Object.defineProperty(resolve(MOCK_OPTIONS), "target", {value: Prototype});

        resolve(GetPrototypeOfTrap)
            .intercept.and.returnValue(Prototype.prototype);

        const interceptor = resolve(ProxyFactory);
        const object = interceptor.object();

        expect(typeof object).toBe(typeof Prototype);
        expect(object instanceof Prototype).toBe(true);
    });
});
