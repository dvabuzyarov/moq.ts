import { resolveBuilder } from "../../tests.components/resolve.builder";
import { IteratorMatcher } from "./iterator.matcher";
import { POJOMatcher } from "./pojo.matcher";
import { PropertyIterator } from "./property.iterator";
import { PropertyValue } from "./property.value";

describe("POJO matcher", () => {

    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const iteratorMatcher = jasmine.createSpyObj<IteratorMatcher>("", ["matched"]);
        const propertyIterator = jasmine.createSpyObj<PropertyIterator>("", ["iterate"]);

        resolve = resolveBuilder([
            [IteratorMatcher, iteratorMatcher],
            [PropertyIterator, propertyIterator],
            [POJOMatcher, new POJOMatcher(iteratorMatcher, propertyIterator)]
        ]);
    });

    it("Returns true", () => {
        const left = {};
        const right = {};

        function* leftProps() {
            yield new PropertyValue("name", 1);
        }

        function* rightProps() {
            yield new PropertyValue("name", 1);
        }

        resolve(PropertyIterator)
            .iterate.withArgs(left).and.returnValue(leftProps());
        resolve(PropertyIterator)
            .iterate.withArgs(right).and.returnValue(rightProps());
        resolve(IteratorMatcher)
            .matched.withArgs(leftProps(), rightProps()).and.returnValue(true);

        const provider = resolve(POJOMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false", () => {
        const left = {};
        const right = {};

        function* leftProps() {
            yield new PropertyValue("name", 1);
        }

        function* rightProps() {
            yield new PropertyValue("name", 1);
        }

        resolve(PropertyIterator)
            .iterate.withArgs(left).and.returnValue(leftProps());
        resolve(PropertyIterator)
            .iterate.withArgs(right).and.returnValue(rightProps());
        resolve(IteratorMatcher)
            .matched.withArgs(leftProps(), rightProps()).and.returnValue(false);

        const provider = resolve(POJOMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });
});
