import { resolveBuilder } from "../tests.components/resolve.builder";
import { MockOptionsBuilder } from "./mock-options.builder";

describe("Mock options builder", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    function get(): MockOptionsBuilder {
        resolve = resolveBuilder([]);
        return new MockOptionsBuilder();
    }

    it("Returns options with default target", () => {
        const builder = get();
        const actual = builder.build({});

        expect(actual.target).toBeDefined();
    });

    it("Returns options with preserved values", () => {
        class Target {
        }

        const name = "name";

        const builder = get();
        const target = new Target();
        const actual = builder.build({target, name});

        expect(actual).toEqual({target, name});
    });
});
