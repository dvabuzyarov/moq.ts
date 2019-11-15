import { PrototypeStorage } from "./prototype.storage";

describe("Prototype storage", () => {

    it("Returns initial value", () => {
        const storage = new PrototypeStorage(() => undefined);
        const actual = storage.get();

        expect(actual).toBe(Object.getPrototypeOf(() => undefined));
    });

    it("Returns the last value", () => {
        class Target {

        }

        const storage = new PrototypeStorage(() => undefined);
        storage.set(Target.prototype);
        const actual = storage.get();

        expect(actual).toBe(Target.prototype);
    });
});
