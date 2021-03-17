import { GetWorkspace } from "./get-workspace.service";
import { JoinPath } from "./join-path.service";
import { JsonParseService } from "./json-parse.service";
import { JsonStringifyService } from "./json-stringify.service";

export default [
    {provide: GetWorkspace, useClass: GetWorkspace, deps: []},
    {provide: JoinPath, useClass: JoinPath, deps: []},
    {provide: JsonParseService, useClass: JsonParseService, deps: []},
    {provide: JsonStringifyService, useClass: JsonStringifyService, deps: []},
];
