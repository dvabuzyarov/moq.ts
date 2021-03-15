import { CreateEmptySourceFileOperator } from "./create-empty-source-file.operator";
import { PrintSourceFileOperator } from "./print-source-file.operator";
import { CreateSourceFileOperator } from "./create-source-file.operator";
import { CreateExportDeclarationOperator } from "./create-export-declaration.operator";
import { AddCommentOperator } from "./add-comment.operator";

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
];
