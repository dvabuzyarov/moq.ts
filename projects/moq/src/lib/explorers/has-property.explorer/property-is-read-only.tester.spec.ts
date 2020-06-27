import { createInjector, resolve } from "../../../tests.components/resolve.builder";
import { PrototypeStorage } from "../../interceptors/prototype.storage";
import { REFLECT_HAS } from "../reflect-has.injection-token";
import { PropertyIsReadOnlyTester } from "./property-is-read-only.tester";
import { PropertyDescriptorProvider } from "../members.explorer/property-descriptor.provider";

describe("Property is read only tester", () => {
    beforeEach(() => {
        const prototypeStorage = jasmine.createSpyObj<PrototypeStorage>(["get"]);
        const propertyDescriptorProvider = jasmine.createSpyObj<PropertyDescriptorProvider>(["get"]);
        const reflectHas = jasmine.createSpy<typeof Reflect.has>("Reflect.has");
        createInjector([
            {
                provide: PropertyIsReadOnlyTester,
                useClass: PropertyIsReadOnlyTester,
                deps: [PrototypeStorage, PropertyDescriptorProvider, REFLECT_HAS]
            },
            {provide: PrototypeStorage, useValue: prototypeStorage, deps: []},
            {provide: PropertyDescriptorProvider, useValue: propertyDescriptorProvider, deps: []},
            {provide: REFLECT_HAS, useValue: reflectHas, deps: []},
        ]);
    });

    it("Returns false when there is no prototype", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue(null);

        const explorer = resolve(PropertyIsReadOnlyTester);
        const actual = explorer.isReadOnly(name);

        expect(actual).toBe(false);
    });

    it("Returns false when prototype is undefined", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue(undefined);

        const explorer = resolve(PropertyIsReadOnlyTester);
        const actual = explorer.isReadOnly(name);

        expect(actual).toBe(false);
    });

    it("Returns false when there is no property", () => {
        const name = "name";
        const prototype = {};
        resolve(PrototypeStorage)
            .get.and.returnValue(prototype);
        resolve(REFLECT_HAS)
            .withArgs(prototype, name)
            .and.returnValue(false);

        const explorer = resolve(PropertyIsReadOnlyTester);
        const actual = explorer.isReadOnly(name);

        expect(actual).toBe(false);
    });

    it("Returns false when there is an accessor descriptor with set", () => {
        const name = "name";
        const prototype = {};

        resolve(PrototypeStorage)
            .get.and.returnValue(prototype);

        resolve(REFLECT_HAS)
            .withArgs(prototype, name)
            .and.returnValue(true);

        resolve(PropertyDescriptorProvider)
            .get.withArgs(prototype, name)
            .and.returnValue({set: () => undefined});

        const explorer = resolve(PropertyIsReadOnlyTester);
        const actual = explorer.isReadOnly(name);

        expect(actual).toBe(false);
    });

    it("Returns false when property is writable", () => {
        const name = "name";
        const prototype = {};

        resolve(PrototypeStorage)
            .get.and.returnValue(prototype);

        resolve(REFLECT_HAS)
            .withArgs(prototype, name)
            .and.returnValue(true);

        resolve(PropertyDescriptorProvider)
            .get.withArgs(prototype, name)
            .and.returnValue({writable: true});

        const explorer = resolve(PropertyIsReadOnlyTester);
        const actual = explorer.isReadOnly(name);

        expect(actual).toBe(false);
    });

    it("Returns true when there is an accessor descriptor without set", () => {
        const name = "name";
        const prototype = {};

        resolve(PrototypeStorage)
            .get.and.returnValue(prototype);

        resolve(REFLECT_HAS)
            .withArgs(prototype, name)
            .and.returnValue(true);

        resolve(PropertyDescriptorProvider)
            .get.withArgs(prototype, name)
            .and.returnValue({set: undefined, get: () => undefined});

        const explorer = resolve(PropertyIsReadOnlyTester);
        const actual = explorer.isReadOnly(name);

        expect(actual).toBe(true);
    });

    it("Returns true when property is not writable", () => {
        const name = "name";
        const prototype = {};

        resolve(PrototypeStorage)
            .get.and.returnValue(prototype);

        resolve(REFLECT_HAS)
            .withArgs(prototype, name)
            .and.returnValue(true);

        resolve(PropertyDescriptorProvider)
            .get.withArgs(prototype, name)
            .and.returnValue({writable: false});

        const explorer = resolve(PropertyIsReadOnlyTester);
        const actual = explorer.isReadOnly(name);

        expect(actual).toBe(true);
    });
});
