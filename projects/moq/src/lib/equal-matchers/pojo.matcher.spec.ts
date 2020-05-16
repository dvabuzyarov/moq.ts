import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { POJOMatcher } from "./pojo.matcher";
import { ObjectMapProvider } from "./object-map.provider";
import { MapMatcher } from "./map.matcher";

describe("POJO matcher", () => {
    beforeEach(() => {
        const objectMapProvider = jasmine.createSpyObj<ObjectMapProvider>("", ["get"]);
        const mapMatcher = jasmine.createSpyObj<MapMatcher>("", ["matched"]);

        createInjector([
            {provide: ObjectMapProvider, useValue: objectMapProvider, deps: []},
            {provide: MapMatcher, useValue: mapMatcher, deps: []},
            {provide: POJOMatcher, useClass: POJOMatcher, deps: [MapMatcher, ObjectMapProvider]},
        ]);
    });

    it("Returns true", () => {
        const left = {};
        const right = {};
        const leftMap = new Map();
        const rightMap = new Map();

        resolve(ObjectMapProvider)
            .get.withArgs(left).and.returnValue(leftMap);
        resolve(ObjectMapProvider)
            .get.withArgs(right).and.returnValue(rightMap);
        resolve(MapMatcher)
            .matched.withArgs(leftMap, rightMap).and.returnValue(true);

        const provider = resolve(POJOMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false", () => {
        const left = {};
        const right = {};
        const leftMap = new Map();
        const rightMap = new Map();

        resolve(ObjectMapProvider)
            .get.withArgs(left).and.returnValue(leftMap);
        resolve(ObjectMapProvider)
            .get.withArgs(right).and.returnValue(rightMap);
        resolve(MapMatcher)
            .matched.withArgs(leftMap, rightMap).and.returnValue(false);

        const provider = resolve(POJOMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });
});
