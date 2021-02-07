import {
    GetPropertyInteraction,
    InOperatorInteraction,
    Interaction,
    MethodInteraction,
    NamedMethodInteraction,
    NewOperatorInteraction,
    SetPropertyInteraction
} from "../interactions";
import { REFLECT_APPLY } from "./reflect-apply.injection-token";
import { TypeofInjectionToken } from "../injector/typeof-injection-token";

/**
 * @hidden
 */
export class MimicsPresetPlayer {
    constructor(
        private apply: TypeofInjectionToken<typeof REFLECT_APPLY>) {

    }

    public play(origin: any, interaction: Interaction): any {
        if (interaction instanceof GetPropertyInteraction) {
            return origin[interaction.name];
        }
        if (interaction instanceof SetPropertyInteraction) {
            origin[interaction.name] = interaction.value;
            return true;
        }
        if (interaction instanceof NamedMethodInteraction) {
            const method = origin[interaction.name];
            return this.apply(method, origin, interaction.args);
        }
        if (interaction instanceof MethodInteraction) {
            return this.apply(origin, undefined, interaction.args);
        }
        if (interaction instanceof InOperatorInteraction) {
            return interaction.name in origin;
        }

        if (interaction instanceof NewOperatorInteraction) {
            return new origin(...interaction.args);
        }
    }
}
