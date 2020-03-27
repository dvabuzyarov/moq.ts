import { Interceptor } from "./interceptor";
import { resolveBuilder } from "../tests.components/resolve.builder";
import { GetTrap } from "./traps/get.trap";
import { SetTrap } from "./traps/set.trap";
import { ApplyTrap } from "./traps/apply.trap";
import { GetPrototypeOfTrap } from "./traps/get-prototype-of.trap";
import { SetPrototypeOfTrap } from "./traps/set-prototype-of.trap";
import { HasTrap } from "./traps/has.trap";

describe("Mock interceptor", () => {

    let resolve: ReturnType<typeof resolveBuilder>;

    function get(target: any = () => undefined, mockName?: string): Interceptor<any> {
        const getTrap = jasmine.createSpyObj<GetTrap>("", ["intercept"]);
        const setTrap = jasmine.createSpyObj<SetTrap>("", ["intercept"]);
        const hasTrap = jasmine.createSpyObj<HasTrap>("", ["intercept"]);
        const applyTrap = jasmine.createSpyObj<ApplyTrap>("", ["intercept"]);
        const getPrototypeOfTrap = jasmine.createSpyObj<GetPrototypeOfTrap>("", ["intercept"]);
        const setPrototypeOfTrap = jasmine.createSpyObj<SetPrototypeOfTrap>("", ["intercept"]);

        resolve = resolveBuilder([
            [GetTrap, getTrap],
            [SetTrap, setTrap],
            [HasTrap, hasTrap],
            [ApplyTrap, applyTrap],
            [GetPrototypeOfTrap, getPrototypeOfTrap],
            [SetPrototypeOfTrap, setPrototypeOfTrap],
        ]);
        return new Interceptor<any>(target, mockName, getTrap, setTrap, hasTrap, applyTrap, getPrototypeOfTrap, setPrototypeOfTrap);
    }

    it("Returns proxy object", () => {
        const interceptor = get();
        const actual = interceptor.object();

        expect(actual).not.toBeUndefined();
    });

    it("Returns the same proxy object", () => {
        const interceptor = get();
        const first = interceptor.object();
        const second = interceptor.object();

        expect(first === second).toBe(true);
    });

    it("Traps get", () => {
        const name = "some_property_name";
        const value = {};
        const target = () => undefined;

        const interceptor = get(target);
        resolve(GetTrap)
            .intercept.withArgs(name).and.returnValue(value);

        const object = interceptor.object();
        const actual = object[name];

        expect(actual).toBe(value);
    });

    it("Traps set", () => {
        const name = "some_property_name";
        const value = {};
        const target = () => undefined;

        const interceptor = get(target);
        resolve(SetTrap)
            .intercept.withArgs(target, name, value).and.returnValue(true);

        const object = interceptor.object();
        const actual = object[name] = value;

        expect(actual).toBe(value);
    });

    it("Traps set with false", () => {
        const name = "some_property_name";
        const value = {};
        const target = () => undefined;

        const interceptor = get(target);
        resolve(SetTrap)
            .intercept.withArgs(target, name, value).and.returnValue(false);

        const object = interceptor.object();
        expect(() => {
            object[name] = value;
        }).toThrow(jasmine.any(TypeError));
    });

    it("Traps has", () => {
        const name = "some_property_name";
        const value = true;
        const target = () => undefined;

        const interceptor = get(target);
        resolve(HasTrap)
            .intercept.withArgs(name).and.returnValue(value);

        const object = interceptor.object();
        const actual = name in object;

        expect(actual).toBe(value);
    });

    it("Traps apply", () => {
        const arg = "argument";
        const value = {};
        const target = () => undefined;

        const interceptor = get(target);
        resolve(ApplyTrap)
            .intercept.withArgs(target, undefined, [arg]).and.returnValue(value);
        const object = interceptor.object();

        const actual = object(arg);

        expect(actual).toBe(value);
    });

    it("Traps get prototype of", () => {
        class Prototype {
        }

        const interceptor = get();
        resolve(GetPrototypeOfTrap)
            .intercept.withArgs().and.returnValue(Prototype.prototype);

        const object = interceptor.object();

        expect(object instanceof Prototype).toBe(true);
    });

    it("Traps set prototype of", () => {
        class Prototype {
        }

        const interceptor = get();
        resolve(SetPrototypeOfTrap)
            .intercept.withArgs(Prototype.prototype).and.returnValue(true);

        const object = interceptor.object();
        Object.setPrototypeOf(object, Prototype.prototype);

        expect(resolve(SetPrototypeOfTrap).intercept).toHaveBeenCalledWith(Prototype.prototype);
    });

    it("Traps set prototype of with false", () => {
        class Prototype {
        }

        const interceptor = get();
        resolve(SetPrototypeOfTrap)
            .intercept.withArgs(Prototype.prototype).and.returnValue(false);

        const object = interceptor.object();

        expect(() => {
            Object.setPrototypeOf(object, Prototype.prototype);
        }).toThrow(jasmine.any(TypeError));
    });

    it("Returns object that typeof is typeof of provided target", () => {
        class Prototype {
        }

        const interceptor = get(Prototype);
        resolve(GetPrototypeOfTrap)
            .intercept.and.returnValue(Prototype.prototype);

        const object = interceptor.object();

        expect(typeof object).toBe(typeof Prototype);
        expect(object instanceof Prototype).toBe(true);
    });
});
