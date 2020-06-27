import { PrototypeStorage } from "./prototype.storage";

describe("Prototype storage", () => {

    it("Returns initial value", () => {
        const target = () => undefined;
        const storage = new PrototypeStorage(target);
        const actual = storage.get();

        expect(actual).toBe(target);
    });

    it("Returns initial value of class prototype", () => {
        class Target {

        }

        const storage = new PrototypeStorage(Target);
        const actual = storage.get();

        expect(actual).toBe(Target.prototype);
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
