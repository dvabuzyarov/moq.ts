import { IMock } from "../moq";
import { InjectionFactory } from "../injector/injection-factory";

/**
 * @hidden
 */
export class RootMockProvider implements InjectionFactory {
    constructor(
        private readonly mock: IMock<unknown>,
        private readonly root: IMock<unknown>) {
        return this.factory() as any;
    }

    public factory() {
        return this.root ?? this.mock;
    }
}
