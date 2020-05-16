import { ApplyTrap } from "./apply.trap";
import { Tracker } from "../tracker/tracker";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { GetTrap } from "./get.trap";
import { PropertiesValueStorage } from "./properties-value.storage";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { SpyFunctionProvider } from "./spy-function.provider";
import { GetPrototypeOfTrap } from "./get-prototype-of.trap";
import { PrototypeStorage } from "./prototype.storage";
import { HasTrap } from "./has.trap";
import { InOperatorInteractionExplorer } from "../explorers/in-operator-interaction.explorer/in-operator-interaction.explorer";
import { PresetPlayablesUpdater } from "../playables/preset-playables.updater";
import { SetTrap } from "./set.trap";
import { SetPrototypeOfTrap } from "./set-prototype-of.trap";
import { ProxyFactory } from "./proxy.factory";
import { MOCK } from "../injector/moq.injection-token";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";

/**
 * @hidden
 */
export const interceptorsProviders = [
    {
        provide: ProxyFactory, useClass: ProxyFactory, deps: [
            MOCK_OPTIONS,
            GetTrap,
            SetTrap,
            HasTrap,
            ApplyTrap,
            GetPrototypeOfTrap,
            SetPrototypeOfTrap
        ]
    },
    {provide: ApplyTrap, useClass: ApplyTrap, deps: [Tracker, InteractionPlayer]},
    {
        provide: GetTrap, useClass: GetTrap, deps: [
            MOCK,
            Tracker,
            PropertiesValueStorage,
            InteractionPlayer,
            HasPropertyExplorer,
            HasMethodExplorer,
            SpyFunctionProvider
        ]
    },
    {provide: GetPrototypeOfTrap, useClass: GetPrototypeOfTrap, deps: [PrototypeStorage]},
    {
        provide: HasTrap, useClass: HasTrap, deps: [
            Tracker,
            PropertiesValueStorage,
            InteractionPlayer,
            InOperatorInteractionExplorer,
            HasPropertyExplorer,
            HasMethodExplorer,
            PresetPlayablesUpdater
        ]
    },
    {provide: PropertiesValueStorage, useClass: PropertiesValueStorage, deps: []},
    {provide: PrototypeStorage, useFactory: ({target}) => new PrototypeStorage(target), deps: [MOCK_OPTIONS]},
    {provide: SetTrap, useClass: SetTrap, deps: [Tracker, PropertiesValueStorage, InteractionPlayer]},
    {provide: SetPrototypeOfTrap, useClass: SetPrototypeOfTrap, deps: [PrototypeStorage]},
    {provide: SpyFunctionProvider, useClass: SpyFunctionProvider, deps: [Tracker, InteractionPlayer]},
];
