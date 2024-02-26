import MethodMock from "refactor/test/utils/MethodMock";
import createMock from "refactor/test/utils/createMock";
import { IWalletController } from "refactor/ui/adapter/controllers/IWalletController";

export const WalletControllerMock = createMock<IWalletController>({
    createWallets: new MethodMock("mockResolvedValue"),
    recoverWallets: new MethodMock("mockResolvedValue"),
});
