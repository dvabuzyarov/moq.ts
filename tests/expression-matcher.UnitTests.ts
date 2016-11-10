import {IExpressionInfo} from '../lib/expression';
import {It} from '../lib/expression-predicates';
import {IExecutedExpressionInfo, executionEqualsExpression} from '../lib/expression-matcher';

describe('Execution equals an expression', () => {

    it('Returns true when execution and expression are empty', ()=> {
        const execution: IExecutedExpressionInfo = {};
        const expression: IExpressionInfo = {};

        const actual = executionEqualsExpression(execution, expression);

        expect(actual).toBe(true);
    });

    it('Returns true when execution is not empty but expression is empty', ()=> {
        const execution: IExecutedExpressionInfo = {name: 'name', arguments: []};
        const expression: IExpressionInfo = {};

        const actual = executionEqualsExpression(execution, expression);

        expect(actual).toBe(true);
    });

    it('Returns true when execution fits expression by name', ()=> {
        const name = 'name';
        const execution: IExecutedExpressionInfo = {name: name};
        const expression: IExpressionInfo = {name: name};

        const actual = executionEqualsExpression(execution, expression);

        expect(actual).toBe(true);
    });

    it('Returns true when execution fits expression by simple arguments', ()=> {
        var arg = 'argument';
        const execution: IExecutedExpressionInfo = {arguments: [arg]};
        const expression: IExpressionInfo = {arguments: [arg]};

        const actual = executionEqualsExpression(execution, expression);

        expect(actual).toBe(true);
    });

    it('Returns true when execution fits expression by name and simple arguments', ()=> {
        const name = 'name';
        const arg = 'argument';
        const execution: IExecutedExpressionInfo = {name: name, arguments: [arg]};
        const expression: IExpressionInfo = {name: name, arguments: [arg]};

        const actual = executionEqualsExpression(execution, expression);

        expect(actual).toBe(true);
    });

    it('Returns true when execution fits expression by name and predicated arguments', ()=> {
        const name = 'name';
        const arg = 'argument';
        const execution: IExecutedExpressionInfo = {name: name, arguments: [arg]};
        const expression: IExpressionInfo = {name: name, arguments:  [It.Is((instance)=> {
            expect(instance).toBe(arg);
            return true;
        })]};

        const actual = executionEqualsExpression(execution, expression);

        expect(actual).toBe(true);
    });

    it('Returns false when execution does not fit expression by name', ()=> {
        const execution: IExecutedExpressionInfo = {name: 'execution name'};
        const expression: IExpressionInfo = {name: 'expression name'};

        const actual = executionEqualsExpression(execution, expression);

        expect(actual).toBe(false);
    });

    it('Returns false when execution does not fit expression by simple arguments', ()=> {
        const execution: IExecutedExpressionInfo = {arguments: ['execution argument']};
        const expression: IExpressionInfo = {arguments: ['expression argument']};

        const actual = executionEqualsExpression(execution, expression);

        expect(actual).toBe(false);
    });

    it('Returns false when execution does not fit expression by array of simple arguments', ()=> {
        const arg = 'argument';
        const execution: IExecutedExpressionInfo = {arguments: [arg, 'execution argument']};
        const expression: IExpressionInfo = {arguments: [arg, 'expression argument']};

        const actual = executionEqualsExpression(execution, expression);

        expect(actual).toBe(false);
    });

    it('Returns false when execution does not fit expression by array of simple arguments with different order', ()=> {
        const arg1 = 'argument 1';
        const arg2 = 'argument 2';
        const execution: IExecutedExpressionInfo = {arguments: [arg1, arg2]};
        const expression: IExpressionInfo = {arguments: [arg2, arg1]};

        const actual = executionEqualsExpression(execution, expression);

        expect(actual).toBe(false);
    });

    it('Returns false when execution does not fit expression by name and predicated arguments', ()=> {
        const name = 'name';
        const arg = 'argument';
        const execution: IExecutedExpressionInfo = {name: name, arguments: [arg]};
        const expression: IExpressionInfo = {name: name, arguments:  [It.Is((instance)=> {
            expect(instance).toBe(arg);
            return false;
        })]};

        const actual = executionEqualsExpression(execution, expression);

        expect(actual).toBe(false);
    });

});