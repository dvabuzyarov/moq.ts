import { InjectionFactory, TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { OPTIONS } from "./injection-tokens/options.injection-token";
import { GetWorkspace } from "../../L2/L2.wrappers/get-workspace.service";
import { JoinPath } from "../../L2/L2.wrappers/join-path.service";

export class Options implements InjectionFactory {
    constructor(
        // @Inject(OPTIONS)
        private readonly options: TypeofInjectionToken<typeof OPTIONS>,
        // @Inject(GetWorkspace)
        private readonly getWorkspace: TypeOfInjectionFactory<GetWorkspace>,
        // @Inject(JoinPath)
        private readonly join: TypeOfInjectionFactory<JoinPath>) {
        return this.factory() as any;
    }

    async factory() {
        const workspace = await this.getWorkspace("local");
        const {sourceRoot} = workspace.projects.get(this.options.project);
        return {
            publicTs: this.join(sourceRoot, "public.ts"),
            publicApiTs: this.join(sourceRoot, "public_api.ts"),
            internalApiTs: this.join(sourceRoot, "internal_api.ts"),
            libPath: this.join(sourceRoot, "/lib"),
            sourceRoot: `/${sourceRoot}`
        };
    }
}
