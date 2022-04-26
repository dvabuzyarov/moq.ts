import { ItEqualityComparer } from "./it.equality-comparer";

/**
 * @hidden
 */
export class ConstantEqualityComparer {
    constructor(private readonly itEqualityComparer: ItEqualityComparer) {
    }

    public equals(left: any, right: any): boolean {
        const actual = this.itEqualityComparer.equals(left, right);
        return actual === undefined ? left === right : actual;
    }
}

