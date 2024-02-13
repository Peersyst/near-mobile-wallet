import MethodMock from "./MethodMock";
import { OmitType, TypeKeys } from "@peersyst/react-types";

export interface IMock {
    clearMocks(): void;
    resetMocks(): void;
    restoreMocks(): void;
}

export type ExtendedMock<I extends object, T> = { [Key in keyof I]: I[Key] extends Function ? T : I[Key] } & IMock;
export type MockMethods<K extends string | number | symbol> = Record<K, MethodMock>;
export type MockData<I extends object = any> = Pick<MockMethods<keyof I>, TypeKeys<I, Function>> & OmitType<I, Function>;

/**
 * Mock class with helper methods
 */
export default class Mock implements IMock {
    clearMocks(): void {
        Object.values(this).forEach((value) => {
            if ((value as any)?.mockClear) value.mockClear();
        });
    }

    resetMocks(): void {
        Object.values(this).forEach((value) => {
            if ((value as any)?.mockReset) value.mockReset();
        });
    }

    restoreMocks(): void {
        Object.values(this).forEach((value) => {
            if ((value as any)?.mockRestore) value.mockRestore();
        });
    }
}
