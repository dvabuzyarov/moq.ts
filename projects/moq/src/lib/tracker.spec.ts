import { GetPropertyExpression, MethodExpression } from "./expressions";
import { SequenceId } from "./sequence-id";
import { Tracker } from "./tracker";
import { nameof } from "./nameof";

describe("Mock tracker", () => {

    it("Returns log of intercepted operations in historical order", () => {
        const sequenceId = jasmine.createSpyObj("sequenceIdProvider",
            [nameof<SequenceId>("next")]);
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
