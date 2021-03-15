import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { ISchema } from "./schema";
import { JsonObject } from "@angular-devkit/core";
import { HOST } from "../../L2/L2.injection-tokens/host.injection-token";
import { OPTIONS } from "./injection-tokens/options.injection-token";
import { CONTEXT } from "../../L2/L2.injection-tokens/context.injection-token";
import { InternalApiRule } from "./internal-api.rule";
import { Injector } from "@angular/core";
import { PublicFilesProvider } from "./public-files.provider";
import { ModuleSpecifierTextSetSelector } from "../../L2/L2.selectors/module-specifier-text-set.selector";
import { DirEntryPathsSelector } from "../../L2/L2.selectors/dir-entry-paths.selector";
import { Options } from "./options";
import { GetWorkspace } from "../../L2/L2.wrappers/get-workspace.service";
import { CreateEmptySourceFileOperator } from "../../L2/L2.operators/create-empty-source-file.operator";
import { InternalFilesProvider } from "./internal-files.provider";
import { From } from "../../L2/L2.hof/from";
import { Pipe } from "../../L2/L2.hof/pipe";
import { CreateExportDeclarationOperator } from "../../L2/L2.operators/create-export-declaration.operator";
import { AddCommentOperator } from "../../L2/L2.operators/add-comment.operator";
import { CreateSourceFileOperator } from "../../L2/L2.operators/create-source-file.operator";
import { PrintSourceFileOperator } from "../../L2/L2.operators/print-source-file.operator";
import { JoinPath } from "../../L2/L2.wrappers/join-path.service";
import selectors from "../../L2/L2.selectors";
import l2operators from "../../L2/L2.operators/";
import l2wrappers from "../../L2/L2.wrappers/";
import l2hof from "../../L2/L2.hof";

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
                provide: InternalFilesProvider,
                useClass: InternalFilesProvider,
                deps: [HOST, Options, DirEntryPathsSelector, PublicFilesProvider]
            },
            {
                provide: PublicFilesProvider,
                useClass: PublicFilesProvider,
                deps: [HOST, Options, CreateEmptySourceFileOperator, ModuleSpecifierTextSetSelector]
            },
            {
                provide: InternalApiRule,
                useClass: InternalApiRule,
                deps: [
                    HOST,
                    InternalFilesProvider,
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
    const rule = injector.get(InternalApiRule);
    return rule.apply();
};
