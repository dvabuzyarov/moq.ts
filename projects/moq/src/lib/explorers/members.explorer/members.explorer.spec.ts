import { MembersExplorer } from "./members.explorer";

describe("Members explorer", () => {

    it("Returns true when there is a property", () => {
        const name = "name";

        const explorer = new MembersExplorer([{name, type: "property"}]);
        const actual = explorer.hasProperty(name);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no property with this name", () => {
        const name = "name";

        const explorer = new MembersExplorer([{name: "some name", type: "property"}]);
        const actual = explorer.hasProperty(name);

        expect(actual).toBe(false);
    });

    it("Returns false when there is no property", () => {
        const name = "name";

        const explorer = new MembersExplorer([{name, type: "method"}]);
        const actual = explorer.hasProperty(name);

        expect(actual).toBe(false);
    });

    it("Returns true when there is a method", () => {
        const name = "name";

        const explorer = new MembersExplorer([{name, type: "method"}]);
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no method with this name", () => {
        const name = "name";

        const explorer = new MembersExplorer([{name: "some name", type: "method"}]);
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(false);
    });

    it("Returns false when there is no method", () => {
        const name = "name";

        const explorer = new MembersExplorer([{name, type: "property"}]);
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(false);
    });

});
