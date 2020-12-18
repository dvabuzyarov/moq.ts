import { PrototypeStorage } from "../../interceptors/prototype.storage";
import { PropertyDescriptorProvider } from "../members.explorer/property-descriptor.provider";
import { TypeofInjectionToken } from "../../typeof-injection-token";
import { REFLECT_HAS } from "../reflect-has.injection-token";

/**
 * @hidden
 */
export class PropertyIsReadOnlyTester {
    constructor(
        private storage: PrototypeStorage,
        private propertyDescriptorProvider: PropertyDescriptorProvider,
        private has: TypeofInjectionToken<typeof REFLECT_HAS>) {

    }

    public isReadOnly(name: PropertyKey): boolean {
        const prototype = this.storage.get();
        if (prototype && this.has(prototype, name)) {
            const descriptor = this.propertyDescriptorProvider.get(prototype, name);
            return descriptor.get instanceof Function && descriptor.set === undefined || descriptor.writable === false;
        }
        return false;
    }
}
