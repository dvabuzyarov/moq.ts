import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { DirEntryPathsSelector } from "../../L2/L2.selectors/dir-entry-paths.selector";
import { normalize, Path, relative } from "@angular-devkit/core";
import { PublicFilesProvider } from "./public-files.provider";
import { Options } from "./options";

export class InternalFilesProvider {
    constructor(
        // @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        // @Inject(Options)
        private readonly options: TypeOfInjectionFactory<Options>,
        // @Inject(DirEntryPathsSelector)
        private readonly dirEntryPathsSelector: TypeOfInjectionFactory<DirEntryPathsSelector>,
        private readonly publicFilesProvider: PublicFilesProvider) {
    }

    async get() {
        const {libPath, sourceRoot} = await this.options;
        const publicFiles = await this.publicFilesProvider.get();
        return this.dirEntryPathsSelector(this.tree.getDir(libPath))
            .map(path => path.substring(0, path.length - 3))
            .filter(path => path.lastIndexOf(".spec") < 0)
            .map(path => normalize(relative(sourceRoot as Path, path as Path)))
            .filter(path => publicFiles.has(path) === false)
            .map(path => `./${path}`);
    }
}
