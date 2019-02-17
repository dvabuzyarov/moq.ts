import { InvocableFactory } from "./invocable.factory";

describe("Invocable factory", () => {

    it("Returns predicate that returns true", () => {
        const factory = new InvocableFactory();
        const actual = factory.get();

        expect(actual()).toBe(true);
    });

    it("Returns provided predicate", () => {
        const predicate = jasmine.createSpy();

        const factory = new InvocableFactory();
        factory.set(predicate);
        const actual = factory.get();

        expect(actual).toBe(predicate);
    });
});
