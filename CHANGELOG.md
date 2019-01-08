v2.7.5
===================
* The IMock.setBehaviorStrategy is marked as **obsolete**.
* Documentation improvements

v2.7.0
===================

  * The internal logic of interceptor has been updated in order to fix the issue (#6)

v2.6.2
===================

  * Dump function that dumps into console.log all interactions with the mocked object has been added

v2.6.1
===================

  * The verify methods can be used in fluent call

v2.6.0
===================

  * The play setup has been introduced

v2.5.1
===================

  * The latest setup has precedence

v2.5.0
===================

  * In case of false assertion the dump of the tracked expressions is printed.

v2.4.0
===================

  * It.IsAny predicate has been introduced.

v2.3.1
===================

  * The NPM package is compiled as es5 code.

v2.3.0
===================

  * Mock prototype has been introduced. Now it is possible to set/read prototype of mock with prototypeof function.
    Also mock object supports Object.getPrototypeOf and Object.setPrototypeOf functions. You may need it to make work
    instanceof operator.

v2.1.0
===================

  * Mock behaviours (strict and loose) have been introduced.
