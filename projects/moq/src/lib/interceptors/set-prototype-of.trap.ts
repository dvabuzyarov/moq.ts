import { PrototypeStorage } from "./prototype.storage";

/**
 * @hidden
 */
export class SetPrototypeOfTrap {
    constructor(
        private prototypeStorage: PrototypeStorage) {

    }

    public intercept(prototype: any): any {
        if (prototype !== undefined) {
            this.prototypeStorage.set(prototype);
            return true;
        }
        return false;

    }
}
