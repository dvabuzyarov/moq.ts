import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { ISchema } from "./schema";
import { JsonObject } from "@angular-devkit/core";
import { OPTIONS } from "./injection-tokens/options.injection-token";
import { PublicApiRule } from "./public-api.rule";
import { Injector } from "@angular/core";
import { Options } from "./options";
import { ProjectFilesProvider } from "./project-files.provider";
import { From } from "../../L2/L2.hof/from";
import { Pipe } from "../../L2/L2.hof/pipe";
import selectors from "../../L2/L2.selectors";
import l2operators from "../../L2/L2.operators/";
import l2wrappers from "../../L2/L2.wrappers/";
import l2hof from "../../L2/L2.hof";
import { GetWorkspace } from "../../L2/L2.wrappers/get-workspace.service";
import { JoinPath } from "../../L2/L2.wrappers/join-path.service";
import { DirEntryPathsSelector } from "../../L2/L2.selectors/dir-entry-paths.selector";
import { CreateExportDeclarationOperator } from "../../L2/L2.operators/create-export-declaration.operator";
import { AddCommentOperator } from "../../L2/L2.operators/add-comment.operator";
import { CreateSourceFileOperator } from "../../L2/L2.operators/create-source-file.operator";
import { PrintSourceFileOperator } from "../../L2/L2.operators/print-source-file.operator";
import { CONTEXT } from "../../L2/L2.injection-tokens/context.injection-token";
import { HOST } from "../../L2/L2.injection-tokens/host.injection-token";

export default (options: JsonObject & ISchema) => (host: Tree, context: SchematicContext) => {
    const injector = Injector.create({
        providers: [
            ...selectors,
            ...l2operators,
            ...l2wrappers,
            ...l2hof,
            {provide: OPTIONS, useValue: options, deps: []},
            {provide: CONTEXT, useValue: context, deps: []},
            {provide: HOST, useValue: host, deps: []},
            {provide: Options, useClass: Options, deps: [OPTIONS, GetWorkspace, JoinPath]},
            {
                provide: ProjectFilesProvider,
                useClass: ProjectFilesProvider,
                deps: [HOST, Options, DirEntryPathsSelector]
            },
            {
                provide: PublicApiRule,
                useClass: PublicApiRule,
                deps: [
                    HOST,
                    ProjectFilesProvider,
                    Options,
                    From,
                    Pipe,
                    CreateExportDeclarationOperator,
                    AddCommentOperator,
                    CreateSourceFileOperator,
                    PrintSourceFileOperator
                ]
            },
        ]
    });
    const rule = injector.get(PublicApiRule);
    return rule.apply();
};
