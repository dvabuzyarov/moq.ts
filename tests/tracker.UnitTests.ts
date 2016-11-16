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

    it('Replaces GetPropertyInfo with NamedMethodCall', ()=> {
        const tracker = new Tracker();
        const getPropertyInfo = new GetPropertyExpression('property name');
        const namedMethodInfo = new NamedMethodExpression('property name', []);

        tracker.add(getPropertyInfo);
        tracker.addNamedMethod(namedMethodInfo, getPropertyInfo);

        const actual = tracker.get();
        expect(actual).toEqual([namedMethodInfo]);
    });

});