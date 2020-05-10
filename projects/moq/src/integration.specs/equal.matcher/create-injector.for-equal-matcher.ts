import { equalMatchersProviders } from "../../lib/equal-matchers/equal-matchers.providers";
import { OBJECT_MATCHERS } from "../../lib/equal-matchers/object-matchers.injection-token";
import { DateMatcher } from "../../lib/equal-matchers/date.matcher";
import { IteratorMatcher } from "../../lib/equal-matchers/iterator.matcher";
import { POJOMatcher } from "../../lib/equal-matchers/pojo.matcher";
import { MapMatcher } from "../../lib/equal-matchers/map.matcher";
import { createInjector } from "../../tests.components/resolve.builder";

export function createInjectorForEqualMatcher() {
    const providers = [
        ...equalMatchersProviders,
        {provide: OBJECT_MATCHERS, useClass: DateMatcher, multi: true, deps: []},
        {provide: OBJECT_MATCHERS, useExisting: MapMatcher, multi: true, deps: []},
        {provide: OBJECT_MATCHERS, useExisting: IteratorMatcher, multi: true, deps: []},
        {provide: OBJECT_MATCHERS, useExisting: POJOMatcher, multi: true, deps: []},
    ];
    createInjector(providers);
}
