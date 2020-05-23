import { IMockOptions } from "../moq";
import { equalMatchersProviders } from "../equal-matchers/equal-matchers.providers";
import { OBJECT_MATCHERS } from "../equal-matchers/object-matchers.injection-token";
import { DateMatcher } from "../equal-matchers/date.matcher";
import { MapMatcher } from "../equal-matchers/map.matcher";
import { IteratorMatcher } from "../equal-matchers/iterator.matcher";
import { POJOMatcher } from "../equal-matchers/pojo.matcher";
import { DefaultInjectorConfig } from "./default-injector.config";
import { StaticProvider } from "../static.injector";

/**
 * Provides the configuration for Angular based injector that would use equal logic for matching values.
 * By default, all values are matched with
 * [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
 * that is limited in matching objects. On the other hand developers are using so called "deep equal comparison" approach,
 * where objects are matched by its properties and values. This configuration changes the way how expressions are matched
 * and introduce deep equal comparison logic as well as an extension point for custom matchers.
 *
 * ```typescript
 *  import { EqualMatchingInjectorConfig, Mock } from "moq.ts";
 *
 *  const mock = new Mock<(args: number[]) => number>()
 *  .setup(instance => instance([2, 1]))
 *  .returns(2);
 *
 *  const object = mock.object();
 *
 *  const actual = object([2, 1]);
 *
 *  // since the default comparisons logic sees [2, 1] and [2, 1] as different objects the provided setup would not work
 *  expect(actual).toBe(undefined);
 *  ```
 *  and compare with
 *  ```typescript
 *  import { EqualMatchingInjectorConfig, Mock } from "moq.ts";
 *
 *  const mock = new Mock<(args: number[]) => number>({injectorConfig: new EqualMatchingInjectorConfig()})
 *  .setup(instance => instance([2, 1]))
 *  .returns(2);
 *
 *  const object = mock.object();
 *
 *  const actual = object([2, 1]);
 *
 *  expect(actual).toBe(2);
 *  ```
 *  Internally the equal comparision logic implemented as a collection of object matchers that implement {@link IObjectMatcher} interface.
 *
 *  Matchers with the most specific logic should come first in the collection and if they are not able to match the objects
 *  then more general matchers would be invoked.
 *
 *  The library comes with the following matchers:
 *  0. Custom matchers
 *  1. DateMatcher - matches [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects
 *  2. MapMatcher - matches [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) objects
 *  3. IteratorMatcher - matches objects that supports
 *  [Iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
 *  4. POJOMatcher - as the last resort matches objects as [POJO](https://en.wikipedia.org/wiki/Plain_old_Java_object) objects.
 *
 *  if you need a custom matcher it will come at index 1. Here is an example of a custom matcher that matches Moment and Date objects.
 *  ```typescript
 *  import { EqualMatchingInjectorConfig, IObjectMatcher, Mock, OBJECT_MATCHERS } from "moq.ts";
 *  import { isMoment, utc } from "moment";
 *
 *  class MomentDateMatcher implements IObjectMatcher {
 *     matched<T extends object>(left: T, right: T): boolean | undefined {
 *         if (left instanceof Date && isMoment(right)) {
 *             return left.valueOf() === right.valueOf();
 *         }
 *         return undefined;
 *     }
 * }
 *
 *  const moment = utc(1);
 *  const injectorConfig = new EqualMatchingInjectorConfig([{
 *     provide: OBJECT_MATCHERS,
 *     useClass: MomentDateMatcher,
 *     multi: true,
 *     deps: []
 * }]);
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
 *  The matching logic of EqualMatchingInjectorConfig supports {@link It}.
 *  So you can do a partial comparision.
 *  ```typescript
 *  import { EqualMatchingInjectorConfig, It, Mock } from "moq.ts";
 *
 *  const func = () => undefined;
 *
 *  const injectorConfig = new EqualMatchingInjectorConfig();
 *  const mock = new Mock<(args: any) => number>({injectorConfig})
 *  .setup(instance => instance({func: It.IsAny()})) // <-- func property will be matched with It delegate
 *  .returns(2);
 *
 *  const object = mock.object();
 *
 *  const actual = object({func});
 *
 *  expect(actual).toBe(2);
 *  ```
 */
export class EqualMatchingInjectorConfig extends DefaultInjectorConfig {
    constructor(private matchers: StaticProvider[] = []) {
        super();
    }

    get(options: IMockOptions<unknown>, providers: StaticProvider[]): StaticProvider[] {
        return [
            ...super.get(options, providers),
            ...equalMatchersProviders,
            ...this.matchers,
            {provide: OBJECT_MATCHERS, useClass: DateMatcher, multi: true, deps: []},
            {provide: OBJECT_MATCHERS, useExisting: MapMatcher, multi: true, deps: []},
            {provide: OBJECT_MATCHERS, useExisting: IteratorMatcher, multi: true, deps: []},
            {provide: OBJECT_MATCHERS, useExisting: POJOMatcher, multi: true, deps: []},
        ];
    }
}
