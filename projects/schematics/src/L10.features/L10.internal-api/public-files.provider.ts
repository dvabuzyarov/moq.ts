import { HOST } from "../../L2/L2.injection-tokens/host.injection-token";
import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { ModuleSpecifierTextSetSelector } from "../../L2/L2.selectors/module-specifier-text-set.selector";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Options } from "./options";
import { CreateEmptySourceFileOperator } from "../../L2/L2.operators/create-empty-source-file.operator";
import { Inject } from "@angular/core";

export class PublicFilesProvider {
    constructor(
        @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        @Inject(Options)
        private readonly options: TypeOfInjectionFactory<Options>,
        @Inject(CreateEmptySourceFileOperator)
        private readonly sourceFileCreator: TypeOfInjectionFactory<CreateEmptySourceFileOperator>,
        @Inject(ModuleSpecifierTextSetSelector)
        private readonly moduleSpecifierTextSetSelector: TypeOfInjectionFactory<ModuleSpecifierTextSetSelector>) {
    }

    async get() {
        const {publicPath} = await this.options;
        const buffer = this.tree.read(publicPath);
        const node = this.sourceFileCreator(buffer);
        return this.moduleSpecifierTextSetSelector(node);
    }
}
