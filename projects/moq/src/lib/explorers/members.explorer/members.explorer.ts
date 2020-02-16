import { PrototypeStorage } from "../../traps/prototype.storage";

/**
 * @hidden
 */
export class MembersExplorer {
    constructor(
        private storage: PrototypeStorage) {

    }

    public hasProperty(name: PropertyKey): boolean {
        const prototype = this.storage.get();
        if (prototype) {
            return Reflect.has(prototype, name) && (prototype[name] instanceof Function) === false;
        }
        return false;
    }

    public hasMethod(name: PropertyKey): boolean {
        const prototype = this.storage.get();
        if (prototype) {
            return prototype[name] instanceof Function;
        }
        return false;
    }
}
