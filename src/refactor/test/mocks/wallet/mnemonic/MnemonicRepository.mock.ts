import { IMnemonicRepository } from "refactor/domain/adapter/repository/IMnemonicRepository";
import MethodMock from "refactor/test/utils/MethodMock";
import createMock from "refactor/test/utils/createMock";

export default createMock<IMnemonicRepository>({
    setMnemonic: new MethodMock("mockResolvedValue"),
    getMnemonic: new MethodMock("mockResolvedValue", "word1 word2 word3"),
    removeMnemonic: new MethodMock("mockResolvedValue"),
});
