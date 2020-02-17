import { PrototypeStorage } from "../../traps/prototype.storage";
import { getPropertyDescriptor } from "./get-property.descriptor";

/**
 * @hidden
 */
export class MembersPropertyExplorer {
    constructor(
        private storage: PrototypeStorage,
        private propertyDescriptorProvider: typeof getPropertyDescriptor = getPropertyDescriptor) {

    }

    public hasProperty(name: PropertyKey): boolean {
        const prototype = this.storage.get();
        if (prototype && Reflect.has(prototype, name)) {
            const descriptor = this.propertyDescriptorProvider(prototype, name);
            return descriptor.get !== undefined || (descriptor.value instanceof Function) === false;
        }
        return false;
    }
}
