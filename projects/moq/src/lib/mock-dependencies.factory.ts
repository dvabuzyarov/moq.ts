import { ExpectedExpressionReflector } from "./expected-expressions/expected-expression-reflector";
import { Interceptor } from "./interceptor";
import { IMock, IMockOptions, IPresetBuilder } from "./moq";
import { Tracker } from "./tracker";
import { Verifier } from "./verifier";
import { Presets } from "./preset/presets";
import { ExpectedExpressions } from "./expected-expressions/expected-expressions";
import { PresetBuilder } from "./preset/preset-builder";
import { PrototypeStorage } from "./traps/prototype.storage";
import { GetTrap } from "./traps/get.trap";
import { PropertiesValueStorage } from "./traps/properties-value.storage";
import { InteractionPlayer } from "./interaction-players/interaction.player";
import { InteractionPresetProvider } from "./interaction-players/interaction-preset.provider";
import { HasMethodExplorer } from "./explorers/has-method.explorer/has-method.explorer";
import { HasPropertyExplorer } from "./explorers/has-property.explorer/has-property.explorer";
import { SpyFunctionProvider } from "./traps/spy-function.provider";
import { SetTrap } from "./traps/set.trap";
import { ApplyTrap } from "./traps/apply.trap";
import { GetPrototypeOfTrap } from "./traps/get-prototype-of.trap";
import { SetPrototypeOfTrap } from "./traps/set-prototype-of.trap";
import { MembersMethodExplorer } from "./explorers/members.explorer/members-method.explorer";
import { MembersPropertyExplorer } from "./explorers/members.explorer/members-property.explorer";

/**
 * @hidden
 */
export interface IMockDependencies<T> {
    tracker: Tracker;
    expressionReflector: ExpectedExpressionReflector;
    interceptor: Interceptor<T>;
    presetBuilderFactory: (mock: IMock<T>, target: ExpectedExpressions<T>) => IPresetBuilder<T>;
    verifier: Verifier<T>;
    prototypeStorage: PrototypeStorage;
}

/**
 * @hidden
 */
export function mockDependenciesFactory<T>(options: IMockOptions<T>): IMockDependencies<T> {
    const expressionReflector = new ExpectedExpressionReflector();
    const presets = new Presets<T>();
    const tracker = new Tracker();
    const presetBuilderFactory = (mock: IMock<T>, target: ExpectedExpressions<T>) => {
        return new PresetBuilder<T>(mock, preset => presets.add(preset), target);
    };
    const verifier = new Verifier<T>();
    const prototypeStorage = new PrototypeStorage(options.target);
    const propertiesValueStorage = new PropertiesValueStorage();
    const interactionPlayer = new InteractionPlayer(new InteractionPresetProvider(presets));
    const membersPropertyExplorer = new MembersPropertyExplorer(prototypeStorage);
    const membersMethodExplorer = new MembersMethodExplorer(prototypeStorage);
    const hasPropertyExplorer = new HasPropertyExplorer(presets, membersPropertyExplorer);
    const hasMethodExplorer = new HasMethodExplorer(presets, membersMethodExplorer);
    const spyFunctionProvider = new SpyFunctionProvider(tracker, interactionPlayer);
    const getTrap = new GetTrap(
        tracker,
        propertiesValueStorage,
        interactionPlayer,
        hasPropertyExplorer,
        hasMethodExplorer,
        spyFunctionProvider);
    const setTrap = new SetTrap(tracker, propertiesValueStorage, interactionPlayer);
    const applyTrap = new ApplyTrap(tracker, interactionPlayer);
    const getPrototypeOfTrap = new GetPrototypeOfTrap(prototypeStorage);
    const setPrototypeOfTrap = new SetPrototypeOfTrap(prototypeStorage);

    const interceptor = new Interceptor<T>(
        options.target,
        options.name,
        getTrap,
        setTrap,
        applyTrap,
        getPrototypeOfTrap,
        setPrototypeOfTrap
    );

    return {
        expressionReflector,
        interceptor,
        presetBuilderFactory,
        tracker,
        verifier,
        prototypeStorage
    };
}
