import { ExpressionHasMethodExplorer } from "./has-method.explorer/expression.has-method.explorer";
import { HasMethodExplorer } from "./has-method.explorer/has-method.explorer";
import { Presets } from "../presets/presets";
import { MembersMethodExplorer } from "./members.explorer/members-method.explorer";
import { PresetHasMethodExplorer } from "./has-method.explorer/preset.has-method.explorer";
import { ObjectHasMethodExplorer } from "./has-method.explorer/object.has-method.explorer";
import { ExpressionHasPropertyExplorer } from "./has-property.explorer/expression-has-property.explorer";
import { HasPropertyExplorer } from "./has-property.explorer/has-property.explorer";
import { MembersPropertyExplorer } from "./members.explorer/members-property.explorer";
import { PresetHasPropertyExplorer } from "./has-property.explorer/preset-has-property.explorer";
import { ObjectHasPropertyExplorer } from "./has-property.explorer/object-has-property.explorer";
import { InOperatorInteractionExplorer } from "./in-operator-interaction.explorer/in-operator-interaction.explorer";
import { PresetHasInOperatorExplorer } from "./in-operator-interaction.explorer/preset.has-in-operator.explorer";
import { PrototypeStorage } from "../interceptors/prototype.storage";
import { PropertyDescriptorProvider } from "./members.explorer/property-descriptor.provider";
import { REFLECT_HAS } from "./reflect-has.injection-token";
import { PropertyIsReadOnlyTester } from "./has-property.explorer/property-is-read-only.tester";

/**
 * @hidden
 */
export default [
    {provide: ExpressionHasMethodExplorer, useClass: ExpressionHasMethodExplorer, deps: []},
    {
        provide: HasMethodExplorer,
        useClass: HasMethodExplorer,
        deps: [Presets, MembersMethodExplorer, PresetHasMethodExplorer]
    },
    {provide: ObjectHasMethodExplorer, useClass: ObjectHasMethodExplorer, deps: []},
    {
        provide: PresetHasMethodExplorer,
        useClass: PresetHasMethodExplorer,
        deps: [ExpressionHasMethodExplorer, ObjectHasMethodExplorer]
    },
    {provide: ExpressionHasPropertyExplorer, useClass: ExpressionHasPropertyExplorer, deps: []},
    {
        provide: HasPropertyExplorer,
        useClass: HasPropertyExplorer,
        deps: [Presets, MembersPropertyExplorer, PresetHasPropertyExplorer]
    },
    {provide: ObjectHasPropertyExplorer, useClass: ObjectHasPropertyExplorer, deps: []},
    {
        provide: PresetHasPropertyExplorer,
        useClass: PresetHasPropertyExplorer,
        deps: [ExpressionHasPropertyExplorer, ObjectHasPropertyExplorer]
    },
    {
        provide: InOperatorInteractionExplorer,
        useClass: InOperatorInteractionExplorer,
        deps: [Presets, PresetHasInOperatorExplorer]
    },
    {provide: PresetHasInOperatorExplorer, useClass: PresetHasInOperatorExplorer, deps: []},
    {
        provide: MembersMethodExplorer,
        useClass: MembersMethodExplorer,
        deps: [PrototypeStorage, PropertyDescriptorProvider, REFLECT_HAS]
    },
    {
        provide: PropertyIsReadOnlyTester,
        useClass: PropertyIsReadOnlyTester,
        deps: [PrototypeStorage, PropertyDescriptorProvider, REFLECT_HAS]
    },
    {
        provide: MembersPropertyExplorer,
        useClass: MembersPropertyExplorer,
        deps: [PrototypeStorage, PropertyDescriptorProvider, REFLECT_HAS]
    },
    {provide: PropertyDescriptorProvider, useClass: PropertyDescriptorProvider, deps: []},
    {provide: REFLECT_HAS, useValue: Reflect.has, deps: []},
];
