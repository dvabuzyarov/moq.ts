import { IMock } from "../moq";

export class RootProvider {
    constructor(
        private readonly mock: IMock<unknown>,
        private readonly root: IMock<unknown>) {
    }

    public get(): IMock<unknown> {
        return this.root ?? this.mock;
    }
}
