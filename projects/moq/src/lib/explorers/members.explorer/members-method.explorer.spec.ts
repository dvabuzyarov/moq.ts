import { resolveBuilder } from "../../../tests.components/resolve.builder";
import { PrototypeStorage } from "../../traps/prototype.storage";
import { MembersMethodExplorer } from "./members-method.explorer";

describe("Members method explorer", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const prototypeStorage = jasmine.createSpyObj<PrototypeStorage>(["get"]);
        resolve = resolveBuilder([
            [PrototypeStorage, prototypeStorage]
        ]);
    });

    it("Returns false when there is no prototype", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue(null);

        const explorer = new MembersMethodExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(false);
    });

    it("Returns false when prototype is undefined", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue(undefined);

        const explorer = new MembersMethodExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(false);
    });

    it("Returns true when there is a method", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue({name: () => undefined});

        const explorer = new MembersMethodExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(true);
    });

    it("Returns true when there is a method in prototype chain", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue(Object.create({name: () => undefined}));

        const explorer = new MembersMethodExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(true);
    });

    it("Returns false when there is a get property", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue({
            get name() {
                throw new Error("Not Implemented");
            }
        });

        const explorer = new MembersMethodExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(false);
    });

    it("Returns false when there is no method with this name", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue({name1: () => undefined});

        const explorer = new MembersMethodExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(false);
    });

    it("Returns false when there is no method", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue({});

        const explorer = new MembersMethodExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(false);
    });
});
