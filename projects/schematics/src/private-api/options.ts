import { InjectionFactory } from "../L0/L0.injection-factory/injection-factory";
import { Inject, Injectable } from "@angular/core";
import { typeofInjectionToken } from "../injector/typeof-injection-token";
import { OPTIONS } from "./injection-tokens/options.injection-token";
import { GETWORKSPACE } from "./injection-tokens/get-workspace.injection-token";
import { PATH_JOIN } from "./injection-tokens/join.injection-token";

@Injectable()
export class Options implements InjectionFactory {
    constructor(@Inject(OPTIONS)
                private readonly options: typeofInjectionToken<typeof OPTIONS>,
                @Inject(GETWORKSPACE)
                private readonly getWorkspace: typeofInjectionToken<typeof GETWORKSPACE>,
                @Inject(PATH_JOIN)
                private readonly join: typeofInjectionToken<typeof PATH_JOIN>) {
        return this.factory() as any;
    }

    async factory() {
        const workspace = await this.getWorkspace("local");
        const {sourceRoot} = workspace.getProject(this.options.project);
        return {
            privateApiPath: this.join(sourceRoot, "private_api.ts"),
            publicApiPath: this.join(sourceRoot, "public_api.ts"),
            libPath: this.join(sourceRoot, "/lib"),
            sourceRoot: `/${sourceRoot}`
        };
    }
}
