import {IMock} from './moq';
import {IExpectedExpression} from './expected-expressions/expected-expression-reflector';
import {Times} from './times';


// declare namespace jasmine {
//     interface Matchers {
//         moqToHaveBeenCalled<T>(expected: IExpectedExpression<T>, times?: Times): boolean;
//     }
// }

class MatchResult implements jasmine.CustomMatcherResult {
    public pass: boolean;
    public message: string = "undefined message";

    constructor(action: (result: MatchResult)=>boolean) {
        this.pass = action(this);
    }
}

export function moqToHaveBeenCalledMatcher() {
    return {
        moqToHaveBeenCalled: (util, customEqualityTesters) => {
            return {
                compare: (actual: IMock<any>, ...args: any[]) => {
                    const expected: IExpectedExpression<any> = args[0];
                    const times: Times = args.length > 1 ? args[1] : undefined;
                    return new MatchResult((result: MatchResult) => {
                        try {
                            actual.verify(expected, times);
                        } catch (e) {
                            result.message = e.message;
                            return false;
                        }
                        return true;
                    });
                }
            }
        }
    }
}