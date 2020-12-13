import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { ISchema } from "./schema";
import { JsonObject } from "@angular-devkit/core";
import { HOST } from "./injection-tokens/host.injection-token";
import { OPTIONS } from "./injection-tokens/options.injection-token";
import { CONTEXT } from "./injection-tokens/context.injection-token";
import { InternalApiRule } from "./internal-api.rule";
import { Injector } from "@angular/core";
import { PublicFilesProvider } from "./public-files.provider";
import selectors from "./selectors";
import { ModuleSpecifierTextSetSelector } from "./selectors/module-specifier-text-set.selector";
import { DirEntryPathsSelector } from "./selectors/dir-entry-paths.selector";
import { Options } from "./options";
import { GETWORKSPACE } from "./injection-tokens/get-workspace.injection-token";
import { getWorkspace } from "@angular/cli/utilities/config";
import { PATH_JOIN } from "./injection-tokens/join.injection-token";
import { join } from "path";
import { SourceFileCreator } from "./source-file.creator";
import { PrivateFilesProvider } from "./private-files.provider";
import { AddCommentOperator } from "./operators/add-comment.operator";
import { CreateExportDeclarationOperator } from "./operators/create-export-declaration.operator";
import { CreateSourceFileOperator } from "./operators/create-source-file.operator";
import { PrintSourceFileOperator } from "./operators/print-source-file.operator";
import { From } from "../L2/L2.hof/from";
import { Pipe } from "../L2/L2.hof/pipe";

export default (options: JsonObject & ISchema) => (host: Tree, context: SchematicContext) => {
        const injector = Injector.create({
            providers: [
                ...selectors,
                {provide: OPTIONS, useValue: options, deps: []},
                {provide: CONTEXT, useValue: context, deps: []},
                {provide: HOST, useValue: host, deps: []},
                {provide: GETWORKSPACE, useValue: getWorkspace, deps: []},
                {provide: PATH_JOIN, useValue: join, deps: []},
                {provide: SourceFileCreator, useClass: SourceFileCreator, deps: []},
                {provide: Options, useClass: Options, deps: [OPTIONS, GETWORKSPACE, PATH_JOIN]},
                {provide: From, useClass: From, deps: []},
                {provide: Pipe, useClass: Pipe, deps: []},
                {provide: AddCommentOperator, useClass: AddCommentOperator, deps: []},
                {provide: CreateExportDeclarationOperator, useClass: CreateExportDeclarationOperator, deps: []},
                {provide: CreateSourceFileOperator, useClass: CreateSourceFileOperator, deps: [SourceFileCreator]},
                {provide: PrintSourceFileOperator, useClass: PrintSourceFileOperator, deps: []},
                {
                    provide: PrivateFilesProvider,
                    useClass: PrivateFilesProvider,
                    deps: [HOST, Options, DirEntryPathsSelector, PublicFilesProvider]
                },
                {
                    provide: PublicFilesProvider,
                    useClass: PublicFilesProvider,
                    deps: [HOST, Options, SourceFileCreator, ModuleSpecifierTextSetSelector]
                },
                {
                    provide: InternalApiRule,
                    useClass: InternalApiRule,
                    deps: [
                        HOST,
                        PrivateFilesProvider,
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
