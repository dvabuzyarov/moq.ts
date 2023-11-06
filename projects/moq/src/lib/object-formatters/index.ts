import { ObjectFormatter } from "./object.formatter";
import { OBJECT_FORMATTERS } from "./object-formatters.injection-token";
import { NumberFormatter } from "./number.formatter";
import { StringFormatter } from "./string.formatter";
import { BooleanFormatter } from "./boolean.formatter";
import { BigIntFormatter } from "./big-int.formatter";
import { UndefinedFormatter } from "./undefined.formatter";
import { NullFormatter } from "./null.formatter";
import { FunctionFormatter } from "./function.formatter";
import { SymbolFormatter } from "./symbol.formatter";
import { ItFormatter } from "./it.formatter";
import { DateFormatter } from "./date.formatter";
import { ArrayFormatter } from "./array.formatter";
import { Injector } from "../static.injector/injector";
import { MapFormatter } from "./map.formatter";
import { SetFormatter } from "./set.formatter";
import { IteratorFormatter } from "./iterator.formatter";
import { IteratorTester } from "./iterator.tester";
import { PojoFormatter } from "./pojo.formatter";

/**
 * @hidden
 */
export default [
    {provide: IteratorTester, useClass: IteratorTester, deps: []},
    {provide: ObjectFormatter, useClass: ObjectFormatter, deps: [OBJECT_FORMATTERS]},
    {provide: UndefinedFormatter, useClass: UndefinedFormatter, deps: []},
    {provide: NullFormatter, useClass: NullFormatter, deps: []},
    {provide: NumberFormatter, useClass: NumberFormatter, deps: []},
    {provide: StringFormatter, useClass: StringFormatter, deps: []},
    {provide: BooleanFormatter, useClass: BooleanFormatter, deps: []},
    {provide: BigIntFormatter, useClass: BigIntFormatter, deps: []},
    {provide: SymbolFormatter, useClass: SymbolFormatter, deps: []},
    {provide: FunctionFormatter, useClass: FunctionFormatter, deps: []},
    {provide: ItFormatter, useClass: ItFormatter, deps: []},
    {provide: DateFormatter, useClass: DateFormatter, deps: []},
    {provide: ArrayFormatter, useClass: ArrayFormatter, deps: [Injector]},
    {provide: MapFormatter, useClass: MapFormatter, deps: [Injector]},
    {provide: SetFormatter, useClass: SetFormatter, deps: [Injector]},
    {provide: IteratorFormatter, useClass: IteratorFormatter, deps: [Injector, IteratorTester]},
    {provide: PojoFormatter, useClass: PojoFormatter, deps: [Injector]},


    {provide: OBJECT_FORMATTERS, useExisting: UndefinedFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: NullFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: NumberFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: StringFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: BooleanFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: BigIntFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: SymbolFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: FunctionFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: ItFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: DateFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: ArrayFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: MapFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: SetFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: IteratorFormatter, multi: true, deps: []},
    {provide: OBJECT_FORMATTERS, useExisting: PojoFormatter, multi: true, deps: []},
];
