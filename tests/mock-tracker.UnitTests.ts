import lastOrUndefined = ts.lastOrUndefined;
import {MockTracker} from '../lib/mock-tracker';
import {MethodInfo, GetPropertyInfo, NamedMethodInfo} from '../lib/expression-reflector';

describe('Mock tracker', () => {

    it('Returns log of intercepted operations in historical order', ()=> {
        const tracker = new MockTracker();
        const action1 = new MethodInfo([]);
        const action2 = new GetPropertyInfo('property name');

        tracker.add(action1);
        tracker.add(action2);

        const actual = tracker.get();
        expect(actual).toEqual([action1, action2]);
    });

    it('Replaces GetPropertyInfo with NamedMethodCall', ()=> {
        const tracker = new MockTracker();
        const getPropertyInfo = new GetPropertyInfo('property name');
        const namedMethodInfo = new NamedMethodInfo('property name', []);

        tracker.add(getPropertyInfo);
        tracker.addNamedMethodInfo(namedMethodInfo, getPropertyInfo);

        const actual = tracker.get();
        expect(actual).toEqual([namedMethodInfo]);
    });

});