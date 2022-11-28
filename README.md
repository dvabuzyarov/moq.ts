[![Build Status](https://travis-ci.org/dvabuzyarov/moq.ts.svg?branch=master)](https://travis-ci.org/dvabuzyarov/moq.ts)
[![NPM version:latest](https://img.shields.io/npm/v/moq.ts/latest.svg?style=flat-square)](https://www.npmjs.com/package/moq.ts)
[![NPM version:next](https://img.shields.io/npm/v/moq.ts/next.svg?style=flat-square)](https://www.npmjs.com/package/moq.ts)
[![npm downloads](https://img.shields.io/npm/dt/moq.ts.svg?style=flat-square)](https://www.npmjs.com/package/moq.ts)
[![Code Coverage](https://img.shields.io/nycrc/dvabuzyarov/moq.ts)](https://github.com/dvabuzyarov/moq.ts/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/moq.ts.svg)](https://www.npmjs.com/package/moq.ts)
[![License](https://img.shields.io/hexpm/l/plug.svg)](https://www.npmjs.com/package/moq.ts)

# moq.ts | [Documentation](https://dvabuzyarov.github.io/moq.ts/)

Moq for Typescript. Inspired by c# [Moq library](https://github.com/moq/moq4).

> :warning: **[Starting with the 10 version, the package follows the new standard of APF.](https://angular.io/guide/angular-package-format)**
> Which introduced support of ES modules and drops commonjs.

#### Install

npm install moq.ts --save-dev

#### Quick start

moq.ts as the original [Moq library](https://github.com/moq/moq4) is intended to be simple to use, strongly typed (no
magic strings!, and therefore full compiler-verified and refactoring-friendly) and minimalistic (while still fully
functional!). Every each mock is an instance
of [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object.

You can find a pretty full set of usages in the integration tests. Check
out [tests.integration](https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/integration.specs/) folder.
* * *

- [Mocking functions of objects](#mocking-functions-of-objects)
- [Mocking reading properties](#mocking-reading-properties)
- [Mocking writing property setting](#mocking-writing-properties)
- [Mocking functions](#mocking-functions)
- [Auto mocking](#auto-mocking)
  - [Limitations](#limitations)
- [async/await](#asyncawait)
  - [ESLint [@typescript-eslint/promise-function-async]](#eslint-typescript-eslintpromise-function-asynchttpsgithubcomtypescript-eslinttypescript-eslintblobmasterpackageseslint-plugindocsrulespromise-function-asyncmd-rule)
  - [Setup reactions](#setup-reactions)
  - [Promise adapters](#promise-adapters)
- [Type Discovering](#type-discovering)
- [Mock behavior](#mock-behavior)
    - [Play times](#setup-play-times)
    - [Injector config](#injector-config)
        - [DefaultInjectorConfig](#defaultinjectorconfig)
        - [EqualMatchingInjectorConfig and custom matchers](#equalmatchinginjectorconfig)
        - [Internal API](#internal-api)
- [Mock prototype](#mock-prototype)
- [Mimics](#mimics)
- [typeof operator](#typeof-operator)
- [in operator](#in-operator)
- [new operator](#new-operator)
- [MoqAPI symbol](#moqapi-symbol)

* * *

<!-- toc -->
Mocking functions of objects
-
[instance-method.spec.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/integration.specs/instance-method.spec.ts)

 ```typescript
import { Mock, It, Times } from "moq.ts";

interface ITestObject {
    method(arg1: number, arg2: string): Date;
}

const values = ["a", "b", "c"];

const mock = new Mock<ITestObject>()
    .setup(instance => instance.method(1, values[0]))
    .returns(new Date(2016))

    .setup(instance => instance.method(It.Is(value => value === 2), values[1]))
    .callback(({args: [arg1, arg2]}) => new Date(2017 + arg1))

    .setup(instance => instance.method(3, It.Is(value => value === values[2])))
    .throws(new Error("Invoking method with 3 and c"));

const object = mock.object();
const actual = object.method(1, "a");

mock.verify(instance => instance.method(2, "a"), Times.Never());
```

Mocking reading properties
-
[read-property.spec.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/integration.specs/read-property.spec.ts)

```typescript
import { Mock, It, Times, GetPropertyExpression } from "moq.ts";

interface ITestObject {
    property1: number;
    property2: number;
    property3: number;
    property4: number;

    method(): void;
}

const property4Name = "property4";
const mock = new Mock<ITestObject>()
    .setup(instance => instance.property1)
    .returns(1)

    .setup(instance => It.Is((expression: GetPropertyExpression) => expression.name === "property2"))
    .returns(100)

    .setup(instance => instance.property3)
    .callback(() => 10 + 10)

    .setup(instance => instance[property4Name])
    .throws(new Error("property4 access"))

    //since a method is a property that holds a pointer to a function
    .setup(instance => instance.method)
    .returns(() => {
        console.log("The method was called")
    });

const object = mock.object();
object.method();

mock.verify(instance => instance.property1, Times.Never());
```

Mocking writing properties
-
[The documentation on returned value from "set hook" on Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set)

[set-property.spec.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/integration.specs/set.property.spec.ts)

```typescript
import { Mock, It, Times, SetPropertyExpression } from "moq.ts";

interface ITestObject {
    property: number | any;
}

const value = {field: new Date()};

const mock = new Mock<ITestObject>()
    .setup(instance => {
        instance.property = 1
    })
    //true - allows the write operation
    .returns(true as any)

    .setup(instance => It.Is((expression: SetPropertyExpression) => expression.name === "property" && expression.value === 2))
    //false - denies the write operation
    .returns(false)

    .setup(instance => {
        instance.property = It.Is(value => value === 3)
    })
    // allows the write operation
    .callback(() => true)

    .setup(instance => {
        instance.property = value
    })
    .throws(new Error("an object has been written into property"));


const object = mock.object();
object.property = 1;

mock.verify(instance => {
    instance.property = 1
}, Times.Once());
```

Mocking functions
-

[mock-method.property.IntegrationTests.ts](https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/integration.specs/method.spec.ts)

```typescript
import { Mock, It, Times } from "moq.ts";

interface ITestFunction {
    (arg: number | any): string;
}

const value = {field: new Date()};

const mock = new Mock<ITestFunction>()
    .setup(instance => instance(1))
    .returns("called with 1")

    .setup(instance => instance(2))
    .callback(({args: [argument]}) => argument === 2 ? "called with 2" : `called with ${argument}`)

    .setup(instance => instance(value))
    .throws(new Error("Argument is object with date"))

    .setup(instance => instance(It.Is(value => value === 4)))
    .returns("called with 4");

const method = mock.object();
const actual = method(1);

mock.verify(instance => instance(1), Times.Once());
mock.verify(instance => instance(It.Is(value => value === 1)), Times.Exactly(1));


```

## Auto mocking
>  The feature does not support async/await expressions.

The library support auto mocking for deep members. Consider this case:

```typescript

interface IChild {
    get(): string;
}

interface IRoot {
    child: IChild;
}

const value = "value";

const child = new Mock<IChild>()
    .setup(instance => instance.get())
    .returns(value)
    .object();

const root = new Mock<IRoot>()
    .setup(instance => instance.child)
    .returns(child)
    .object();

const actual = root.child.get();

expect(actual).toBe(value);
```

We have to create a child mock in order to set up "child" property of the root object. With auto mocking this case could
be rewritten as following:

```typescript

const root = new Mock<IRoot>()
    // The root mock automatically creates a mock for the child property
    .setup(instance => instance.child.get())
    .returns(value)
    .object();

const actual = root.child.get();

expect(actual).toBe(value);
```

#### Limitations
At this moment [It predicates](https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/lib/reflector/expression-predicates.ts) are forbidden, except the last part of an expression.
Consider this case:

```typescript
        const a = "a";
        const b = "b";
        const c = "c";
        
        const object = new Mock<{ get(arg: string): { a: string; b: string; c: string } }>()
            .setup(instance => instance.get("a").a)
            .returns(a)
            .setup(instance => instance.get("b").b)
            .returns(a)
            .setup(instance => instance.get(It.IsAny()).c)
            .returns(b)
            .object();
```
The library would create a brand new mock for every each setup and save it in an internal map, where the expression is a key.

```typescript
import { MethodExpression } from "./expressions";

new Map<Expression, Mock>([
    [new MethodExpression("get", ["a"]), new Mock()],
    [new MethodExpression("get", ["b"]), new Mock()],
    [new MethodExpression("get", [It.IsAny()]), new Mock()],
])  
```
And here are 2 issues:
1. It is not obvious how the third setup should behave. Should it create a new mock, or it should extend the previous two?
2. In order to find the third mock in the map it needs to use the same function as a key.

Those issues are not obvious and could lead to a hard detected behaviour. To prevent it and to give developers clean and robust API
[It predicates](https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/lib/reflector/expression-predicates.ts) is forbidden in the auto-mocking feature.

However, in some cases it makes sense to disabled it:
```typescript
import { ComplexExpressionGuard } from "moq.ts/internal";
const injectorConfig = new EqualMatchingInjectorConfig([], [{
  provide: ComplexExpressionGuard,
  useValue: {verify: () => undefined} as Readonly<ComplexExpressionGuard>,
  deps: []
}]);
const svg = new Mock<Selection<SVGSVGElement, unknown, HTMLElement, any>>({injectorConfig})
  .setup(instance => instance
    .append("g")
    .attr("fill", "none")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .selectAll("g")
    .data(data)
    .join("g")
    .append("path")
    .attr("class", It.IsAny())
    .attr("d", It.IsAny()))
  .returns(path)
  .object();
```

## async/await


The library supports asynchronous function with a promise-based wrappers. 
>  async/await expressions are not supported in the auto-mocking feature.

#### ESLint [@typescript-eslint/promise-function-async](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/promise-function-async.md) rule

This rule will ask you to write expressions with async keyword.

```typescript
const mock = new Mock<typeof fn>()
    .setup(async instance => instance(1))
    .returnsAsync(2)
    .setup(async instance => instance(2))
    .throwsAsync(exception)
    .object();
```

#### Setup reactions
* returnsAsync - returns a Promise which will be resolved with the provided value;
* throwsAsync - returns a Promise which will be rejected with the provided exception;

```typescript
async function fn(input: number) {
    return input;
}

const exception = new Error();
const mock = new Mock<typeof fn>()
    .setup(instance => instance(1))
    .returnsAsync(2)
    // equal to
    // .returns(Promise.resolve(2))
    .setup(instance => instance(2))
    .throwsAsync(exception)
    // equal to
    // .returns(Promise.reject(exception))
    .object();

const actual = await mock(1);
expect(actual).toBe(2);

try {
    await mock(2);
} catch (e) {
    expect(e).toBe(exception);
}
```

#### Promise adapters

Due to the fact that some environments are not using the native Promise object the library provides adapters for
resolved/rejected promise that could be overridden.
See [ResolvedPromiseFactory](https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/lib/presets/resolved-promise.factory.ts)
,
[RejectedPromiseFactory](https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/lib/presets/rejected-promise.factory.ts).

## Type Discovering

Despite the fact that Mock class is generic type where T parameter stands for mocked type it works only at design
time. At the runtime phase the type is not available and Moq library relays on other ways to discover the type
information. It is required to implement correct behaviour of mocked object.

Consider this case:

```typescript
class Prototype {
    method(): void {
        throw new Error("Not Implemented");
    }
}

const object = new Mock<Prototype>()
    .object();

const actual = object.method(); // throws TypeError: object.method is not a function

expect(actual).toBe(undefined);
```

It happens because at runtime the mock does not know that method is a part of the mocked type. So at the moment there
are 3 ways how type could be discovered at runtime.

#### Target

It is possible to provide a target object instance when a new instance of mock is being created. It will fix typeof
operator. The prototype of the target will be used for type discovering and fixing instanceof operator.

By default, a mock is instantiated as Function object, so at runtime the mock "knows" about Function inherited
properties and methods.

```typescript
class Prototype {
    method(): void {
        throw new Error("Not Implemented");
    }
}

const object = new Mock<Prototype>({target: new Prototype()})
    .object();

const actual = object.method();

expect(actual).toBe(undefined);
expect(typeof object).toBe("object");
expect(object instanceof Prototype).toBe(true);
```

#### Prototype

Another way to deal with type discovering is to provide a prototype object.

```typescript
class Prototype {
    method(): void {
        throw new Error("Not Implemented");
    }
}

const object = new Mock<Prototype>()
    .prototypeof(Prototype.prototype)
    .object();

const actual = object.method();

expect(actual).toBe(undefined);
expect(typeof object).toBe("function");
expect(object instanceof Prototype).toBe(true);
```

#### Setup examination

In some cases Moq library can discover type information from provided setup information.

```typescript
class Prototype {
    method(): number {
        throw new Error("Not Implemented");
    }
}

const object = new Mock<Prototype>()
    .setup(instance => instance.method()) // this would be used for type discovering
    .returns(2)
    .object();

const actual = object.method();

expect(actual).toBe(2);
expect(typeof object).toBe("function");
```

## Mock behavior

A mocked object is a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy),
that configured to track any read and write operations on properties. If you write a value to an arbitrary property the
mocked object will keep it, and you can read it later on. By default, the prototype of mocked object is Function.

Accessing to an unset property or a method will return undefined, or a pointer to a spy function if it exists on
prototype; You can call this function, and it will be tracked.

The default behaviour has the lowest precedence. The latest setup has the highest precedence.

You can control mock behavior when accessing to a property without a corresponding setup.

```typescript
const mock = new Mock<ITestObject>();
mock.setup(() => It.IsAny())
    .throws(new Error("setup is missed"));
```
#### Setup play times
It is possible to define a predicate that defines if provided setup can handle an interaction.

```typescript
import { PlayTimes } from "moq.ts";

class Prototype {
    method(): number {
        throw new Error("Not Implemented");
    }
}

const object = new Mock<Prototype>()
    
    .setup(instance => instance.method())
    .returns(4)
    
    .setup(instance => instance.method())
    // it could be any predefined funtion of PlayTimes or a custom function
    .play(PlayTimes.Once()) 
    .returns(2)
    
    .object();


expect(object.method()).toBe(2);
expect(object.method()).toBe(4);
```

The latest setup has the highest precedence. And it says that it could handle only one interaction. After
that the setup will be ignored and next setup would be taken.

#### Injector config

Internally the library is using an injector that implementation is based
on [Angular injector](https://angular.io/guide/dependency-injection-providers) to create and configure every each Mock
object that is created with its constructor.

```typescript
new Mock() // <-- calls angular based injector internally to create all dependencies 
``` 

The library provides an extension point to change the way how mocks are configured internally. It is available through
IMockOptions.injectorConfig that could be applied globally or per mock instance at the instancing phase.

```typescript
import { EqualMatchingInjectorConfig, Mock } from "moq.ts";

// The global configuration that would be overridden with instance options 
Mock.options = {injectorConfig: new EqualMatchingInjectorConfig()};
// or per instance
new Mock({injectorConfig: new EqualMatchingInjectorConfig()})
```

Out of the box there are 2 available configurations that change the way how a mock compares expressions.

#### DefaultInjectorConfig

This is a default configuration that provides the standard mock behaviours.

#### EqualMatchingInjectorConfig

By default, all values are matched
with [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
that is limited in matching objects. On the other hand developers are using so called "deep equal comparison" approach,
where objects are matched by its properties and values. This configuration changes the way how expressions are matched
and introduce deep equal comparison logic as well as an extension point for custom matchers.

```typescript
import { Mock } from "moq.ts";

const mock = new Mock<(args: number[]) => number>()
    .setup(instance => instance([2, 1]))
    .returns(2);

const object = mock.object();

const actual = object([2, 1]);

// since the default comparisons logic sees [2, 1] and [2, 1] as different objects the provided setup would not work
expect(actual).toBe(undefined);
```

and compare with

```typescript
import { EqualMatchingInjectorConfig, Mock } from "moq.ts";

const mock = new Mock<(args: number[]) => number>({injectorConfig: new EqualMatchingInjectorConfig()})
    .setup(instance => instance([2, 1]))
    .returns(2);

const object = mock.object();

const actual = object([2, 1]);

expect(actual).toBe(2);
```

Internally the equal comparision logic implemented as a collection of object matchers that implement IObjectMatcher
interface.

Matchers with the most specific logic should come first in the collection and if they are not able to match the objects
then more general matchers would be invoked.

The library comes with the following matchers:

0. Custom matchers
1. DateMatcher - matches [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
   objects
2. MapMatcher - matches [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
   objects
3. IteratorMatcher - matches objects that
   supports [Iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
4. POJOMatcher - as the last resort matches objects as [POJO](https://en.wikipedia.org/wiki/Plain_old_Java_object)
   objects.

Here is an example of a custom matcher that matches Moment and Date objects.

```typescript
import { EqualMatchingInjectorConfig, IObjectMatcher, Mock, OBJECT_MATCHERS } from "moq.ts";
import { isMoment, utc } from "moment";

class MomentDateMatcher implements IObjectMatcher {
    matched<T extends object>(left: T, right: T): boolean | undefined {
        if (left instanceof Date && isMoment(right)) {
            return left.valueOf() === right.valueOf();
        }
        return undefined;
    }
}

const moment = utc(1);
const injectorConfig = new EqualMatchingInjectorConfig([{
    provide: OBJECT_MATCHERS,
    useClass: MomentDateMatcher,
    multi: true,
    deps: []
}]);

const mock = new Mock<(args: any) => number>({injectorConfig})
    .setup(instance => instance(moment))
    .returns(2);

const object = mock.object();

const actual = object(new Date(1));

expect(actual).toBe(2);
```

The matching logic of EqualMatchingInjectorConfig
supports [It notation](https://raw.githubusercontent.com/dvabuzyarov/moq.ts/master/projects/moq/src/lib/expected-expressions/expression-predicates.ts)
. So you can do a partial comparision.

```typescript
import { EqualMatchingInjectorConfig, It, Mock } from "moq.ts";

const func = () => undefined;

const injectorConfig = new EqualMatchingInjectorConfig();
const mock = new Mock<(args: any) => number>({injectorConfig})
    .setup(instance => instance({func: It.IsAny()})) // <-- func property will be matched with It delegate
    .returns(2);

const object = mock.object();

const actual = object({func});

expect(actual).toBe(2);
```

#### Internal API

The **moq.ts** library is comprised of small units that follow [SOLID principles](https://en.wikipedia.org/wiki/SOLID).
Some of those units are included in the public API. The others are part of the **internal API**.

All of the units are composed together by an IoC container and make the library run. The IoC container's config is part
of the public API, and developers can use it to change the behavior of any aspect of the library. In order to do this,
developers need access to all public and internal units as well.

The core units are public and are available directly from the moq.ts package. Changes in those units
follow [Semantic Versioning](https://semver.org), while changes in the internal units do not
follow [Semantic Versioning](https://semver.org) and could produce all types of version increments.

```typescript
import * from "moq.ts/internal";
```

> Internal API access provides wide opportunities to customize the library behavior. However,
> the user code that is based on the internal API **could easily be broken** by a new release.

## Mock prototype

If you need to make work instanceof operator or you need to deal with prototype of the mock object you can use
prototypeof function of Mock class. Or you can
use [Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
or [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
functions on mocked object.

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

Some operations are not possible to trap in order to keep the language consistent, one of them is typeof. The type of
the proxy object will be the same as the proxy target. So at the moment the only available options is to provider target
option as a create mock parameter.

```typescript
class Origin {
}

const origin = new Origin();

const mock = new Mock<Origin>({target: new Origin()});

expect(typeof mock.object()).toBe(typeof new Origin());
```

## in operator

The library supports [in operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in). More
examples could be
found [here](https://raw.githubusercontent.com/dvabuzyarov/moq.ts/master/projects/moq/src/integration.specs/in-operator.spec.ts)

```typescript
const name = "arbitrary name";
const object = new Mock<{}>()
    .setup(instance => name in instance)
    .returns(true)
    .object();

expect(name in object).toBe(true);
```

```typescript
interface ITestObject {
    property: string;

    method(): void;
}

class TestObject implements ITestObject {
    property: string;

    method(): void {
        return undefined;
    }
}

const object = new Mock<ITestObject>()
    .prototypeof(TestObject.prototype)
    .object();

// because "property" in new TestObject() === false
expect("property" in object).toBe(false);
expect("method" in object).toBe(true);
```

```typescript
const mock = new Mock<{}>();
const object = mock.object();

const actual1 = "property" in object;
const actual2 = "method" in object;

mock.verify(instance => "property" in instance, Times.Once());
mock.verify(instance => "method" in instance, Times.Once());
```

## new operator

The library supports [new operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new).
More examples could be
found [here](https://raw.githubusercontent.com/dvabuzyarov/moq.ts/master/projects/moq/src/integration.specs/new-operator.spec.ts)

> [In order for the new operation to be valid on the resulting Proxy object,
> the target used to initialize the proxy must itself have a [[Construct]] internal method
> (i.e. new target must be valid)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct).

```typescript
class TestObject {
    constructor(public readonly arg) {
    }
}
```

```typescript
    it("Returns new object with callback", () => {
    const value = "value";
    const mock = new Mock<typeof TestObject>({target: TestObject})
        .setup(instance => new instance(value))
        .callback(({args: [name]}) => new TestObject(name));
    const object = mock.object();

    const actual = new object(value);
    expect(actual).toEqual(new TestObject(value));
    mock.verify(instance => new instance(value));
});

it("Returns new object with returns", () => {
    const value = "value";
    const expected = new TestObject(value);
    const mock = new Mock<typeof TestObject>({target: TestObject})
        .setup(instance => new instance(value))
        .returns(expected);
    const object = mock.object();

    const actual = new object(value);
    expect(actual).toBe(expected);
    mock.verify(instance => new instance(value));
});
```

## MoqAPI symbol

In some scenarios it is necessary to get Moq API from mocked object. For these purposes the library provides a predefined
symbol MoqAPI. Mocked objects in their turn expose a symbol property to access to its Moq API.

Since this property makes sense only in context of the moq library and is not specific for mocked types it is not
possible to define an interaction behaviour with Setup API.

The property is read only and trackabel, so it possible to use for verification.

```typescript
const func = new Mock<() => void>()
    .object();

func[MoqAPI]
    .setup(instance => instance())
    .returns(12);

const actual = func();

expect(actual).toBe(12);
```

In operator does not see this property until it is used in setups.

```typescript
const object = new Mock<{}>()
    .object();

expect(MoqAPI in object).toBe(false);
```

BUT

```typescript
const mock = new Mock<ITestObject>();
const object = mock
    .setup(instance => instance[MoqAPI])
    .returns(undefined)
    .object();

expect(MoqAPI in object).toBe(true);
expect(object[MoqAPI]).toBe(mock);
```

> [Sponsored by 2BIT GmbH](https://www.2bit.ch)
