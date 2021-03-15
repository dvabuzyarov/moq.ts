import { From } from "./from";
import { FromEmpty } from "./from-empty";
import { Pipe } from "./pipe";

export default [
    {provide: From, useClass: From, deps: []},
    {provide: FromEmpty, useClass: FromEmpty, deps: []},
    {provide: Pipe, useClass: Pipe, deps: []},
];
