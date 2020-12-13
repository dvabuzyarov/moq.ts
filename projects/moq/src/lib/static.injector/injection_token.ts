/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/* eslint-disabled */
export class InjectionToken<T> {
    constructor(protected desc: string) {
    }

    toString(): string {
        return `InjectionToken ${this.desc}`;
    }
}
