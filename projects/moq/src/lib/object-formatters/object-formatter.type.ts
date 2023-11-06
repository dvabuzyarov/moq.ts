/**
 *  A custom formatter should implement this interface and be registered with EqualMatchingInjectorConfig.
 *
 *  @return undefined if the formatter is not intended to format the object of such type, otherwise returns a string.
 *
 *  ``` typescript
 *  // A custom matcher that matches Moment and Date objects
 *  import { EqualMatchingInjectorConfig, IObjectMatcher, Mock, OBJECT_MATCHERS } from "moq.ts";
 *  import { isMoment, utc } from "moment";
 *
 *  class MomentDateMatcher implements IObjectMatcher {
 *      matched<T extends object>(left: T, right: T): boolean | undefined {
 *          if (left instanceof Date && isMoment(right)) {
 *              return left.valueOf() === right.valueOf();
 *          }
 *          return undefined;
 *      }
 *  }
 *
 *  const moment = utc(1);
 *  const injectorConfig = new EqualMatchingInjectorConfig([{
 *      provide: OBJECT_MATCHERS,
 *      useClass: MomentDateMatcher,
 *      multi: true,
 *      deps: []
 *  }]);
 *
 *  const mock = new Mock<(args: any) => number>({injectorConfig})
 *  .setup(instance => instance(moment))
 *  .returns(2);
 *
 *  const object = mock.object();
 *
 *  const actual = object(new Date(1));
 *
 *  expect(actual).toBe(2);
 *  ```
 */
export interface IObjectFormatter {
    /*eslint-disable-next-line @typescript-eslint/ban-types*/
    format<T>(instance: T | undefined | null): string | undefined;
}
