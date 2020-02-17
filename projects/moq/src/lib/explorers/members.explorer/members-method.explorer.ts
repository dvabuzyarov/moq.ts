import { PrototypeStorage } from "../../traps/prototype.storage";
import { getPropertyDescriptor } from "./get-property.descriptor";

/**
 * @hidden
 */
export class MembersMethodExplorer {
    constructor(
        private storage: PrototypeStorage,
        private propertyDescriptorProvider: typeof getPropertyDescriptor = getPropertyDescriptor) {

    }

    public hasMethod(name: PropertyKey): boolean {
        const prototype = this.storage.get();
        if (prototype && Reflect.has(prototype, name)) {
            const descriptor = this.propertyDescriptorProvider(prototype, name);
            return descriptor.value instanceof Function;
        }
        return false;
    }
}

