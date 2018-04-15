import { SequenceId } from "../lib/sequence-id";

describe("Sequence id provider", () => {

    it("Returns sequence id based on timestamp", () => {
        const provider = new SequenceId();
        const actual1 = provider.next();
        const actual2 = provider.next();

        expect(actual1 < actual2).toBe(true);
    });
});
