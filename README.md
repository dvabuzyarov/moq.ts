[![Build Status](https://travis-ci.org/dvabuzyarov/moq.ts.svg?branch=master)](https://travis-ci.org/dvabuzyarov/moq.ts)
[![NPM version](http://img.shields.io/npm/v/moq.ts.svg?style=flat-square)](https://www.npmjs.com/package/moq.ts)
[![npm downloads](https://img.shields.io/npm/dt/moq.ts.svg?style=flat-square)](https://www.npmjs.com/package/moq.ts)
[![Dependency Status](http://img.shields.io/david/dvabuzyarov/moq.ts.svg?style=flat-square)](https://david-dm.org/dvabuzyarov/moq.ts)
[![License](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/moq.ts)
# moq.ts
Moq for Typescript. Inspired by c# [Moq library](https://github.com/moq/moq4).

#### Important
This implementation is heavely depends on [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object.
So if your production code is not compatable with this I would recommend you separate you production code and testing code into dedicated projects.

#### Install
npm install moq.ts --save-dev

#### Quick start

moq.ts as the original [Moq library](https://github.com/moq/moq4) is intended to be simple to use, strongly typed (no magic strings!, and therefore full compiler-verified and refactoring-friendly) and minimalistic (while still fully functional!).

You can find a pretty full set of usages in the integration tests. Check out [tests.integration](https://github.com/dvabuzyarov/moq.ts/tree/master/tests.integration) folder.

Mocking property of objects
-
[mock-get.property.IntegrationTests.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/tests.integration/mock-get.property.IntegrationTests.ts)
```typescript
import {Mock, It, Times, ExpectedGetPropertyExpression} from 'moq.ts';
interface ITestObject {
    property1: number;
    property2: number;
    property3: number;
    property4: number;
    method(): void;
}

const property4Name = 'property4';
const mockName = 'mock name is optional';
const mock = new Mock<ITestObject>(mockName)
    .setup(instance => instance.property1)
    .returns(1)
    
    .setup(instance => It.Is((expression: ExpectedGetPropertyExpression) => expression.name === 'property2'))
    .returns(100)
    
    //let's deny any write operation on the property for all values
    .setup(instance => {instance.property2 = It.Is(() => true)})
    .returns(false)
    
    .setup(instance => instance.property3)
    .callback(()=> 10 + 10)
    
    .setup(instance => instance[property4Name])
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
[The documentation on returned value from 'set hook' on Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set)


[mock-set.property.IntegrationTests.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/tests.integration/mock-set.property.IntegrationTests.ts)
```typescript
import {Mock, It, Times, ExpectedSetPropertyExpression} from 'moq.ts';
interface ITestObject {
    property: number|any;
}

const value = {field: new Date()};

const mock = new Mock<ITestObject>()
    .setup(instance => {instance.property = 1})
    //true - allows the write operation
    .returns(true)
    
    .setup(instance => It.Is((expression: ExpectedSetPropertyExpression) => expression.name === 'property' && expression.value === 2))
    //false - denies the write operation
    .returns(false)
    
    .setup(instance => {instance.property = It.Is(value => value === 3)})
    // allows the write operation
    .callback(()=> true)
    
    .setup(instance => {instance.property = value})
    .throws(new Error('an object has been written into property'));


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
    (arg: number|any): string;
}

const value = {field: new Date()};

const mock = new Mock<ITestFunction>()
    .setup(instance => instance(1))
    .returns('called with 1')
    
    .setup(instance => instance(2))
    .callback((argument)=> argument === 2 ? 'called with 2' : `called with ${argument}`)
    
    .setup(instance => instance(value))
    .throws(new Error('Argument is object with date'))
    
    .setup(instance => instance(It.Is(value => value === 4)))
    .returns('called with 4');

const method = mock.object;
const actual = method(1);

mock.verify(instance => instance(1), Times.Once());
mock.verify(instance => instance(It.Is(value=> value === 1)), Times.Exactly(1));


```

 
 Mocking functions of objects
 -
[mock-named.method.IntegrationTests.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/tests.integration/mock-named.method.IntegrationTests.ts)
 ```typescript
import {Mock, It, Times} from 'moq.ts';
interface ITestObject {
    method(arg1: number, arg2: string): Date;
}

const values = ['a', 'b', 'c'];

const mock = new Mock<ITestObject>()
    .setup(instance => instance.method(1, values[0]))
    .returns(new Date(2016))
    
    .setup(instance => instance.method(It.Is(value => value === 2), values[1]))
    .callback((arg1, arg2)=> new Date(2017 + arg1))
    
    .setup(instance => instance.method(3, It.Is(value => value === values[2])))
    .throws(new Error('Invoking method with 3 and c'));

const object = mock.object;
const actual = object.method(1, 'a');

mock.verify(instance => instance.method(2, 'a'), Times.Never());
```

######P.S.
I am a team leader of a team of software developers. We are available for contract work.
Ready to work with the best practices (TDD, eXtream programming, agile). From your side you need to provide an agile product manager.
Angular2, Angular1, Nativescript, ASP.NET webAPI, WPF. **Love testing.**
Just drop me a note at dvabuzyarov(at)gmail.com
