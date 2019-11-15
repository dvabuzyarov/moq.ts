import { Mock } from "../lib/mock";
import { It } from "../lib/expected-expressions/expression-predicates";
import { NamedMethodInteraction } from "../lib/interactions";

describe("Mimics preset", () => {
    it("Mimics property read interaction", () => {
        const value = 0;

        class Origin {
            public func(): boolean {
                throw new Error("Not Implemented");
            }
        }

        const mock1 = new Mock<typeof Function>();
        const mock = new Mock<Origin>();
        mock1
            .setup(instance => It.IsAny())
            // .mock(mock => mock
            //     .setup(instance))
            .callback((...args) => mock.tracker.add(new NamedMethodInteraction("func", args)));
        mock
            .setup(instance => It.IsAny())
            .returns(mock1.object());

        const actual = mock.object().func();
        expect(actual).toBe(undefined);
        mock.verify(instance => instance.func());
        mock1.verify(instance => instance());
    });
});
