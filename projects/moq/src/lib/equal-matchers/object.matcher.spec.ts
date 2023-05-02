import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { ObjectMatcher } from "./object.matcher";
import { OBJECT_MATCHERS } from "./object-matchers.injection-token";
import { It, Mock } from "moq.ts";
import { IObjectMatcher } from "./object-matcher.type";

describe("Object matcher", () => {

    beforeEach(() => {
        createInjector(ObjectMatcher, [OBJECT_MATCHERS]);
    });

    it("Returns true when compared values are null", () => {
        const left = null;
        const right = null;

        const provider = resolve2(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when compared values is the same", () => {
        const left = {};
        const right = left;

        const provider = resolve2(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left is null and right is not", () => {
        const left = null;
        const right = undefined;

        const provider = resolve2(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when left is not null and right is", () => {
        const left = undefined;
        const right = null;

        const provider = resolve2(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when all matchers return undefined", () => {
        const left = {};
        const right = {};

        const firstMatcher = new Mock<IObjectMatcher>()
            .setup(instance => instance.matched(left, right))
            .returns(undefined)
            .object();
        const secondMatcher = new Mock<IObjectMatcher>()
            .setup(instance => instance.matched(left, right))
            .returns(undefined)
            .object();
        resolveMock(OBJECT_MATCHERS)
            .setup(It.IsAny())
            .mimics([firstMatcher, secondMatcher]);

        const provider = resolve2(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when the first matcher returns false", () => {
        const left = {};
        const right = {};

        const firstMatcher = new Mock<IObjectMatcher>()
            .setup(instance => instance.matched(left, right))
            .returns(false)
            .object();
        const secondMatcher = new Mock<IObjectMatcher>()
            .setup(instance => instance.matched(left, right))
            .returns(true)
            .object();
        resolveMock(OBJECT_MATCHERS)
            .setup(It.IsAny())
            .mimics([firstMatcher, secondMatcher]);

        const provider = resolve2(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns true when the first matcher returns true", () => {
        const left = {};
        const right = {};

        const firstMatcher = new Mock<IObjectMatcher>()
            .setup(instance => instance.matched(left, right))
            .returns(true)
            .object();
        const secondMatcher = new Mock<IObjectMatcher>()
            .setup(instance => instance.matched(left, right))
            .returns(false)
            .object();
        resolveMock(OBJECT_MATCHERS)
            .setup(It.IsAny())
            .mimics([firstMatcher, secondMatcher]);

        const provider = resolve2(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when the second matcher returns false", () => {
        const left = {};
        const right = {};

        const firstMatcher = new Mock<IObjectMatcher>()
            .setup(instance => instance.matched(left, right))
            .returns(undefined)
            .object();
        const secondMatcher = new Mock<IObjectMatcher>()
            .setup(instance => instance.matched(left, right))
            .returns(false)
            .object();
        resolveMock(OBJECT_MATCHERS)
            .setup(It.IsAny())
            .mimics([firstMatcher, secondMatcher]);

        const provider = resolve2(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns true when the second matcher returns true", () => {
        const left = {};
        const right = {};

        const firstMatcher = new Mock<IObjectMatcher>()
            .setup(instance => instance.matched(left, right))
            .returns(undefined)
            .object();
        const secondMatcher = new Mock<IObjectMatcher>()
            .setup(instance => instance.matched(left, right))
            .returns(true)
            .object();
        resolveMock(OBJECT_MATCHERS)
            .setup(It.IsAny())
            .mimics([firstMatcher, secondMatcher]);

        const provider = resolve2(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

});
