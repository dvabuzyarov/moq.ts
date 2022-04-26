import { GetPropertyExpression, FunctionExpression } from "../reflector/expressions";
import { SequenceId } from "./sequence-id";
import { Tracker } from "./tracker";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { PlayTimes } from "moq.ts";

describe("Mock tracker", () => {
    beforeEach(() => {
        createInjector(Tracker, [SequenceId]);
    });

    it("Returns log of intercepted operations in historical order", () => {
        resolveMock(SequenceId)
            .setup(instance => instance.next())
            .play(PlayTimes.Once())
            .returns(2)
            .setup(instance => instance.next())
            .play(PlayTimes.Once())
            .returns(1);

        const tracker = resolve2(Tracker);
        const action1 = new FunctionExpression([]);
        const action2 = new GetPropertyExpression("property name");

        tracker.add(action1);
        tracker.add(action2);

        const actual = tracker.get();
        expect(actual).toEqual([{id: 1, expression: action1}, {id: 2, expression: action2}]);
    });
});
