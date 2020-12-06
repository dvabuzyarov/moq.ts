import { HOST } from "./injection-tokens/host.injection-token";
import { typeofInjectionToken } from "../injector/typeof-injection-token";
import { ModuleSpecifierTextSetSelector } from "./selectors/module-specifier-text-set.selector";
import { typeOfInjectionFactory } from "../L0/L0.injection-factory/injection-factory";
import { Options } from "./options";
import { SourceFileCreator } from "./source-file.creator";
import { Inject } from "@angular/core";

export class PublicFilesProvider {
    constructor(
        @Inject(HOST)
        private readonly tree: typeofInjectionToken<typeof HOST>,
        @Inject(Options)
        private readonly options: typeOfInjectionFactory<Options>,
        @Inject(SourceFileCreator)
        private readonly sourceFileCreator: typeOfInjectionFactory<SourceFileCreator>,
        @Inject(ModuleSpecifierTextSetSelector)
        private readonly moduleSpecifierTextSetSelector: typeOfInjectionFactory<ModuleSpecifierTextSetSelector>) {
    }

    async get() {
        const {publicApiPath} = await this.options;
        const buffer = this.tree.read(publicApiPath);
        const node = this.sourceFileCreator(buffer);
        return this.moduleSpecifierTextSetSelector(node);
    }
}
