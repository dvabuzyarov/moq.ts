import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { POJOMatcher } from "./pojo.matcher";
import { ObjectMapProvider } from "./object-map.provider";
import { MapMatcher } from "./map.matcher";

describe("POJO matcher", () => {

    beforeEach(() => {
        createInjector(POJOMatcher, [MapMatcher, ObjectMapProvider]);
    });

    it("Returns true", () => {
        const left = {};
        const right = {};
        const leftMap = new Map();
        const rightMap = new Map();

        resolveMock(ObjectMapProvider)
            .setup(instance => instance.get(left))
            .returns(leftMap);
        resolveMock(ObjectMapProvider)
            .setup(instance => instance.get(right))
            .returns(rightMap);
        resolveMock(MapMatcher)
            .setup(instance => instance.matched(leftMap, rightMap))
            .returns(true);

        const provider = resolve2(POJOMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false", () => {
        const left = {};
        const right = {};
        const leftMap = new Map();
        const rightMap = new Map();

        resolveMock(ObjectMapProvider)
            .setup(instance => instance.get(left))
            .returns(leftMap);
        resolveMock(ObjectMapProvider)
            .setup(instance => instance.get(right))
            .returns(rightMap);
        resolveMock(MapMatcher)
            .setup(instance => instance.matched(leftMap, rightMap))
            .returns(false);

        const provider = resolve2(POJOMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });
});
