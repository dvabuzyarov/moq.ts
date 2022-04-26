import { createInjectorFromProviders, resolve } from "../../../tests.components/resolve.builder";
import { PrototypeStorage } from "../../interceptors/prototype.storage";
import { MembersMethodExplorer } from "./members-method.explorer";
import { PropertyDescriptorProvider } from "./property-descriptor.provider";
import { REFLECT_HAS } from "../reflect-has.injection-token";

describe("Members method explorer", () => {
    beforeEach(() => {
        const prototypeStorage = jasmine.createSpyObj<PrototypeStorage>(["get"]);
        const propertyDescriptorProvider = jasmine.createSpyObj<PropertyDescriptorProvider>(["get"]);
        const reflectHas = jasmine.createSpy<typeof Reflect.has>("Reflect.has");
        createInjectorFromProviders([
            {
                provide: MembersMethodExplorer,
                useClass: MembersMethodExplorer,
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

        const explorer = resolve(MembersMethodExplorer);
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(false);
    });

    it("Returns false when prototype is undefined", () => {
        const name = "name";
        resolve(PrototypeStorage)
            .get.and.returnValue(undefined);

        const explorer = resolve(MembersMethodExplorer);
        const actual = explorer.hasMethod(name);

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

        const explorer = resolve(MembersMethodExplorer);
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(false);
    });

    it("Returns true when there is a property and it is a function", () => {
        const name = "name";
        const prototype = {};

        resolve(PrototypeStorage)
            .get.and.returnValue(prototype);

        resolve(REFLECT_HAS)
            .withArgs(prototype, name)
            .and.returnValue(true);

        resolve(PropertyDescriptorProvider)
            .get.withArgs(prototype, name)
            .and.returnValue({value: () => undefined});

        const explorer = resolve(MembersMethodExplorer);
        const actual = explorer.hasMethod(name);

        expect(actual).toBe(true);
    });
});
