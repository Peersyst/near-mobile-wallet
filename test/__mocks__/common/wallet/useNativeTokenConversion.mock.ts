import * as UseNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import BaseMock from "../base.mock";

export class UseNativeTokenConversionMock extends BaseMock {
    value: string;
    convertBalance: (balance: string | number) => string;
    constructor({ value = "0", convertBalance = jest.fn().mockReturnValue(value) } = {}) {
        super();
        this.value = value;
        this.convertBalance = convertBalance;
        this.mock = jest.spyOn(UseNativeTokenConversion, "default").mockReturnValue(this);
    }
}
