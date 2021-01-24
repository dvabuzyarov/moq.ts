import { Expressions } from "../reflector/expressions";

export class ExpressionsMatcher {
    public matched<T>(left: Expressions<T>, right: Expressions<T>): boolean {
        throw new Error("Not Implemented");
    }
}
