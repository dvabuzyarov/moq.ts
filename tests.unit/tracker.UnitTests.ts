import {Tracker} from '../lib/tracker';
import {MethodExpression, GetPropertyExpression, NamedMethodExpression} from '../lib/expressions';

describe('Mock tracker', () => {

    it('Returns log of intercepted operations in historical order', ()=> {
        const tracker = new Tracker();
        const action1 = new MethodExpression([]);
        const action2 = new GetPropertyExpression('property name');

        tracker.add(action1);
        tracker.add(action2);

        const actual = tracker.get();
        expect(actual).toEqual([action1, action2]);
    });

});