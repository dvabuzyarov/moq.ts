import { PrototypeStorage } from "./prototype.storage";
import { createInjectorFromProviders, resolve } from "../../tests.components/resolve.builder";
import { GetPrototypeOfTrap } from "./get-prototype-of.trap";

describe("Get prototype of trap", () => {

    beforeEach(() => {
        const prototypeStorage = jasmine.createSpyObj<PrototypeStorage>("", ["get"]);
        createInjectorFromProviders([
            {provide: PrototypeStorage, useValue: prototypeStorage, deps: []},
            {provide: GetPrototypeOfTrap, useClass: GetPrototypeOfTrap, deps: [PrototypeStorage]},
        ]);
    });

    it("Returns prototype", () => {
        class Prototype {
        }

        resolve(PrototypeStorage)
            .get.and.returnValue(Prototype.prototype);

        const trap = resolve(GetPrototypeOfTrap);
        const actual = trap.intercept();

        expect(actual).toBe(Prototype.prototype);
    });
});
