import { Interactions } from "../interactions";
import { Tracker } from "../tracker";
import { IInterceptorCallbacksStrategy } from "./interceptor-callbacks";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { InteractionPlayer } from "../interaction-players/interaction.player";

/**
 * @hidden
 */
export class InterceptorCallbacksStrictStrategy<T> implements IInterceptorCallbacksStrategy {

    constructor(private tracker: Tracker,
                private hasMethodExplorer: HasMethodExplorer,
                private interactionPlayer: InteractionPlayer) {

    }

    public intercepted(expression: Interactions): void {
        this.tracker.add(expression);
    }

    public invoke(expression: Interactions): any {
        return this.interactionPlayer.play(expression);
    }

    public hasNamedMethod(methodName: PropertyKey, prototype: any): boolean {
        const hasNamedMethod = this.hasMethodExplorer.has(methodName);
        if (hasNamedMethod === true) return true;

        if (prototype !== null && prototype[methodName] instanceof Function) {
            return true;
        }

        return false;
    }
}
