import { GetWorkspace } from "./get-workspace.service";
import { JoinPath } from "./join-path.service";

export default [
    {provide: GetWorkspace, useClass: GetWorkspace, deps: []},
    {provide: JoinPath, useClass: JoinPath, deps: []},
];
