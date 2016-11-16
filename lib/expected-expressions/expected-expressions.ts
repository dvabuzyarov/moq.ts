import {It} from './expression-predicates';
import {SetPropertyExpression, GetPropertyExpression, MethodExpression, NamedMethodExpression} from '../expressions';

export class ExpectedNamedMethodExpression extends NamedMethodExpression {

}

export class ExpectedMethodExpression extends MethodExpression {

}

export class ExpectedGetPropertyExpression extends GetPropertyExpression {

}

export class ExpectedSetPropertyExpression extends SetPropertyExpression {

}

export type ExpectedExpressions<T> = ExpectedMethodExpression | ExpectedGetPropertyExpression | ExpectedSetPropertyExpression | ExpectedNamedMethodExpression | It<T>;