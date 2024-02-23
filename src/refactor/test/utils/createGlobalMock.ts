import { TypeKeys } from "@peersyst/react-types";
import MethodMock from "./MethodMock";
import Mock, { ExtendedMock, MockMethods } from "./Mock";

// TODO: Replace with MethodData to support properties
export type MockDataMethods<C extends object> = Pick<MockMethods<keyof C>, TypeKeys<C, Function>>;

/**
 * Creates a global mock
 * @param obj Object to mock globally
 * @param data Mocked methods
 */
export default function <C extends object>(
    obj: C,
    data: MockDataMethods<C>,
): { new (customData?: Partial<MockDataMethods<C>>): ExtendedMock<C, jest.SpyInstance> } {
    const mock = class extends Mock {
        constructor(customData: Partial<MockDataMethods<C>> = {}) {
            super();
            for (const [key, item] of Object.entries(data)) {
                if (item instanceof MethodMock) {
                    const usedMethod = customData?.[key as keyof MockDataMethods<C>] || item;
                    (this as any)[key] = jest.spyOn(obj, key as any)[usedMethod.type](usedMethod.value);
                } else {
                    // TODO: Support properties
                }
            }
        }
    };

    return mock as { new (customData?: Partial<MockDataMethods<C>>): ExtendedMock<C, jest.SpyInstance> };
}
