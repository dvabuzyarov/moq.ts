import { InjectionFactory, TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { OPTIONS } from "./injection-tokens/options.injection-token";
import { GetWorkspace } from "../../L2/L2.wrappers/get-workspace.service";
import { JoinPath } from "../../L2/L2.wrappers/join-path.service";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { JsonParseService } from "../../L2/L2.wrappers/json-parse.service";

export class Options implements InjectionFactory {
    constructor(
        // @Inject(OPTIONS)
        private readonly options: TypeofInjectionToken<typeof OPTIONS>,
        // @Inject(GetWorkspace)
        private readonly getWorkspace: TypeOfInjectionFactory<GetWorkspace>,
        // @Inject(JoinPath)
        private readonly join: TypeOfInjectionFactory<JoinPath>,
        // @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        // @Inject(JsonParseService)
        private readonly jsonParse: TypeOfInjectionFactory<JsonParseService>) {
        return this.factory() as any;
    }

    async factory() {
        const workspace = await this.getWorkspace("local");
        const {sourceRoot} = workspace.projects.get(this.options.project);
        const ngPackagePath = this.join(sourceRoot, "../", "ng-package.json");
        const {dest} = this.jsonParse(this.tree.read(ngPackagePath).toString());
        const moqOutputFolder = this.join(sourceRoot, "../", dest);
        const moqPackageJson = this.join(moqOutputFolder, "package.json");
        const publicApiTs = this.join(moqOutputFolder, "public_api.d.ts");
        const fesm2020Folder = this.join(moqOutputFolder, "/fesm2020/");
        const fesm2015Folder = this.join(moqOutputFolder, "/fesm2015/");
        const internalEsm2020Folder = this.join(moqOutputFolder, "/esm2020/internal/");
        const internalLibFolder = this.join(moqOutputFolder, "/internal/lib/");
        const internalPackage = this.join(moqOutputFolder, "/internal/package.json");
        const libFolder = this.join(moqOutputFolder, "/lib/");
        return {
            publicApiTs,
            moqOutputFolder,
            moqPackageJson,
            fesm2020Folder,
            fesm2015Folder,
            internalEsm2020Folder,
            internalLibFolder,
            libFolder,
            internalPackage
        };
    }
}
