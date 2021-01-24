import { PrototypeStorage } from "../../interceptors/prototype.storage";
import { PropertyDescriptorProvider } from "./property-descriptor.provider";
import { REFLECT_HAS } from "../reflect-has.injection-token";
import { TypeofInjectionToken } from "../../injector/typeof-injection-token";

/**
 * @hidden
 */
export class MembersPropertyExplorer {
    constructor(
        private storage: PrototypeStorage,
        private propertyDescriptorProvider: PropertyDescriptorProvider,
        private has: TypeofInjectionToken<typeof REFLECT_HAS>) {

    }

    public hasProperty(name: PropertyKey): boolean {
        const prototype = this.storage.get();
        if (prototype && this.has(prototype, name)) {
            const descriptor = this.propertyDescriptorProvider.get(prototype, name);
            return descriptor.get !== undefined || (descriptor.value instanceof Function) === false;
        }
        return false;
    }
}
