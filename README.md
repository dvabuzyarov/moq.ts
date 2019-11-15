[![Build Status](https://travis-ci.org/dvabuzyarov/moq.ts.svg?branch=master)](https://travis-ci.org/dvabuzyarov/moq.ts)
[![NPM version:latest](https://img.shields.io/npm/v/moq.ts/latest.svg?style=flat-square)](https://www.npmjs.com/package/moq.ts)
[![NPM version:next](https://img.shields.io/npm/v/moq.ts/next.svg?style=flat-square)](https://www.npmjs.com/package/moq.ts)
[![npm downloads](https://img.shields.io/npm/dt/moq.ts.svg?style=flat-square)](https://www.npmjs.com/package/moq.ts)
[![Dependency Status](http://img.shields.io/david/dvabuzyarov/moq.ts.svg?style=flat-square)](https://david-dm.org/dvabuzyarov/moq.ts)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/moq.ts.svg)](https://www.npmjs.com/package/moq.ts)

[![License](https://img.shields.io/hexpm/l/plug.svg)](https://www.npmjs.com/package/moq.ts)

# moq.ts | [Documentation](https://dvabuzyarov.github.io/moq.ts/)
Moq for Typescript. Inspired by c# [Moq library](https://github.com/moq/moq4).

#### Important
This implementation depends on [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object.
So if your production code is not compatible with this I would recommend you separate you production code and testing code into dedicated projects.
If you need help with this then ask me.

#### Install
npm install moq.ts --save-dev

#### Quick start

moq.ts as the original [Moq library](https://github.com/moq/moq4) is intended to be simple to use, strongly typed (no magic strings!, and therefore full compiler-verified and refactoring-friendly) and minimalistic (while still fully functional!).

You can find a pretty full set of usages in the integration tests. Check out [tests.integration](https://github.com/dvabuzyarov/moq.ts/tree/master/tests.integration) folder.
* * *

- [Mocking property of objects](#mocking-property-of-objects)
- [Mocking property setting](#mocking-property-setting)
- [Mocking functions](#mocking-functions)
- [Mocking functions of objects](#mocking-functions-of-objects)
- [Mock behavior](#mock-behavior)
- [Mock prototype](#mock-prototype)
- [Mimics](#mimics)
- [typeof operator](#typeof-operator)
* * *

<!-- toc -->
Mocking property of objects
-
[get.property.spec.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/tests.integration/mock-get.property.IntegrationTests.ts)
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

const object = mock.object();
object.method();

mock.verify(instance=> instance.property1, Times.Never());
```
Mocking property setting
-
[The documentation on returned value from 'set hook' on Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set)


[set-property.spec.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/tests.integration/mock-set.property.IntegrationTests.ts)
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


const object = mock.object();
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

const method = mock.object();
const actual = method(1);

mock.verify(instance => instance(1), Times.Once());
mock.verify(instance => instance(It.Is(value=> value === 1)), Times.Exactly(1));


```

 
 Mocking functions of objects
 -
[instance-method.spec.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/tests.integration/mock-named.method.IntegrationTests.ts)
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

const object = mock.object();
const actual = object.method(1, 'a');

mock.verify(instance => instance.method(2, 'a'), Times.Never());
```

## Mock behavior
A mocked object is a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), 
that configured to track any read and write operations on properties. If you write a value to an arbitrary property the mocked object
will keep it and you can read it later on. By default the prototype of mocked object is Function.

Accessing to an unset property or a method will return undefined or a pointer to a spy function if it exists on prototype;
You can call this function and it will be tracked.

The default behaviour has the lowest precedence.
The latest setup has the highest precedence. 

You can control mock behavior when accessing to a property without a corresponding setup. 
```typescript
    mock = new Mock<ITestObject>();
    mock.setup(instance => It.Is(expression => true))
      .throws(new Error("setup is missed"));
```

## Mock prototype
If you need to make work instanceof operator or you need to deal with prototype of the mock object you can 
use prototypeof function of Mock class. Or you can use [Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) or [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) functions
on mocked object.

```typescript
class TestObject implements ITestObject {
    
}

const mock = new Mock<ITestObject>()
                .prototypeof(TestObject.prototype)
                .object();

mock.object() instanceof TestObject;// true
```

## Mimics
If you need to replicate behaviour of an existing object you can reflect mock's interactions on the object.  

```typescript
class Origin {
    public property = 0;

    public method(input: number): number {
        return input * this.property;
    }
}

const origin = new Origin();

const mock = new Mock<Origin>()
    .setup(() => It.IsAny())
    .mimics(origin);

const mocked = mock.object();
mocked.property = 3;
const actual = mocked.method(2);

expect(actual).toBe(6);
mock.verify(instance => instance.method(2));
```

## typeof operator

Some operations are not possible to trap in order to keep the language consistent, 
one of them is typeof. The type of the proxy object will be the same as the proxy target. 
So at the moment the only available options is to provider target option as a create mock parameter.
```typescript
class Origin {
}

const origin = new Origin();

const mock = new Mock<Origin>({target: new Origin()});

expect(typeof mock.object()).toBe(typeof new Origin());
```

Sponsored by [2BIT](https://www.2bit.ch)
