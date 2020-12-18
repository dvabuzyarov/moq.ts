import { HOST } from "./injection-tokens/host.injection-token";
import { TypeofInjectionToken } from "../injector/typeof-injection-token";
import { TypeOfInjectionFactory } from "../L0/L0.injection-factory/injection-factory";
import { Options } from "./options";
import { Inject } from "@angular/core";
import { DirEntryPathsSelector } from "./selectors/dir-entry-paths.selector";
import { normalize, Path, relative } from "@angular-devkit/core";
import { PublicFilesProvider } from "./public-files.provider";

export class PrivateFilesProvider {
    constructor(
        @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        @Inject(Options)
        private readonly options: TypeOfInjectionFactory<Options>,
        @Inject(DirEntryPathsSelector)
        private readonly dirEntryPathsSelector: TypeOfInjectionFactory<DirEntryPathsSelector>,
        private readonly publicFilesProvider: PublicFilesProvider) {
    }

    async get() {
        const {libPath, sourceRoot} = await this.options;
        const publicFiles = await this.publicFilesProvider.get();
        return this.dirEntryPathsSelector(this.tree.getDir(libPath))
            .map(path => path.substring(0, path.length - 3))
            .filter(path => path.lastIndexOf(".spec") < 0)
            .map(path => normalize(relative(sourceRoot as Path, path)))
            .filter(path => publicFiles.has(path) === false)
            .map(path => `./${path}`);
    }
}
