[![Build Status](https://travis-ci.org/dvabuzyarov/moq.ts.svg?branch=master)](https://travis-ci.org/dvabuzyarov/moq.ts)
[![NPM version](http://img.shields.io/npm/v/moq.ts.svg?style=flat-square)](https://www.npmjs.com/package/moq.ts)
[![npm downloads](https://img.shields.io/npm/dm/moq.ts.svg?style=flat-square)](https://www.npmjs.com/package/moq.ts)
[![Dependency Status](http://img.shields.io/david/dvabuzyarov/moq.ts.svg?style=flat-square)](https://david-dm.org/dvabuzyarov/moq.ts)
[![Coverage Status](https://coveralls.io/repos/dvabuzyarov/moq.ts/badge.svg?branch=master&service=github)](https://coveralls.io/github/dvabuzyarov/moq.ts?branch=master)
# moq.ts
Moq for Typescript. Inspired by c# [Moq library](https://github.com/moq/moq4).


###### Disclamer
This implementation is heavely depends on [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object.
So if your production code is not compatable with this I would recommend you separate you production code and testing code into dedicated projects.

#### Install
npm install moq.ts --save-dev

#### Quick start

moq.ts as the original [Moq library](https://github.com/moq/moq4) is intended to be simple to use, strongly typed (no magic strings!, and therefore full compiler-verified and refactoring-friendly) and minimalistic (while still fully functional!).

You can find a pretty full set of usages in the integration tests. Check out [tests.integration](https://github.com/dvabuzyarov/moq.ts/tree/master/tests.integration) folder.

Mocking property of objects
[mock-get.property.IntegrationTests.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/tests.integration/mock-get.property.IntegrationTests.ts)
-
```typescript
import {Mock, It, Times, ExpectedGetPropertyExpression} from 'moq.ts';
interface ITestObject {
    property1: number;
    property2: number;
    property3: number;
    property4: number;
    method(): void;
}

const mock = new Mock<ITestObject>()
    .setup(instance => instance.property1)
    .returns(1)
    
    .setup(instance => It.Is((expression: ExpectedGetPropertyExpression) => expression.name === 'property2'))
    .returns(100)
    
    //let's deny any write operation on the property for all values
    .setup(instance => {instance.property = It.Is(() => true)})
    .returns(false)
    
    .setup(instance => instance.property3)
    .callback(()=> 10 + 10)
    
    .setup(instance => instance.property4)
    .throws(new Error('property4 access'))
    
    //since a method is a property that holds a pointer to a function
    .setup(instance => instance.method)
    .returns(()=>{console.log('The method was called')});

const object = mock.object;
object.method();

mock.verify(instance=> instance.property1, Times.Never());
```
Mocking property setting
-
[Please, check out the documentation on returned value from set hook on Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set)

Expected expression may return only It.Is predicate, so if you are not using It predicate for the entire expression it is better to wrap the expression in {} or return explicitly a value.
Any returned value except It.Is predicete will be ignored.

[mock-set.property.IntegrationTests.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/tests.integration/mock-set.property.IntegrationTests.ts)
```typescript
import {Mock, It, Times, ExpectedSetPropertyExpression} from 'moq.ts';
interface ITestObject {
    property: number;
}
const mock = new Mock<ITestObject>()
    .setup(instance => {instance.property = 1})
    //true - allows the write operation
    .returns(true)
    
    .setup(instance => It.Is((expression: ExpectedSetPropertyExpression) => expression.name === 'property' && expression.value === 2))
    //false - denies the write operation
    .returns(false)
    
    .setup(instance => {instance.property = It.Is((value) => value === 3)})
    // allows the write operation
    .callback(()=> true)
    
    .setup(instance => {instance.property = 4})
    .throws(new Error('4 has been written into property'));


const object = mock.object;
object.property = 1;

mock.verify(instance=> {instance.property = 1}, Times.Once());
```
Mocking functions
-

[mock-method.property.IntegrationTests.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/tests.integration/mock-method.IntegrationTests.ts)
```typescript
import {Mock, It, Times} from 'moq.ts';
interface ITestFunction {
    (arg: number): string;
}


const mock = new Mock<ITestFunction>()
    .setup(instance => instance(1))
    .returns('called with 1')
    
    .setup(instance => instance(2))
    .callback((argument)=> argument === 2 ? 'called with 2' : `called with ${argument}`)
    
    .setup(instance => instance(3))
    .throws(new Error('Argument is 3'))
    
    .setup(instance => instance(It.Is(value => value === 4)))
    .returns('called with 4');

const method = mock.object;
const actual = method(1);

mock.verify(instance => instance(1), Times.Once());
mock.verify(instance => instance(It.Is(value=> true)), Times.Exactly(1));


```

 
 Mocking functions of objects
 -
[mock-named.method.IntegrationTests.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/tests.integration/mock-named.method.IntegrationTests.ts)
 ```typescript
import {Mock, It, Times} from 'moq.ts';
interface ITestObject {
    method(arg1: number, arg2: string): Date;
}

const mock = new Mock<ITestObject>()
    .setup(instance => instance.method(1, 'a'))
    .returns(new Date(2016))
    
    .setup(instance => instance.method(It.Is(value => value === 2), 'b'))
    .callback((arg1, arg2)=> new Date(2017 + arg1))
    
    .setup(instance => instance.method(3, It.Is(value => value === 'c')))
    .throws(new Error('Invoking method with 3 and c'));

const object = mock.object;
const actual = object.method(1, 'a');

mock.verify(instance => instance.method(2, 'a'), Times.Never());
```