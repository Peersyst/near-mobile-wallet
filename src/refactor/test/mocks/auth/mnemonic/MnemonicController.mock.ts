import MethodMock from "refactor/test/utils/MethodMock";
import createMock from "refactor/test/utils/createMock";
import { IMnemonicController } from "refactor/ui/adapter/controllers/IMnemonicController";

export const MnemonicControllerMock = createMock<IMnemonicController>({
    setMnemonic: new MethodMock("mockResolvedValue"),
    validateMnemonic: new MethodMock("mockResolvedValue", true),
});
