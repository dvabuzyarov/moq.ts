import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { ISchema } from "./schema";
import { JsonObject } from "@angular-devkit/core";
import { OPTIONS } from "./injection-tokens/options.injection-token";
import { PackagePatcherRule } from "./package-patcher.rule";
import { Injector } from "@angular/core";
import { Options } from "./options";
import selectors from "../../L2/L2.selectors";
import l2operators from "../../L2/L2.operators/";
import l2wrappers from "../../L2/L2.wrappers/";
import l2hof from "../../L2/L2.hof";
import { GetWorkspace } from "../../L2/L2.wrappers/get-workspace.service";
import { JoinPath } from "../../L2/L2.wrappers/join-path.service";
import { CONTEXT } from "../../L0/L0.injection-tokens/context.injection-token";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { JsonParseService } from "../../L2/L2.wrappers/json-parse.service";
import { PublicApiPatcherRule } from "./public-api-patcher.rule";
import { JsonStringifyService } from "../../L2/L2.wrappers/json-stringify.service";
import { HighOrderRule } from "./high-order.rule";
import { DeleteFilesRule } from "./delete-files.rule";
import { From } from "../../L2/L2.hof/from";
import { Pipe } from "../../L2/L2.hof/pipe";
import { MergeOperator } from "../../L2/L2.operators/merge.operator";
import { FilterOperator } from "../../L2/L2.operators/filter.operator";
import { DeletePathsOperator } from "../../L2/L2.operators/delete-paths.operator";
import { DirEntryPathsSelector } from "../../L2/L2.selectors/dir-entry-paths.selector";

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
            {provide: Options, useClass: Options, deps: [OPTIONS, GetWorkspace, JoinPath, HOST, JsonParseService]},
            {
                provide: PackagePatcherRule,
                useClass: PackagePatcherRule,
                deps: [
                    HOST,
                    Options,
                    JsonParseService,
                    JsonStringifyService,
                    JoinPath
                ]
            },
            {provide: PublicApiPatcherRule, useClass: PublicApiPatcherRule, deps: [HOST, Options]},
            {
                provide: DeleteFilesRule,
                useClass: DeleteFilesRule,
                deps: [HOST, Options, From, Pipe, MergeOperator, FilterOperator, DeletePathsOperator, DirEntryPathsSelector]
            },
            {
                provide: HighOrderRule,
                useClass: HighOrderRule,
                deps: [PackagePatcherRule, PublicApiPatcherRule, DeleteFilesRule]
            },
        ]
    });
    const rule = injector.get(HighOrderRule);
    return rule.apply();
};
