import { IteratorMatcher } from "./iterator.matcher";
import { PropertyIterator } from "./property.iterator";

/**
 * @hidden
 */
export class POJOMatcher {
    constructor(private iteratorMatcher = new IteratorMatcher(),
                private propertyIterator = new PropertyIterator()) {
    }

    public matched<T extends Object>(left: T, right: T): boolean {
        return this.iteratorMatcher.matched(this.propertyIterator.iterate(left), this.propertyIterator.iterate(right));
    }
}
