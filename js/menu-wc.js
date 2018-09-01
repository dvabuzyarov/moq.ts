'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">moq.ts documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="changelog.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>CHANGELOG
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/ArgumentsMatcher.html" data-type="entity-link">ArgumentsMatcher</a>
                    </li>
                    <li class="link">
                        <a href="classes/CallCounter.html" data-type="entity-link">CallCounter</a>
                    </li>
                    <li class="link">
                        <a href="classes/ConstantFormatter.html" data-type="entity-link">ConstantFormatter</a>
                    </li>
                    <li class="link">
                        <a href="classes/ConstantMatcher.html" data-type="entity-link">ConstantMatcher</a>
                    </li>
                    <li class="link">
                        <a href="classes/DefinedSetups.html" data-type="entity-link">DefinedSetups</a>
                    </li>
                    <li class="link">
                        <a href="classes/ExpectedExpressionFormatter.html" data-type="entity-link">ExpectedExpressionFormatter</a>
                    </li>
                    <li class="link">
                        <a href="classes/ExpectedExpressionReflector.html" data-type="entity-link">ExpectedExpressionReflector</a>
                    </li>
                    <li class="link">
                        <a href="classes/ExpectedGetPropertyExpression.html" data-type="entity-link">ExpectedGetPropertyExpression</a>
                    </li>
                    <li class="link">
                        <a href="classes/ExpectedMethodExpression.html" data-type="entity-link">ExpectedMethodExpression</a>
                    </li>
                    <li class="link">
                        <a href="classes/ExpectedNamedMethodExpression.html" data-type="entity-link">ExpectedNamedMethodExpression</a>
                    </li>
                    <li class="link">
                        <a href="classes/ExpectedSetPropertyExpression.html" data-type="entity-link">ExpectedSetPropertyExpression</a>
                    </li>
                    <li class="link">
                        <a href="classes/ExpressionFormatter.html" data-type="entity-link">ExpressionFormatter</a>
                    </li>
                    <li class="link">
                        <a href="classes/ExpressionMatcher.html" data-type="entity-link">ExpressionMatcher</a>
                    </li>
                    <li class="link">
                        <a href="classes/GetPropertyExpression.html" data-type="entity-link">GetPropertyExpression</a>
                    </li>
                    <li class="link">
                        <a href="classes/GetPropertyExpressionFormatter.html" data-type="entity-link">GetPropertyExpressionFormatter</a>
                    </li>
                    <li class="link">
                        <a href="classes/GetPropertyExpressionMatcher.html" data-type="entity-link">GetPropertyExpressionMatcher</a>
                    </li>
                    <li class="link">
                        <a href="classes/Interceptor.html" data-type="entity-link">Interceptor</a>
                    </li>
                    <li class="link">
                        <a href="classes/InterceptorCallbacks.html" data-type="entity-link">InterceptorCallbacks</a>
                    </li>
                    <li class="link">
                        <a href="classes/InterceptorCallbacksLooseStrategy.html" data-type="entity-link">InterceptorCallbacksLooseStrategy</a>
                    </li>
                    <li class="link">
                        <a href="classes/InterceptorCallbacksStrictStrategy.html" data-type="entity-link">InterceptorCallbacksStrictStrategy</a>
                    </li>
                    <li class="link">
                        <a href="classes/It.html" data-type="entity-link">It</a>
                    </li>
                    <li class="link">
                        <a href="classes/MethodExpression.html" data-type="entity-link">MethodExpression</a>
                    </li>
                    <li class="link">
                        <a href="classes/MethodExpressionFormatter.html" data-type="entity-link">MethodExpressionFormatter</a>
                    </li>
                    <li class="link">
                        <a href="classes/MethodExpressionMatcher.html" data-type="entity-link">MethodExpressionMatcher</a>
                    </li>
                    <li class="link">
                        <a href="classes/Mock.html" data-type="entity-link">Mock</a>
                    </li>
                    <li class="link">
                        <a href="classes/MockCore.html" data-type="entity-link">MockCore</a>
                    </li>
                    <li class="link">
                        <a href="classes/NamedMethodExpression.html" data-type="entity-link">NamedMethodExpression</a>
                    </li>
                    <li class="link">
                        <a href="classes/NamedMethodExpressionFormatter.html" data-type="entity-link">NamedMethodExpressionFormatter</a>
                    </li>
                    <li class="link">
                        <a href="classes/NamedMethodExpressionMatcher.html" data-type="entity-link">NamedMethodExpressionMatcher</a>
                    </li>
                    <li class="link">
                        <a href="classes/PlayTimes.html" data-type="entity-link">PlayTimes</a>
                    </li>
                    <li class="link">
                        <a href="classes/SequenceId.html" data-type="entity-link">SequenceId</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetPropertyExpression.html" data-type="entity-link">SetPropertyExpression</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetPropertyExpressionFormatter.html" data-type="entity-link">SetPropertyExpressionFormatter</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetPropertyExpressionMatcher.html" data-type="entity-link">SetPropertyExpressionMatcher</a>
                    </li>
                    <li class="link">
                        <a href="classes/Setup.html" data-type="entity-link">Setup</a>
                    </li>
                    <li class="link">
                        <a href="classes/Times.html" data-type="entity-link">Times</a>
                    </li>
                    <li class="link">
                        <a href="classes/TrackedExpressionsFormatter.html" data-type="entity-link">TrackedExpressionsFormatter</a>
                    </li>
                    <li class="link">
                        <a href="classes/Tracker.html" data-type="entity-link">Tracker</a>
                    </li>
                    <li class="link">
                        <a href="classes/Verifier.html" data-type="entity-link">Verifier</a>
                    </li>
                    <li class="link">
                        <a href="classes/VerifyError.html" data-type="entity-link">VerifyError</a>
                    </li>
                    <li class="link">
                        <a href="classes/VerifyFormatter.html" data-type="entity-link">VerifyFormatter</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/IExpectedExpression.html" data-type="entity-link">IExpectedExpression</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IInterceptorCallbacks.html" data-type="entity-link">IInterceptorCallbacks</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IInterceptorCallbacksStrategy.html" data-type="entity-link">IInterceptorCallbacksStrategy</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IPredicate.html" data-type="entity-link">IPredicate</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
