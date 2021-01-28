import { Expressions } from "../reflector/expressions";
import { IMock } from "../moq";
import { InjectionFactory } from "../injector/injection-factory";


/**
 * This service provides access to all auto mocked instances
 */
export class AutoMockedStorage implements InjectionFactory {
    constructor() {
        return this.factory() as any;
    }

    factory() {
        return new Map<Expressions<unknown>, IMock<unknown>>();
    }
}
