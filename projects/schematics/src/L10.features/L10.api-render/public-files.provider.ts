import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { ModuleSpecifierTextSetSelector } from "../../L2/L2.selectors/module-specifier-text-set.selector";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { CreateEmptySourceFileOperator } from "../../L2/L2.operators/create-empty-source-file.operator";
import { Inject } from "@angular/core";
import { Options } from "./options";

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
        const {publicTs} = await this.options;
        const buffer = this.tree.read(publicTs);
        const node = this.sourceFileCreator(buffer);
        return this.moduleSpecifierTextSetSelector(node);
    }
}
