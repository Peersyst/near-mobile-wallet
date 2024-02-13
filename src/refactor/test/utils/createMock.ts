import MethodMock from "./MethodMock";
import Mock, { ExtendedMock, MockData } from "./Mock";

/**
 * Creates a global mock
 * @param data Mocked methods
 */
export default function <I extends object = any>(
    data: MockData<I>,
): {
    new (customData?: Partial<MockData<I>>): ExtendedMock<I, jest.Mock>;
} {
    const mock = class extends Mock {
        constructor(customData: Partial<MockData<I>> = {}) {
            super();
            for (const [key, item] of Object.entries(data)) {
                if (item instanceof MethodMock) {
                    const usedMethod = customData?.[key as keyof MockData<I>] || item;
                    (this as any)[key] = jest.fn()[usedMethod.type](usedMethod.value);
                } else {
                    (this as any)[key] = item;
                }
            }
        }
    };

    return mock as { new (customData?: Partial<MockData<I>>): ExtendedMock<I, jest.Mock> };
}
