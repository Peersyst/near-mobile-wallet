export type MethodMockType = Extract<
    keyof jest.MockInstance<any, any>,
    "mockReturnValue" | "mockResolvedValue" | "mockRejectedValue" | "mockImplementation"
>;

/**
 * Method mock class
 */
export default class MethodMock {
    type: MethodMockType;
    value: any;

    constructor(type: MethodMockType, value: any = undefined) {
        this.type = type;
        this.value = value;
    }
}
