import { CreateEmptySourceFileOperator } from "./create-empty-source-file.operator";
import { PrintSourceFileOperator } from "./print-source-file.operator";
import { CreateSourceFileOperator } from "./create-source-file.operator";
import { CreateExportDeclarationOperator } from "./create-export-declaration.operator";
import { AddCommentOperator } from "./add-comment.operator";
import { FilterOperator } from "./filter.operator";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { DeletePathsOperator } from "./delete-paths.operator";

export default [
    {provide: AddCommentOperator, useClass: AddCommentOperator, deps: []},
    {provide: CreateExportDeclarationOperator, useClass: CreateExportDeclarationOperator, deps: []},
    {
        provide: CreateSourceFileOperator,
        useClass: CreateSourceFileOperator,
        deps: [CreateEmptySourceFileOperator]
    },
    {provide: PrintSourceFileOperator, useClass: PrintSourceFileOperator, deps: []},
    {provide: CreateEmptySourceFileOperator, useClass: CreateEmptySourceFileOperator, deps: []},
    {provide: FilterOperator, useClass: FilterOperator, deps: []},
    {provide: DeletePathsOperator, useClass: DeletePathsOperator, deps: [HOST]},
];
