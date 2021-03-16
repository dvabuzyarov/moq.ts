import { StatementsSelector } from "./statements.selector";
import { ModuleSpecifierTextSetSelector } from "./module-specifier-text-set.selector";
import { ExportDeclarationsSelector } from "./export-declarations.selector";
import { DirEntryPathsSelector } from "./dir-entry-paths.selector";
import { MergeOperator } from "../L2.operators/merge.operator";

export default [
    {provide: StatementsSelector, useClass: StatementsSelector, deps: []},
    {provide: ExportDeclarationsSelector, useClass: ExportDeclarationsSelector, deps: [StatementsSelector]},
    {
        provide: ModuleSpecifierTextSetSelector,
        useClass: ModuleSpecifierTextSetSelector,
        deps: [ExportDeclarationsSelector]
    },
    {provide: DirEntryPathsSelector, useClass: DirEntryPathsSelector, deps: []},
    {provide: MergeOperator, useClass: MergeOperator, deps: []},
];
