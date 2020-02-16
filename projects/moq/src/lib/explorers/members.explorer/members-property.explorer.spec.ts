import { MembersPropertyExplorer } from "./members-property.explorer";
import { resolveBuilder } from "../../../tests.components/resolve.builder";
import { PrototypeStorage } from "../../traps/prototype.storage";

describe("Members property explorer", () => {
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

        const explorer = new MembersPropertyExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasProperty(name);

        expect(actual).toBe(false);
    });

    it("Returns false when prototype is undefined", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue(undefined);

        const explorer = new MembersPropertyExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasProperty(name);

        expect(actual).toBe(false);
    });

    it("Returns true when there is a property", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue({name});

        const explorer = new MembersPropertyExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasProperty(name);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no property with this name", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue({});

        const explorer = new MembersPropertyExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasProperty(name);

        expect(actual).toBe(false);
    });

    it("Returns false when there is a method with the same name", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue({name: () => undefined});

        const explorer = new MembersPropertyExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasProperty(name);

        expect(actual).toBe(false);
    });

    it("Returns true when there is get property", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue({
            get name() {
                throw new Error("Not Implemented");
            }
        });

        const explorer = new MembersPropertyExplorer(resolve(PrototypeStorage));
        const actual = explorer.hasProperty(name);

        expect(actual).toBe(true);
    });
});
