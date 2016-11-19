import {Times} from './times';
import {Expressions} from './expressions';
import {IExpectedExpression, ExpectedExpressionReflector} from './expected-expressions/expected-expression-reflector';
import {CallCounter} from './call-counter';

export class VerifyError extends Error{
    constructor(message: string){
        super(message);
    }
}

export class Verifier<T>{

    constructor(
        private reflector: ExpectedExpressionReflector,
        private callCounter: CallCounter){

    }

    public test(expected: IExpectedExpression<T>, times: Times, expressions: Expressions[]): void {
        const expression = this.reflector.reflect(expected);
        const callCount = this.callCounter.count(expression, expressions);
        const passed = times.test(callCount);
        if (passed === false)
            throw new VerifyError(times.message);
    }
}