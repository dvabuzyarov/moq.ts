import { PrototypeStorage } from "./prototype.storage";
import { resolveBuilder } from "../../tests.components/resolve.builder";
import { SetPrototypeOfTrap } from "./set-prototype-of.trap";

describe("Set prototype of trap", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    function get(): SetPrototypeOfTrap {
        const prototypeStorage = {} as PrototypeStorage;
        resolve = resolveBuilder([
            [PrototypeStorage, prototypeStorage],
        ]);
        return new SetPrototypeOfTrap(prototypeStorage);
    }

    it("Sets prototype", () => {
        class Prototype {
        }

        const trap = get();
        const actual = trap.intercept(Prototype.prototype);

        expect(actual).toBe(true);
        expect(resolve(PrototypeStorage).prototype).toBe(Prototype.prototype);
    });

    it("Does not set undefined prototype", () => {
        const trap = get();
        const actual = trap.intercept(undefined);

        expect(actual).toBe(false);
        expect(resolve(PrototypeStorage).prototype).toBe(undefined);
    });
});
