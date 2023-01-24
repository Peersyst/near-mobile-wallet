import BaseMock from "mocks/common/base.mock";
import { PaletteGradient } from "config/theme/theme.declarations";
import * as UseWalletGradient from "module/wallet/hook/useWalletGradient";

export class UseWalletGradientMock extends BaseMock {
    walletGradient: PaletteGradient;
    constructor(walletGradient: PaletteGradient = ["#000000", "#FFFFFF"]) {
        super();
        this.walletGradient = walletGradient;
        this.mock = jest.spyOn(UseWalletGradient, "default").mockReturnValue(this.walletGradient);
    }
}
