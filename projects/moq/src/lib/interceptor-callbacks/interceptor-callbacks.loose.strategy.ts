import { Expressions } from "../expressions";
import { Tracker } from "../tracker";
import { IInterceptorCallbacksStrategy } from "./interceptor-callbacks";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";

/**
 * @hidden
 */
export class InterceptorCallbacksLooseStrategy<T> implements IInterceptorCallbacksStrategy {

    constructor(private tracker: Tracker,
                private hasPropertyExplorer: HasPropertyExplorer,
                private interactionPlayer: InteractionPlayer) {

    }

    public intercepted(expression: Expressions): void {
        this.tracker.add(expression);
    }

    public invoke(expression: Expressions): any {
        return this.interactionPlayer.play(expression);
    }

    public hasNamedMethod(methodName: PropertyKey, prototype: any): boolean {
        return this.hasPropertyExplorer.has(methodName) === false;
    }
}
