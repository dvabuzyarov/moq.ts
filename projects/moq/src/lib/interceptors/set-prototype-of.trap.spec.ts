import { PrototypeStorage } from "./prototype.storage";
import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { SetPrototypeOfTrap } from "./set-prototype-of.trap";

describe("Set prototype of trap", () => {
    beforeEach(() => {
        const prototypeStorage = jasmine.createSpyObj<PrototypeStorage>("", ["set"]);
        createInjector([
            {provide: PrototypeStorage, useValue: prototypeStorage, deps: []},
            {provide: SetPrototypeOfTrap, useClass: SetPrototypeOfTrap, deps: [PrototypeStorage]},
        ]);
    });

    it("Sets prototype", () => {
        class Prototype {
        }

        const trap = resolve(SetPrototypeOfTrap);
        const actual = trap.intercept(Prototype.prototype);

        expect(actual).toBe(true);
        expect(resolve(PrototypeStorage).set).toHaveBeenCalledWith(Prototype.prototype);
    });

    it("Does not set undefined prototype", () => {
        const trap = resolve(SetPrototypeOfTrap);
        const actual = trap.intercept(undefined);

        expect(actual).toBe(false);
        expect(resolve(PrototypeStorage).set).not.toHaveBeenCalled();
    });
});
