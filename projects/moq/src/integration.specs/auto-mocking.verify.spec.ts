/*eslint-disable max-classes-per-file*/
import { Mock } from "../lib/mock";

describe("Auto mocking verify", () => {

    it("Verifies a deep expression", () => {
        const mock = new Mock<{ shallow: { deep: string } }>()
            .setup(instance => instance.shallow.deep)
            .returns(undefined);

        const actual = mock.object().shallow.deep;
        mock.verify(instance => instance.shallow.deep);
    });

    it("Throws when deep member is not interacted", () => {
        const mock = new Mock<{ shallow: { deep: string } }>()
            .setup(instance => instance.shallow.deep)
            .returns(undefined);

        const actual = mock.object().shallow;
        expect(() => mock.verify(instance => instance.shallow.deep)).toThrow();
    });

    it("Throws when shallow member is not interacted", () => {
        const mock = new Mock<{ shallow: { deep: string } }>()
            .setup(instance => instance.shallow.deep)
            .returns(undefined);

        expect(() => mock.verify(instance => instance.shallow.deep)).toThrow();
    });
});
