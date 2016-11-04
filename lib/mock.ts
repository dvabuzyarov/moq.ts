import {Setup} from './setup';
import {IExpression} from './expression';

export class Mock<T>{

    public setup(expression: IExpression): Setup<T>{
        throw new Error('Not implemented');
        //return new Setup(this, member);
    }

    public get object(): T{
        throw new Error('Not implemented');
    }
}