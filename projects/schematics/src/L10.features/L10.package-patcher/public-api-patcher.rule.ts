import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Options } from "./options";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";

export class PublicApiPatcherRule {
    constructor(
        // @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        // @Inject(Options)
        private readonly options: TypeOfInjectionFactory<Options>) {
    }

    async apply() {
        const {publicJs, publicApiTs} = await this.options;
        const buffer = this.tree.read(publicJs);
        this.tree.overwrite(publicApiTs, buffer);
        return this.tree;
    }
}
