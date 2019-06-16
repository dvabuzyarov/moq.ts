import { PrototypeStorage } from "./prototype.storage";
import { resolveBuilder } from "../../tests.components/resolve.builder";
import { GetPrototypeOfTrap } from "./get-prototype-of.trap";

describe("Get prototype of trap", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    function get(): GetPrototypeOfTrap {
        const prototypeStorage = {} as PrototypeStorage;
        resolve = resolveBuilder([
            [PrototypeStorage, prototypeStorage],
        ]);
        return new GetPrototypeOfTrap(prototypeStorage);
    }

    it("Returns prototype", () => {
        class Prototype {
        }

        const trap = get();
        resolve(PrototypeStorage)
            .prototype = Prototype.prototype;

        const actual = trap.intercept();

        expect(actual).toBe(Prototype.prototype);
    });
});
