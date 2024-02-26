import MethodMock from "refactor/test/utils/MethodMock";
import createMock from "refactor/test/utils/createMock";
import { IMnemonicController } from "refactor/ui/adapter/controllers/IMnemonicController";

export const MnemonicControllerMock = createMock<IMnemonicController>({
    setMnemonic: new MethodMock("mockResolvedValue"),
    validateMnemonic: new MethodMock("mockResolvedValue", true),
    getMnemonic: new MethodMock("mockResolvedValue", "word1 word2 word3"),
    generateMnemonic: new MethodMock("mockReturnValue", "word1 word2 word3"),
});
