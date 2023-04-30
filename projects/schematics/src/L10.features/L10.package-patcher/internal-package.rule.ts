import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Options } from "./options";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";

export class InternalPackageRule {
    constructor(
        // @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        // @Inject(Options)
        private readonly options: TypeOfInjectionFactory<Options>) {
    }

    async apply() {
        const {internalPackage} = await this.options;
        const content = {
            "main": "../cjs/moq.ts.cjs",
            "typings": "index.d.ts",
            "sideEffects": false,
            "name": "moq.ts/internal"
        };
        this.tree.create(internalPackage, JSON.stringify(content));
        return this.tree;
    }
}
