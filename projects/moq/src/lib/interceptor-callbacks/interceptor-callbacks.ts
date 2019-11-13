import { Interactions } from "../interactions";
import { Tracker } from "../tracker";
import { InterceptorCallbacksLooseStrategy } from "./interceptor-callbacks.loose.strategy";
import { InterceptorCallbacksStrictStrategy } from "./interceptor-callbacks.strict.strategy";
import { Presets } from "../preset/presets";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { InteractionPresetProvider } from "../interaction-players/interaction-preset.provider";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { ITypeMember } from "../moq";
import { MembersExplorer } from "../explorers/members.explorer/members.explorer";

/**
 * @obsolete
 * @deprecated
 */
export enum MockBehavior {
    Strict,
    Loose
}

/**
 * @hidden
 */
export interface IInterceptorCallbacksStrategy {
    intercepted(expression: Interactions): void;

    hasNamedMethod(methodName: PropertyKey, prototype: any): boolean;

    invoke(expression: Interactions): any;
}

/**
 * @hidden
 */
export interface IInterceptorCallbacks extends IInterceptorCallbacksStrategy {
    setBehaviorStrategy(behavior: MockBehavior): void;
}

/**
 * @hidden
 */
export class InterceptorCallbacks<T> implements IInterceptorCallbacks {
    private activeStrategy: IInterceptorCallbacksStrategy;

    constructor(private strictStrategy: IInterceptorCallbacksStrategy,
                private looseStrategy: IInterceptorCallbacksStrategy) {

        this.activeStrategy = strictStrategy;
    }

    public invoke(expression: Interactions): any {
        return this.activeStrategy.invoke(expression);
    }

    public intercepted(expression: Interactions): void {
        return this.activeStrategy.intercepted(expression);
    }

    public hasNamedMethod(methodName: PropertyKey, prototype: any): boolean {
        return this.activeStrategy.hasNamedMethod(methodName, prototype);
    }

    public setBehaviorStrategy(behavior: MockBehavior): void {
        if (behavior === MockBehavior.Strict) {
            this.activeStrategy = this.strictStrategy;
        }

        if (behavior === MockBehavior.Loose) {
            this.activeStrategy = this.looseStrategy;
        }
    }
}

/**
 * @hidden
 */
export function interceptorCallbacksFactory<T>(tracker: Tracker, presets: Presets<unknown>, members: ITypeMember[]): InterceptorCallbacks<T> {
    const interactionPlayer = new InteractionPlayer(new InteractionPresetProvider(presets));
    const membersExplorer = new MembersExplorer(members);
    const strictStrategy = new InterceptorCallbacksStrictStrategy<T>(tracker, new HasMethodExplorer(presets, membersExplorer), interactionPlayer);
    const looseStrategy = new InterceptorCallbacksLooseStrategy<T>(tracker, new HasPropertyExplorer(presets, membersExplorer), interactionPlayer);
    return new InterceptorCallbacks<T>(strictStrategy, looseStrategy);
}
