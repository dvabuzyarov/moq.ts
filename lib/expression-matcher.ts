import {IExpressionInfo} from './expression';
import {It} from './expression-predicates';

export interface IExecutedExpressionInfo extends IExpressionInfo{

}

export function executionEqualsExpression(executed: IExecutedExpressionInfo, expression: IExpressionInfo): boolean {
    if (expression.name === undefined && expression.arguments === undefined) return true;
    const isNamesEqual = executed.name === expression.name;
    const isArgumentsEqual = argumentsMatch(executed.arguments, expression.arguments);

    return isNamesEqual && isArgumentsEqual;
}

export function argumentsMatch(executed: any[], expression: any[]): boolean{
    if (executed === undefined && expression === undefined) return true;
    if (executed.length !== expression.length) return false;
    let matched = true;
    expression.forEach((argument, index) =>{
        if (argument instanceof It)
            matched = (argument as It).invoke(executed[index]) === false ? false :  matched;
        else
            matched = argument === executed[index] === false ? false : matched;
    });

    return matched;
}