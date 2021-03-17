import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Options } from "./options";
import { Inject } from "@angular/core";
import { normalize, Path, relative } from "@angular-devkit/core";
import { DirEntryPathsSelector } from "../../L2/L2.selectors/dir-entry-paths.selector";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";

export class ProjectFilesProvider {
    constructor(
        @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        @Inject(Options)
        private readonly options: TypeOfInjectionFactory<Options>,
        @Inject(DirEntryPathsSelector)
        private readonly dirEntryPathsSelector: TypeOfInjectionFactory<DirEntryPathsSelector>) {
    }

    async get() {
        const {libPath, sourceRoot} = await this.options;
        return this.dirEntryPathsSelector(this.tree.getDir(libPath))
            .map(path => path.substring(0, path.length - 3))
            .filter(path => path.lastIndexOf(".spec") < 0)
            .map(path => normalize(relative(sourceRoot as Path, path as Path)))
            .map(path => `./${path}`);
    }
}
