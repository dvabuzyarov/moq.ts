import { Inject } from "@angular/core";
import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Options } from "./options";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { From } from "../../L2/L2.hof/from";
import { Pipe } from "../../L2/L2.hof/pipe";
import { DirEntryPathsSelector } from "../../L2/L2.selectors/dir-entry-paths.selector";
import { MergeOperator } from "../../L2/L2.operators/merge.operator";
import { FilterOperator } from "../../L2/L2.operators/filter.operator";
import { DeletePathsOperator } from "../../L2/L2.operators/delete-paths.operator";

export class DeleteFilesRule {
    constructor(
        @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        @Inject(Options)
        private readonly options: TypeOfInjectionFactory<Options>,
        @Inject(From)
        private readonly from: TypeOfInjectionFactory<From>,
        @Inject(Pipe)
        private readonly pipe: TypeOfInjectionFactory<Pipe>,
        @Inject(MergeOperator)
        private readonly merge: TypeOfInjectionFactory<MergeOperator>,
        @Inject(FilterOperator)
        private readonly filter: TypeOfInjectionFactory<FilterOperator>,
        @Inject(DeletePathsOperator)
        private readonly deletePaths: TypeOfInjectionFactory<DeletePathsOperator>,
        @Inject(DirEntryPathsSelector)
        private readonly dirEntryPathSelector: TypeOfInjectionFactory<DirEntryPathsSelector>) {
    }

    async apply() {
        const {fesm2015Folder, bundlesFolder, internalEsm2015Folder} = await this.options;
        return this.from(
            [],
            this.pipe(
                this.merge(
                    this.dirEntryPathSelector(this.tree.getDir(fesm2015Folder)),
                    this.dirEntryPathSelector(this.tree.getDir(bundlesFolder))
                ),
                this.filter(new RegExp(/moq.ts-internal/, "i")),
                this.merge([internalEsm2015Folder]),
                this.deletePaths()
            )
        );
    }
}
