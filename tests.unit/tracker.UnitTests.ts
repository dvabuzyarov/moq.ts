import { GetPropertyExpression, MethodExpression } from "../lib/expressions";
import { SequenceId } from "../lib/sequence-id";
import { Tracker } from "../lib/tracker";
import { getName } from "./getName";

describe("Mock tracker", () => {

    it("Returns log of intercepted operations in historical order", () => {
        const sequenceId = jasmine.createSpyObj("sequenceIdProvider",
            [getName<SequenceId>(instance => instance.next)]);
        (<jasmine.Spy>sequenceId.next).and.returnValues(1, 2);

        const tracker = new Tracker(sequenceId);
        const action1 = new MethodExpression([]);
        const action2 = new GetPropertyExpression("property name");

        tracker.add(action1);
        tracker.add(action2);

        const actual = tracker.get();
        expect(actual).toEqual([{id: 1, expression: action1}, {id: 2, expression: action2}]);
    });

});
