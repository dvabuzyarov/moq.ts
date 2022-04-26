import {
    GetPropertyExpression,
    InOperatorExpression,
    Expression,
    FunctionExpression,
    MethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../reflector/expressions";
import { REFLECT_APPLY } from "./reflect-apply.injection-token";
import { TypeofInjectionToken } from "../injector/typeof-injection-token";

/**
 * @hidden
 */
export class MimicsPresetPlayer {
    constructor(
        private apply: TypeofInjectionToken<typeof REFLECT_APPLY>) {

    }

    public play(origin: any, interaction: Expression): any {
        if (interaction instanceof GetPropertyExpression) {
            return origin[interaction.name];
        }
        if (interaction instanceof SetPropertyExpression) {
            origin[interaction.name] = interaction.value;
            return true;
        }
        if (interaction instanceof MethodExpression) {
            const method = origin[interaction.name];
            return this.apply(method, origin, interaction.args);
        }
        if (interaction instanceof FunctionExpression) {
            return this.apply(origin, undefined, interaction.args);
        }
        if (interaction instanceof InOperatorExpression) {
            return interaction.name in origin;
        }

        if (interaction instanceof NewOperatorExpression) {
            return new origin(...interaction.args);
        }
    }
}
