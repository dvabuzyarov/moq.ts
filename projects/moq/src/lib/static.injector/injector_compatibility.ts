/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { InjectionToken } from "./injection_token";
import { Injector } from "./injector";
import { ValueProvider } from "./interface/provider";
import { getClosureSafeProperty } from "./property";
import { stringify } from "./stringify";


/**
 * An InjectionToken that gets the current `Injector` for `createInjector()`-style injectors.
 *
 * Requesting this token instead of `Injector` allows `StaticInjector` to be tree-shaken from a
 * project.
 *
 * @publicApi
 */
export const INJECTOR = new InjectionToken<Injector>(
    "INJECTOR"
);

const _THROW_IF_NOT_FOUND = {};
export const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;

export const NG_TEMP_TOKEN_PATH = "ngTempTokenPath";
const NG_TOKEN_PATH = "ngTokenPath";
const NEW_LINE = /\n/gm;
export const NO_NEW_LINE = "ɵ";
export const SOURCE = "__source";

export const USE_VALUE =
    getClosureSafeProperty<ValueProvider>({provide: String, useValue: getClosureSafeProperty});

export class NullInjector implements Injector {
    get(token: any, notFoundValue: any = THROW_IF_NOT_FOUND): any {
        if (notFoundValue === THROW_IF_NOT_FOUND) {
            const error = new Error(`NullInjectorError: No provider for ${stringify(token)}!`);
            error.name = "NullInjectorError";
            throw error;
        }
        return notFoundValue;
    }
}


export function catchInjectorError(
    e: any, token: any, injectorErrorName: string, source: string | null): never {
    const tokenPath: any[] = e[NG_TEMP_TOKEN_PATH];
    if (token[SOURCE]) {
        tokenPath.unshift(token[SOURCE]);
    }
    e.message = formatError("\n" + e.message, tokenPath, injectorErrorName, source);
    e[NG_TOKEN_PATH] = tokenPath;
    e[NG_TEMP_TOKEN_PATH] = null;
    throw e;
}

export function formatError(
    text: string, obj: any, injectorErrorName: string, source: string | null = null): string {
    text = text && text.charAt(0) === "\n" && text.charAt(1) === NO_NEW_LINE ? text.substr(2) : text;
    let context = stringify(obj);
    if (Array.isArray(obj)) {
        context = obj.map(stringify).join(" -> ");
    } else if (typeof obj === "object") {
        const parts = <string[]>[];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                parts.push(
                    `${key}:${typeof value === "string" ? JSON.stringify(value) : stringify(value)}`);
            }
        }
        context = `{${parts.join(", ")}}`;
    }
    return `${injectorErrorName}${source ? `(${source})` : ""}[${context}]: ${
        text.replace(NEW_LINE, "\n  ")}`;
}
